export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  _id: string;
  name: string;
  photo: string;
  category: string;
  price: number;
  stock: number;
};

export type CartItem = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    _id: string;
    name: string;
  };
  _id: string;
};

type ChangePercentAndCount = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransactions = {
  _id: string;
  discount: number;
  total: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: ChangePercentAndCount;
  count: ChangePercentAndCount;
  chart: { order: number[]; revenue: number[] };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransactions: LatestTransactions[];
};

export type Pie = {
  orderFullfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  productCategories: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outStock: number;
  };
  revenueDistribution: {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  usersAgeGroup: {
    teen: number;
    adult: number;
    old: number;
  };
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  products: number[];
  users: number[];
  orders: number[];
};

export type Line = {
  products: number[];
  users: number[];
  discount: number[];
  revenue: number[];
};

export type CouponType = {
    code: string;
    amount: number;
    _id: string;
  };
