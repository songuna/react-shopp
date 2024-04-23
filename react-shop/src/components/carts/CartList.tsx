// React와 Link 컴포넌트를 react-router-dom에서 가져옴
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../store/products";

//Product 타입을 가져와서 cartItems 배열의 항목들을 이 타입으로 제한함
interface CartListProps {
  cartItems: Product[];
  itemCounts: { [key: string]: number };
  onItemCountChange: (id: number, count: number) => void;
}


//CartListProps 인터페이스를 정의함, cartItems 배열과 각 상품의 수량 정보를 담고 있는 itemCounts 객체, 그리고 상품 수량이 변경될 때 
//호출될 콜백 함수 onItemCountChange을 포함
  //CartList 컴포넌트를 함수형 컴포넌트로 정의합니다. 
  //이 컴포넌트는 cartItems, itemCounts, onItemCountChange를 props로 받는다
      // JSX를 사용하여 장바구니 목록을 렌더링 
    // cartItems 배열을 매핑하여 각 상품을 표시함
    //각 상품은 링크를 통해 상세 페이지로 이동할 수 있도록 Link로 감싸져있음
    // 각 상품에는 제목, 이미지, 가격이 표시 
    // "-" 버튼은 해당 상품의 수량을 감소시키고, "+" 버튼은 수량을 증가 
    // 각 버튼 클릭 시 onItemCountChange 콜백이 호출됨
const CartList: React.FC<CartListProps> = ({
  cartItems,
  itemCounts,
  onItemCountChange,
}) => {
  return (
    <div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="lg:flex lg:items-center mt-4 px-2 lg:px-0"
        >
          <Link to={`/product/${item.id}`}>
            <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
              <img
                src={item.image}
                alt={item.title}
                className="object-contain w-full h-48"
              />
            </figure>
          </Link>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              <Link to={`/product/${item.id}`} className="link link-hover">
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 mb-4 text-3xl">${item.price}</p>
            <div className="card-actions">
              <div className="btn-group">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    onItemCountChange(item.id, itemCounts[item.id] - 1)
                  }
                >
                  -
                </button>
                <button className="btn btn-ghost no-animation">
                  {itemCounts[item.id]}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    onItemCountChange(item.id, itemCounts[item.id] + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

//CartList 컴포넌트를 내보냅니다.
export default CartList;