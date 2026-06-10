/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  description: string;
  category: 'keyring' | 'wappen';
  images: string[]; // local placeholder names or uploaded base64 data URLs
  colors: string[];
  options: string[]; // Options e.g., '기본' / '글리터' / '홀로그램'
  size: string;
  material: string;
  leadTime: string;
  shippingFee: number;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
}

export interface CartItem {
  id: string; // unique item id in cart (combines product ID + options combo)
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedColor: string;
  selectedOption: string;
  quantity: number;
}

export type OrderStatus = '주문 접수' | '결제 확인' | '제작 중' | '배송 준비' | '배송 중' | '배송 완료';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  phone: string;
  email: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: '무통장 입금' | '토스 송금' | '카카오페이 송금' | '인스타 DM 확인';
  recipientName: string;
  deliveryAddress: string;
  deliveryMemo?: string;
  status: OrderStatus;
  trackingNumber?: string;
  createdAt: string;
  instagramId?: string;
}

export interface CustomKeyringConfig {
  keyringType: string; // e.g., '아크릴 하트', '동글 이니셜', '스퀘어 포토'
  shape: 'heart' | 'circle' | 'square' | 'star' | 'bear';
  selectedColor: string;
  wording: string;
  charmType: 'heart' | 'ribbon' | 'bear' | 'star' | 'flower' | 'none';
  hasGlitter: 'none' | 'basic' | 'holographic';
  customImageRef?: string; // base64 representation of uploaded reference image
}

export interface CustomOrder {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  config: CustomKeyringConfig;
  quantity: number;
  status: OrderStatus;
  requestedAt: string;
  instagramId?: string;
  adminFeedback?: string; // Guidance or draft preview notification
  price: number;
}

export interface Review {
  id: string;
  userName: string;
  productName: string;
  productId?: string;
  rating: number;
  content: string;
  image?: string; // base64 uploaded review photo
  date: string;
}

export interface Inquiry {
  id: string;
  userName: string;
  phone: string;
  email: string;
  instagramId?: string;
  inquiryType: '상품 문의' | '커스텀 제작 문의' | '배송 문의' | '교환/환불 문의' | '제양/협찬 문의' | '기타 문의';
  content: string;
  requestedAt: string;
  reply?: string;
  isAnswered: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  instagramId?: string;
  role: 'admin' | 'customer';
}
