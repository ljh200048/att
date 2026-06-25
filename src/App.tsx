/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import DetailView from './views/DetailView';
import CustomOrderView from './views/CustomOrderView';
import ReviewView from './views/ReviewView';
import IntroView from './views/IntroView';
import InquiryView from './views/InquiryView';
import LoginView from './views/LoginView';
import MyPageView from './views/MyPageView';
import AdminView from './views/AdminView';
import EventView from './views/EventView';

// Types & Data
import { Product, CartItem, Order, CustomOrder, Inquiry, Review, User, OrderStatus } from './types';
import { getProducts, DEFAULT_PRODUCTS, saveProducts } from './data/products';
import { safeLocalStorageSetItem } from './utils';
import { 
  seedCollectionIfEmpty, 
  saveDocToDb, 
  deleteDocFromDb,
  fetchSettingsDoc,
  saveSettingsDoc,
  syncProductsToFirestore
} from './lib/firebaseSync';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Mock bootstrapped initial states inside LocalStorage
const MOCK_USER: User = {
  id: 'user_att_99',
  email: 'lch200048@gmail.com',
  name: '홍길동',
  instagramId: '@att_gildong',
  role: 'admin'
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    userName: '소정',
    productName: 'att 1:1 풀커스텀 DIY 스포츠 스트랩 빌더',
    rating: 5,
    content: '친구들이랑 같이 하려고 단체 3세트 맞췄어요! 은색 오링 고리에 플레이(PLAY) 사틴 알파벳 자수를 넣으니까 너무 팝하고 귀여워요 ㅎㅎ 스케이트보드 와펜 볼륨감도 짱짱해서 가방에 달아놓고 매일 힐링 중이에요!',
    date: '2026-06-07'
  },
  {
    id: 'rev_2',
    userName: '예란',
    productName: 'att 러브 에브리웨어 & 뚱냥이 자수 스트랩',
    rating: 5,
    content: '생각보다 자수 봉제선 실물이 훨씬 더 달콤하고 따뜻해요! 가방에 매칭하기에 핑크핑크한 포인트가 제격이에요. 스트랩 폭이 3cm로 아주 탄탄해서 때도 덜 타고 평생 간직할 수 있을 것 같습니다.',
    date: '2026-06-03'
  },
  {
    id: 'rev_3',
    userName: '키링공주',
    productName: 'att 오리지널 와펜 패브릭 스트랩 키링',
    rating: 5,
    content: '원하는 자수 알파벳을 실시간 시뮬레이션으로 설계해서 올렸는데, 포장 뜯을 때 비누향 가득 꿀사탕이랑 같이 선물처럼 배송왔어요. 패브릭 웨빙이라 부딪혀서 탁탁 소리도 안 나고 너무 앤틱&고급스러워요.',
    date: '2026-06-06'
  },
  {
    id: 'rev_4',
    userName: '민기',
    productName: 'att 스포티 헤드폰 & 클라우드 퍼스트 스트랩',
    rating: 4,
    content: '스포티브 룩에 달기 좋은 헤드폰이랑 구름 와펜 패치 골라봤는데 블랙 스트랩에 찰떡이네요. 앤틱 카라비너 후크가 무광이라 되게 오묘하게 세련되고 멋집니다. 번창하세요!',
    date: '2026-06-05'
  },
  {
    id: 'rev_5',
    userName: '은지',
    productName: '앤틱 일러스트 기타 & 파일럿 항공기 키링',
    rating: 5,
    content: '기타와 비행기 패치 조합이 독특해서 구매해 봤는데 가방에 달아두니 빈티지한 무드가 아주 좋아요! 직조 밴드가 몹시 탄탄해서 고급 핸드백에도 기스 안 나고 완벽히 밀착돼요.',
    date: '2026-06-04'
  },
  {
    id: 'rev_6',
    userName: '지우',
    productName: '스트릿 오락기 & 익스트림 스케이트보드 키링',
    rating: 4,
    content: '스트릿웨어에 진짜 잘 어울려요. 팝스타 네온 링 패키지로 하길 잘했네요. 빈티지 오락기 조이스틱 와펜이 엄청 디테일하고 실물 색감이 미쳤어요.',
    date: '2026-06-03'
  },
  {
    id: 'rev_7',
    userName: '하은',
    productName: 'att 1:1 풀커스텀 DIY 스포츠 스트랩 빌더',
    rating: 3,
    content: '원하는 컬러랑 패치 조합으로 제가 직접 골르고 디자인할 수 있는 점이 특별하네요! 다 좋은데 1:1 수제 직조제작이라 배송이 하루 늦어서 별 3개 드려요. 퀄리티 자체는 백화점 브랜드보다 훨씬 튼튼해요.',
    date: '2026-06-02'
  },
  {
    id: 'rev_8',
    userName: '동현',
    productName: 'att 오리지널 와펜 패브릭 스트랩 키링',
    rating: 5,
    content: '에어팟 프로 케이스에 달아줬는데 딥블랙 스트랩이라 묵직하면서 골드 아크릴 캡&카라비너 부속 포인트가 극강으로 조화롭고 멋집니다. 한 땀 자수도 아주 꼼꼼해요!',
    date: '2026-06-01'
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_20260601',
    userId: 'user_att_99',
    userName: '홍길동',
    phone: '010-9876-5432',
    email: 'lch200048@gmail.5m',
    items: [
      {
        id: 'cart_basic_acrylic_pink_glitter',
        productId: 'att-basic-acrylic',
        name: 'att 베이직 아크릴 키링 (글리터 (+500원) / 핑크 / 문구: GILDONG)',
        price: 5500,
        image: '',
        selectedColor: '핑크',
        selectedOption: '글리터 (+500원)',
        quantity: 1
      }
    ],
    totalPrice: 8500, // 5500 + 3000 shopping
    paymentMethod: '무통장 입금',
    recipientName: '홍길동',
    deliveryAddress: '서울특별시 마포구 백범로 31 att타워 1205호',
    deliveryMemo: '문 앞에 누고 벨 눌러 주세요.',
    status: '배송 중',
    trackingNumber: '우체국등기 5013-09-5134-1234',
    createdAt: '2026-06-05',
    instagramId: '@att_gildong'
  }
];

const INITIAL_CUSTOMS: CustomOrder[] = [
  {
    id: 'cust_20260608',
    userId: 'user_att_99',
    name: '홍길동',
    phone: '010-9876-5432',
    email: 'lch200048@gmail.com',
    config: {
      keyringType: '아크릴 하트 1:1 빌더',
      shape: 'heart',
      selectedColor: '소프트라벤더',
      wording: 'HAPPY',
      charmType: 'ribbon',
      hasGlitter: 'basic'
    },
    quantity: 1,
    status: '제작 중',
    requestedAt: '2026-06-08',
    instagramId: '@att_gildong',
    adminFeedback: '안녕하세요 홍길동님! 라벤더 바탕에 리본 매치 배치가 아주 훌륭합니다. 이니셜 문안 HAPPY 글씨는 가독성 높은 고대 폰트로 수작업 제작 착착 진행 중에 있습니다. 조금만 기다려주세요!',
    price: 9000
  }
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq_1',
    userName: '홍길동',
    phone: '010-9876-5432',
    email: 'lch200048@gmail.com',
    instagramId: '@att_gildong',
    inquiryType: '배송 문의',
    content: '우체국 택배 송장번호는 사이트에서 바로 조회가 가능한가요?',
    requestedAt: '2026-06-08',
    reply: '네 안녕하세요 길동님, 배송이 개시되는 즉시 사이트 MyPage 주문내역 탭 하단 파란색 등기 박스 영역에서 송장 번호가 실시간 조회 가능합니다!',
    isAnswered: true
  }
];

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('pink-heart-keyring');
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [aboutBgImage, setAboutBgImage] = useState<string>(() => {
    return localStorage.getItem('att_aboutBgImage') || '';
  });
  const [slide2BgImage, setSlide2BgImage] = useState<string>(() => {
    return localStorage.getItem('att_slide2BgImage') || '';
  });
  const [slide1BgImage, setSlide1BgImage] = useState<string>(() => {
    return localStorage.getItem('att_slide1BgImage') || '';
  });
  const [customBannerBgImage, setCustomBannerBgImage] = useState<string>(() => {
    return localStorage.getItem('att_customBannerBgImage') || '';
  });
  const [recruitBgImage, setRecruitBgImage] = useState<string>(() => {
    return localStorage.getItem('att_recruitBgImage') || '';
  });

  // Shared Data States
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('att_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('att_cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    return getProducts();
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('att_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((ord: Order) => 
          ord.recipientName === '김민지' ? { ...ord, recipientName: '홍길동' } : ord
        );
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(() => {
    const saved = localStorage.getItem('att_customOrders');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('att_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('att_reviews');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length < INITIAL_REVIEWS.length) {
        return INITIAL_REVIEWS;
      }
      return parsed;
    }
    return INITIAL_REVIEWS;
  });

  const [isSyncingWithFirebase, setIsSyncingWithFirebase] = useState<boolean>(true);

  // Sync state from Firebase on Mount
  useEffect(() => {
    async function initFirebaseSync() {
      try {
        setIsSyncingWithFirebase(true);

        // 1. Sync & Seed Products
        const dbProducts = await seedCollectionIfEmpty('products', DEFAULT_PRODUCTS, 'id');
        setProducts(dbProducts);

        // 2. Sync & Seed Orders
        const dbOrders = await seedCollectionIfEmpty('orders', INITIAL_ORDERS, 'id');
        setOrders(dbOrders);

        // 3. Sync & Seed Custom Orders
        const dbCustomOrders = await seedCollectionIfEmpty('custom_orders', INITIAL_CUSTOMS, 'id');
        setCustomOrders(dbCustomOrders);

        // 4. Sync & Seed Inquiries
        const dbInquiries = await seedCollectionIfEmpty('inquiries', INITIAL_INQUIRIES, 'id');
        setInquiries(dbInquiries);

        // 5. Sync & Seed Reviews
        const dbReviews = await seedCollectionIfEmpty('reviews', INITIAL_REVIEWS, 'id');
        setReviews(dbReviews);

        // 6. Sync background settings
        const settings = await fetchSettingsDoc('backgrounds');
        if (settings) {
          if (settings.aboutBgImage) setAboutBgImage(settings.aboutBgImage);
          if (settings.slide2BgImage) setSlide2BgImage(settings.slide2BgImage);
          if (settings.slide1BgImage) setSlide1BgImage(settings.slide1BgImage);
          if (settings.customBannerBgImage) setCustomBannerBgImage(settings.customBannerBgImage);
          if (settings.recruitBgImage) setRecruitBgImage(settings.recruitBgImage);
        } else {
          // Initialize settings doc in Firestore
          await saveSettingsDoc('backgrounds', {
            aboutBgImage: aboutBgImage || '',
            slide2BgImage: slide2BgImage || '',
            slide1BgImage: slide1BgImage || '',
            customBannerBgImage: customBannerBgImage || '',
            recruitBgImage: recruitBgImage || ''
          });
        }
      } catch (error) {
        console.error("Firebase sync error during initialization:", error);
      } finally {
        setIsSyncingWithFirebase(false);
      }
    }

    initFirebaseSync();

    // 7. Subscribe to real-time Firebase Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          let profile: User;
          if (userDocSnap.exists()) {
            profile = userDocSnap.data() as User;
          } else {
            profile = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '고객님',
              role: (firebaseUser.email === 'admin@att.com' || firebaseUser.email === 'lch200048@gmail.com') ? 'admin' : 'customer'
            };
            await setDoc(userDocRef, profile);
          }
          setCurrentUser(profile);
          safeLocalStorageSetItem('att_currentUser', JSON.stringify(profile));

          // Call syncProductsToFirestore securely if this is an admin user
          const adminEmail = firebaseUser.email;
          if (adminEmail === 'lch200048@gmail.com' || adminEmail === 'admin@att.com') {
            try {
              await syncProductsToFirestore(products);
            } catch (syncErr) {
              console.error("Failed to sync products on auth state change:", syncErr);
            }
          }
        } catch (error) {
          console.error("Error syncing user profile:", error);
          const fallbackUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '고객님',
            role: (firebaseUser.email === 'admin@att.com' || firebaseUser.email === 'lch200048@gmail.com') ? 'admin' : 'customer'
          };
          setCurrentUser(fallbackUser);
          safeLocalStorageSetItem('att_currentUser', JSON.stringify(fallbackUser));
        }
      } else {
        const isLocalAdmin = localStorage.getItem('att_is_local_admin') === 'true';
        if (isLocalAdmin) {
          const saved = localStorage.getItem('att_currentUser');
          if (saved) {
            setCurrentUser(JSON.parse(saved));
            return;
          }
        }
        setCurrentUser(null);
        localStorage.removeItem('att_currentUser');
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Update Settings in Firestore when modified
  useEffect(() => {
    if (!isSyncingWithFirebase) {
      saveSettingsDoc('backgrounds', {
        aboutBgImage,
        slide2BgImage,
        slide1BgImage,
        customBannerBgImage,
        recruitBgImage
      });
    }
  }, [aboutBgImage, slide2BgImage, slide1BgImage, customBannerBgImage, recruitBgImage]);

  // Sync to localStorage
  useEffect(() => {
    safeLocalStorageSetItem('att_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    safeLocalStorageSetItem('att_cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    safeLocalStorageSetItem('att_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    safeLocalStorageSetItem('att_customOrders', JSON.stringify(customOrders));
  }, [customOrders]);

  useEffect(() => {
    safeLocalStorageSetItem('att_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    safeLocalStorageSetItem('att_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    safeLocalStorageSetItem('att_aboutBgImage', aboutBgImage);
  }, [aboutBgImage]);

  useEffect(() => {
    safeLocalStorageSetItem('att_slide2BgImage', slide2BgImage);
  }, [slide2BgImage]);

  useEffect(() => {
    safeLocalStorageSetItem('att_slide1BgImage', slide1BgImage);
  }, [slide1BgImage]);

  useEffect(() => {
    safeLocalStorageSetItem('att_customBannerBgImage', customBannerBgImage);
  }, [customBannerBgImage]);

  useEffect(() => {
    safeLocalStorageSetItem('att_recruitBgImage', recruitBgImage);
  }, [recruitBgImage]);

  // Unified Navigation Handler (Scroll-To-Top on View shift)
  const handleNavigate = (view: string, productId?: string, category?: string) => {
    if (view === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
      alert('🔒 이미지 일체 기공 등록 및 상품 관리는 관리자 계정(admin@att.com 또는 lch200048@gmail.com)으로 로그인 시에만 가능합니다.');
      setCurrentView('login');
      return;
    }
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (category) {
      setShopCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const itemId = `${item.productId}_${item.selectedColor}_${item.selectedOption}`;
    
    setCartItems(prev => {
      const exists = prev.find(i => i.id === itemId);
      if (exists) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id: itemId }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleBuyNow = (item: Omit<CartItem, 'id'>) => {
    handleAddToCart(item);
    handleNavigate('mypage');
  };

  // Placing Product Order (from shopping cart checkout)
  const handlePlaceOrder = (details: {
    recipientName: string;
    deliveryAddress: string;
    deliveryMemo: string;
    paymentMethod: Order['paymentMethod'];
    phone: string;
  }) => {
    const newOrder: Order = {
      id: `ord_${Date.now().toString().slice(-8)}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || '비회원',
      phone: details.phone,
      email: currentUser?.email || 'lch200048@gmail.com',
      items: cartItems,
      totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 3000,
      recipientName: details.recipientName,
      deliveryAddress: details.deliveryAddress,
      deliveryMemo: details.deliveryMemo,
      paymentMethod: details.paymentMethod,
      status: '주문 접수',
      createdAt: new Date().toISOString().split('T')[0],
      instagramId: currentUser?.instagramId
    };

    setOrders(prev => [newOrder, ...prev]);
    saveDocToDb('orders', newOrder.id, newOrder);
  };

  // Custom Keyring Order (from real-time builder)
  const handleAddCustomOrder = (rawOrder: Omit<CustomOrder, 'id' | 'requestedAt' | 'status' | 'price'>) => {
    const newCustom: CustomOrder = {
      ...rawOrder,
      id: `cust_${Date.now().toString().slice(-8)}`,
      requestedAt: new Date().toISOString().split('T')[0],
      status: '주문 접수',
      price: 8000 + (rawOrder.config.hasGlitter !== 'none' ? 500 : 0) + (rawOrder.config.charmType !== 'none' ? 1000 : 0)
    };

    setCustomOrders(prev => [newCustom, ...prev]);
    saveDocToDb('custom_orders', newCustom.id, newCustom);
  };

  // Review Operations
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newReview,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [review, ...prev]);
    saveDocToDb('reviews', review.id, review);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    deleteDocFromDb('reviews', id);
  };

  // Support Inquiry
  const handleAddInquiry = (newInq: Omit<Inquiry, 'id' | 'requestedAt' | 'isAnswered'>) => {
    const inquiry: Inquiry = {
      ...newInq,
      id: `inq_${Date.now().toString().slice(-6)}`,
      requestedAt: new Date().toISOString().split('T')[0],
      isAnswered: false
    };

    setInquiries(prev => [inquiry, ...prev]);
    saveDocToDb('inquiries', inquiry.id, inquiry);
  };

  // Admin Dashboard actions
  const handleAddProduct = (newProduct: Omit<Product, 'reviewCount' | 'rating'>) => {
    const completeProd: Product = {
      ...newProduct,
      reviewCount: 0,
      rating: 5.0
    };
    const updated = [completeProd, ...products];
    setProducts(updated);
    saveProducts(updated);
    saveDocToDb('products', completeProd.id, completeProd);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updated);
    saveProducts(updated);
    saveDocToDb('products', updatedProduct.id, updatedProduct);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
    deleteDocFromDb('products', id);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus, trackingNo?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updated = { ...o, status, trackingNumber: trackingNo || o.trackingNumber };
        saveDocToDb('orders', orderId, updated);
        return updated;
      }
      return o;
    }));
  };

  const handleUpdateCustomOrderStatus = (customId: string, status: OrderStatus, feedback?: string) => {
    setCustomOrders(prev => prev.map(c => {
      if (c.id === customId) {
        const updated = { ...c, status, adminFeedback: feedback || c.adminFeedback };
        saveDocToDb('custom_orders', customId, updated);
        return updated;
      }
      return c;
    }));
  };

  const handleAnswerInquiry = (inquiryId: string, reply: string) => {
    setInquiries(prev => prev.map(i => {
      if (i.id === inquiryId) {
        const updated = { ...i, reply, isAnswered: true };
        saveDocToDb('inquiries', inquiryId, updated);
        return updated;
      }
      return i;
    }));
  };

  // Auth Operations
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('att_is_local_admin');
      localStorage.removeItem('att_currentUser');
      setCurrentUser(null);
      await signOut(auth);
      alert('안전하게 로그아웃 되었습니다.');
      setCurrentView('home');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Render match pages based on view state
  const renderView = () => {
    switch (currentView) {
      case 'shop':
        return (
          <ShopView 
            products={products} 
            onNavigate={handleNavigate} 
            category={shopCategory}
            onSetCategory={(cat) => setShopCategory(cat)}
          />
        );
      
      case 'detail':
        const prod = products.find(p => p.id === selectedProductId) || products[0];
        return (
          <DetailView 
            product={prod} 
            onNavigate={handleNavigate} 
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            currentUser={currentUser}
            onUpdateProduct={handleUpdateProduct}
          />
        );
      
      case 'custom':
        return (
          <CustomOrderView 
            onAddCustomOrder={handleAddCustomOrder}
            currentUserEmail={currentUser?.email}
            currentUserName={currentUser?.name}
          />
        );
      
      case 'review':
        return <ReviewView reviews={reviews} onAddReview={handleAddReview} />;
      
      case 'intro':
        return <IntroView />;
      
      case 'event':
        return <EventView />;
      
      case 'inquiry':
        return (
          <InquiryView 
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            currentUserEmail={currentUser?.email}
            currentUserName={currentUser?.name}
          />
        );
      
      case 'login':
        return <LoginView onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      
      case 'mypage':
        return (
          <MyPageView 
            currentUser={currentUser}
            cartItems={cartItems}
            orders={orders}
            customOrders={customOrders}
            inquiries={inquiries}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateCartQty={handleUpdateCartQty}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={handleNavigate}
          />
        );
      
      case 'admin':
        return (
          <AdminView 
            products={products}
            orders={orders}
            customOrders={customOrders}
            inquiries={inquiries}
            reviews={reviews}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateCustomOrderStatus={handleUpdateCustomOrderStatus}
            onAnswerInquiry={handleAnswerInquiry}
            onDeleteReview={handleDeleteReview}
            currentUser={currentUser}
            aboutBgImage={aboutBgImage}
            onUpdateAboutBgImage={(url) => {
              setAboutBgImage(url);
              safeLocalStorageSetItem('att_aboutBgImage', url);
            }}
            slide2BgImage={slide2BgImage}
            onUpdateSlide2BgImage={(url) => {
              setSlide2BgImage(url);
              safeLocalStorageSetItem('att_slide2BgImage', url);
            }}
            slide1BgImage={slide1BgImage}
            onUpdateSlide1BgImage={(url) => {
              setSlide1BgImage(url);
              safeLocalStorageSetItem('att_slide1BgImage', url);
            }}
            customBannerBgImage={customBannerBgImage}
            onUpdateCustomBannerBgImage={(url) => {
              setCustomBannerBgImage(url);
              safeLocalStorageSetItem('att_customBannerBgImage', url);
            }}
            recruitBgImage={recruitBgImage}
            onUpdateRecruitBgImage={(url) => {
              setRecruitBgImage(url);
              safeLocalStorageSetItem('att_recruitBgImage', url);
            }}
          />
        );

      case 'home':
      default:
        return (
          <HomeView 
            products={products} 
            onNavigate={handleNavigate} 
            currentUser={currentUser}
            aboutBgImage={aboutBgImage}
            slide2BgImage={slide2BgImage}
            slide1BgImage={slide1BgImage}
            customBannerBgImage={customBannerBgImage}
            recruitBgImage={recruitBgImage}
          />
        );
    }
  };

  return (
    <div id="root-viewport" className="min-h-screen flex flex-col bg-brand-cream/60">
      
      {/* Navigation Header */}
      <Navbar 
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, sum) => acc + sum.quantity, 0)}
        currentUser={currentUser}
        onLogout={handleLogout}
        isSyncingWithFirebase={isSyncingWithFirebase}
      />

      {/* Main Container Views Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {renderView()}
      </main>

      {/* Footer operations */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
