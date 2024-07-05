import { NewProduct } from "../interfaces/product";

export const order = [
  {
    id: "fea51ffd-8115-491d-807c-0992d56f5982",
    productId: "92eh95e-hy34udj-f1j045-j9wo2ji",
    userId: "pdeh92e-mf34udj-foj045-j9wo2ji",
    productNumber: 56,
    isOrderCompleted: true,
    createdAt: "2024-05-05",
    updateAt: "2024-05-06"
  },
  {
    id: "56h92e-mf34udj-foj045-j9wo2jr",
    productId: "t98d92e-mf34udj-foj045-j9wo2ji",
    userId: "87eh92e-mf34udj-foj045-j9wo2ji",
    productNumber: 56,
    isOrderCompleted: true,
    createdAt: "2024-05-05",
    updateAt: "2024-05-06"
  },
  {
    id: "32ef92e-5f34udj-foj045-j9wo2ji",
    productId: "j2e92e-6f34udj-foj045-j9wo2ji",
    userId: "f9eh92e-mf34udj-foj045-j9wo2ji",
    productNumber: 56,
    isOrderCompleted: true,
    createdAt: "2024-05-05",
    updateAt: "2024-05-06"
  }
]

export const orderItem = {
  id: "56h92e-mf34udj-foj045-j9wo2jr",
  productId: "t98d92e-mf34udj-foj045-j9wo2ji",
  userId: "87eh92e-mf34udj-foj045-j9wo2ji",
  productNumber: 56,
  isOrderCompleted: true,
  createdAt: "2024-05-05",
  updateAt: "2024-05-06"
}

export const products:NewProduct[] = [
  {
    name: "Denim Hoodie",
    price: 20750,
    description: "Denim Black Hoodie",
    type: "Hood",
    size: "medium",
    quantity: 56,
    stockLimit: 200,
    images: ["denim.hoodie?/images.img"]
  },
  {
    name: "Addidas Jacket",
    price: 20750,
    description: "Addidas Black Jacket",
    type: "Jacket",
    size: "small",
    quantity: 78,
    stockLimit: 200,
    images: ["denim.hoodie?/images.img"]
  },
  {
    name: "Addidas Fashion Suit",
    price: 20750,
    description: "Brown silk jampky suit",
    type: "Suits",
    size: "Large",
    quantity: 200,
    stockLimit: 200,
    images: ["denim.suits?/images.img"]
  },
]

export interface CartItem {
  id: string;
  productId: string;
  userId: string;
  productNumber: number;
  createdAt?: Date;
  updateAt?: Date;
}

export const newTestProduct:NewProduct = {
  name: "Addidas Fashion Suit",
  price: 20750,
  description: "Brown silk jampky suit",
  type: "Suits",
  size: "Large",
  quantity: 200,
  stockLimit: 200,
  images: ["denim.suits?/images.img"]
}