import { atom } from "recoil";
import { Product } from "./products";

interface CartProduct extends Product {
  count: number
}

export const cartState = atom<CartProduct[]>({
  key: "cartState",
  default: [],
});