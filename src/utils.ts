import { Product } from './types';

/**
 * Compresses a Base64 image using HTML Canvas.
 * Resizes the image so that neither dimension exceeds maxWidth or maxHeight,
 * and encodes as JPEG with the specified quality.
 */
export function compressImage(base64Str: string, maxWidth = 500, maxHeight = 500, quality = 0.6): Promise<string> {
  return new Promise((resolve) => {
    // If it's not a valid base64 image or not in client env, return as is
    if (!base64Str || !base64Str.startsWith('data:image') || typeof window === 'undefined') {
      resolve(base64Str);
      return;
    }

    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          // Only use the compressed version if it is actually smaller or successful
          resolve(compressed.length < base64Str.length ? compressed : base64Str);
        } else {
          resolve(base64Str);
        }
      } catch (err) {
        console.error('Error during image compression canvas drawing:', err);
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
}

/**
 * Safely writes a value to localStorage, catching QuotaExceededError.
 * If quota is exceeded, tries to downsize or optimize before setting, or drops large non-critical elements.
 */
export function safeLocalStorageSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e instanceof DOMException && (
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    )) {
      console.warn(`[safeLocalStorageSetItem] Quota exceeded for key: ${key}. Attempting self-healing/optimization.`);
      
      // Self-healing strategies
      try {
        // Strategy 1: If it's 'att_products3', remove or downsize the massive base64 images in it
        if (key === 'att_products3') {
          const products: Product[] = JSON.parse(value);
          const optimizedProducts = products.map(p => {
            if (p.images && p.images.length > 0) {
              const cleanedImages = p.images.map(img => {
                // If it is a huge base64 image (length > 15,000 characters), let's replace/downsize it
                if (img.startsWith('data:image') && img.length > 15000) {
                  return '/assets/placeholder_product.png'; // safe smaller fallback or placeholder
                }
                return img;
              });
              return { ...p, images: cleanedImages };
            }
            return p;
          });
          localStorage.setItem(key, JSON.stringify(optimizedProducts));
          console.log('[safeLocalStorageSetItem] Successfully saved optimized products list within quota.');
          return true;
        }

        // Strategy 2: If it's reviews, customOrders or inquiries, remove extremely large base64 image properties
        if (key === 'att_reviews') {
          const reviews = JSON.parse(value);
          const optimizedReviews = reviews.map((r: any) => {
            if (r.image && r.image.startsWith('data:image') && r.image.length > 15000) {
              return { ...r, image: undefined }; // Drop huge review image
            }
            return r;
          });
          localStorage.setItem(key, JSON.stringify(optimizedReviews));
          return true;
        }

        if (key === 'att_customOrders') {
          const customOrders = JSON.parse(value);
          const optimizedCO = customOrders.map((co: any) => {
            if (co.config && co.config.customImageRef && co.config.customImageRef.startsWith('data:image') && co.config.customImageRef.length > 15000) {
              return { ...co, config: { ...co.config, customImageRef: undefined } }; // Drop massive reference image
            }
            return co;
          });
          localStorage.setItem(key, JSON.stringify(optimizedCO));
          return true;
        }

        // Strategy 3: Clean up custom background images which can be large base64s
        const bgKeys = ['att_aboutBgImage', 'att_slide2BgImage', 'att_slide1BgImage', 'att_customBannerBgImage', 'att_recruitBgImage'];
        bgKeys.forEach(k => {
          const item = localStorage.getItem(k);
          if (item && item.startsWith('data:image') && item.length > 30000) {
            localStorage.removeItem(k); // Remove huge backgrounds to free up space
            console.log(`[safeLocalStorageSetItem] Cleared large background image: ${k} to free quota`);
          }
        });

        // Try setting again
        localStorage.setItem(key, value);
        return true;
      } catch (innerErr) {
        console.error('[safeLocalStorageSetItem] Optimization attempt failed:', innerErr);
      }
      
      // If still failing, suppress the uncaught error so that the app doesn't crash
      console.error(`[safeLocalStorageSetItem] Failed to save key: ${key} even after optimization.`);
      return false;
    } else {
      console.error('[safeLocalStorageSetItem] Unknown localStorage error:', e);
      return false;
    }
  }
}
