import { BrowserRouter } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { Product } from "./store/products";
import { cartState } from "./store/cart";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";


// 페이지가 로드될 때 로컬 스토리지에서 장바구니 데이터를 가져와서 상태를 설정하고, 
// 필요한 경우 메뉴를 열거나 닫는 데 사용될 수 있는 참조를 생성
const App = (): JSX.Element => {

  // $hamburger는 useRef 훅을 사용하여 생성된 참조
  // 참조는 DOM 요소에 대한 접근을 제공
  //  HTMLInputElement에 대한 참조로 사용됨, 초기값은 null
  const $hamburger = useRef<HTMLInputElement>(null);

  // hamburger 메뉴를 열거나 닫는 데 사용
  const overlay = () => {

    // 현재 참조된 DOM 요소에 접근하고, .click()을 호출하여 해당 요소를 클릭
    // ?.는 옵셔널 체이닝 연산자로, $hamburger가 null이 아닌 경우에만 접근을 시도
    $hamburger?.current?.click();
  };

  // cartState의 상태를 업데이트하는 함수 setCartList를 생성
  const setCartList = useSetRecoilState<Product[]>(cartState);

  // 컴포넌트가 마운트될 때 한 번 실행되도록 설정
  // 빈 배열 []을 의존성 배열로 전달
  useEffect(() => {

    // 로컬 스토리지에서 "cart" 키에 해당하는 데이터를 가져옴
    const cartListString = localStorage.getItem("cart");
    if (cartListString) {

      // 가져온 데이터가 존재하는 경우
      // 문자열을 JavaScript 객체로 변환한 뒤
      const cartList = JSON.parse(cartListString);

      // setCartList 함수를 사용하여 장바구니 상태를 업데이트
      setCartList(cartList);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="drawer">
        <input id="side-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Header />
          <section className="main pt-16 ">
            <Router />
          </section>
          <Footer />
        </div>
        <Drawer overlay={overlay} />
      </div>
    </BrowserRouter>
  );
};

export default App;