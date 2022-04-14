export interface Cart {
  id?: number;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  customer_address: string;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

export interface Order {
  id?: number;
  order_id?: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  customer_address: string;
  total_items?: number;
  total_amount?: number;
  order_status?: string;
  items: OrderItem[];
  payment?: Payment;
}

export interface Payment {
  id?: number;
  payment_id?: string;
  razorpay_order_id?: any;
  razorpay_signature?: any;
  payment_status?: string;
  payment_method: string;
  delivery_status?: any;
  consignment_number?: any;
  created_at?: string;
  courier?: any;
  dispatched_at?: any;
  cancelled_at?: any;
  delivered_at?: any;
  outfordelivery_at?: any;
}

export interface OrderItem {
  id?: number;
  name?: string;
  image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  order_id?: string;
  product_id: number;
}

export enum OrderStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  OUT_FOR_DELIVERY = 'deliveryout',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
