// @ts-nocheck

import productsDataURL from '../assets/products.json';
import { selector } from "recoil";


const productsData = productsDataURL;

// 평점
interface Rating {
  readonly rate?: 0;
  readonly count?: 0;
}

// 제품
export interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly image: string;
  readonly rating: Rating;
  readonly count: number;
}

// 모든 제품목록을 가져옴
export const productsListSelector = selector<Product[]>({
  key: "productsListSelector",
  get: ({ get }) => {
    return productsData || [];
  },
});

// 패션제품 목록을 가져옴
export const fashionListSelector = selector<Product[]>({
  key: "fashionListSelector",
  get: ({ get }) => {
    const productsList = get(productsListSelector);
    return (
      productsList.filter((product) => product.category == "men's clothing","women's clothing") ||
      []
    );
  },
});

// 전자제품 목록을 가져옴
export const digitalListSelector = selector<Product[]>({
  key: "digitalListState",
  get: ({ get }) => {
    const productsList = get(productsListSelector);
    return (
      productsList.filter((product) => product.category == "electronics") || []
    );
  },
});

// 액세서리제품 목록을 가져옴
export const AccessoryListSelector = selector<Product[]>({
  key: "accessoryListSelector",
  get: ({ get }) => {
    const productsList = get(productsListSelector);
    return (
      productsList.filter((product) => product.category == "Accessory") || []
    );
  },
});
function atom(arg0: { key: string; default: { id: number; title: string; price: number; description: string; category: string; image: string; rating: { rate: number; count: number; }; }[]; }) {
  throw new Error("Function not implemented.");
}

