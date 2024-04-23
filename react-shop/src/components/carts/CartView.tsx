import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import Breadcrumb from '../common/Breadcrumb';
import {Product} from '../../store/products';
import {cartState} from '../../store/cart';
import Confirm from '../common/Confirm';
import CartList from './CartList';

const CartView = () => {
  /*
  1. 문제였던 것.
  기존의 useEffect들의 dependencies itemCounts가 없었다! -> useEffect(() => {...}, [여기가 dependencies])
  useEffect는 dependencies에 들어있는 값들이 바뀌었을 때만 실행되는 함수이기 때문에,
  A가 바뀌었을때 이 useEffect가 실행됐음 좋겠어~ 싶으면 무조건 dependencies에 해당 값을 넣어주어야 함!

  2. useRecoilValue -> useRecoilState로 바꿔준 이유
  useRecoilState는 전역상태에 대한 useState라고 생각하면 됨.
  아래에서 cartItems가 기존 getCartList 인거고, setCartItems는 요 값을 수정해주는 함수.

  그래서 왜 useRecoilState를 사용해주었느냐??
  핵심은, useRecoilValue로 얻어온 값(구 getCartList)을 수정한다고 해서, 그게 실제로 반영되지 않기 때문!
  (예시: itemCounts 값을 setItemCounts 함수 없이 직접 바꾸는 게 안되는 것과 동일함.)

  따라서, itemCounts 값의 변경에 따라 cartItems(구 getCartList) 내부 값을 올바르게 수정해주기 위해서,
  useRecoilState를 활용하여 [cartItems, setCartItems] 를 둘 다 가져와준 것이다! (useRecoilValue는 요기서 cartItems만 갖고오는 함수임)
   */
  const [cartItems, setCartItems] = useRecoilState<Product[]>(cartState);

  const [itemCounts, setItemCounts] = useState<{[key: string]: number}>(() => {
    const storedItemCounts = localStorage.getItem('itemCounts');
    return storedItemCounts? JSON.parse(storedItemCounts) : Object.fromEntries(cartItems.map(item => [item.id,  1]));
  });

  const [totalPrice, setTotalPrice] = useState<number>(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    return storedTotalPrice ? Number(storedTotalPrice) : 0;
  });

  /*
  3. 기존 useEffect 삭제 이유
  기존 useEffect에서는 cartItems에 없는 상품이 추가될 경우 itemsCounts에 해당 아이템을 {id: 1} 의 형태로 추가해주는 로직이 있었다.
  근데, 장바구니 페이지에서는 어차피 새로운 상품이 추가될 수 없으니, 해당 하는 부분들 제거함.
  그렇게 제거하고 나니, itemCounts === 0일때 해당 상품을 cartItems에서 없애는 로직만 남게 되었는데,
  그 경우 굳이 useEffect가 아니라 아래의 handleItemCountChange에서 처리 가능하다고 판단되어 useEffect는 제거함.
  */

  const calculateTotalPrice = () => {
    let sumPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const count = itemCounts[item.id] || 0;
      sumPrice += item.price * count;
    }
    const formattedPrice = Number(sumPrice.toFixed(2));
    setTotalPrice(formattedPrice);
    localStorage.setItem('totalPrice', formattedPrice.toString());

  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  /*
  3. handleItemCountChange 로직 변화
    1) 새로 업데이트할 updatedItemCounts를 만들고,
    2) count === 0 이면 updatedItemCounts[id] 값 삭제, 아니면 해당 값 업데이트
    3) itemCounts 업데이트 -> setItemCounts()
    4) cartItems도 같이 업데이트 해줌! -> setCartItems()
   */
  const handleItemCountChange = (id: number, count: number) => {
    const updatedItemCounts = {...itemCounts};
    if (count === 0) {
      delete updatedItemCounts[id];
    } else {
      updatedItemCounts[id] = count;
    }
    setItemCounts(updatedItemCounts);
    
    /*
    4. 90~91L 로직 설명
     array.filter(조건문): array 내 items에 대하여, 조건문을 통과하는 아이템만 가지는 새로운 배열을 return한다.

     prevCartItems(이전 item배열) 내 items 중, updatedItemCounts[item.id] 가 존재하는 item만 두고 나머지는 걸러낸다.
     위에서 count === 0인 item들은 updatedItemCounts에서 전부 제거해주었기 때문에, 
     결과적으로, setCartItems(count !== 0 인 아이템들)이 된다.
    */
    const updatedItemCarts =cartItems.filter(item => updatedItemCounts[item.id]);
    setCartItems(updatedItemCarts);

    localStorage.setItem('itemCounts', JSON.stringify(updatedItemCounts));
    localStorage.setItem('cart', JSON.stringify(updatedItemCarts));
  };

  const handleClickConfirm = () => {
    setCartItems([]);
    localStorage.setItem('cart', "[]");
    localStorage.setItem('itemCounts', "{}");
    localStorage.setItem('totalPrice', "0");
  }

  return (
    <>
      <Breadcrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {cartItems.length === 0 ? (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        ) : null}
      </div>
      <div className="lg:flex justify-between mb-20">
        <CartList cartItems={cartItems} itemCounts={itemCounts} onItemCountChange={handleItemCountChange} />
        <div className="self-start shrink-0 flex items-center mt-10 mb-20">
          <span className="text-xl md:text-2xl">총: ${totalPrice.toFixed(2)}</span>
          <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
            구매하기
          </label>
        </div>
      </div>
      <Confirm handleClickConfirm={handleClickConfirm}/>
    </>
  );
};

export default CartView;
