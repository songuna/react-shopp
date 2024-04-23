import { useRecoilValue, useSetRecoilState } from "recoil";
import { Product, productsListSelector } from "../../store/products";
import { cartState } from "../../store/cart";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../common/Rating";
import Breadcrumb from "../common/Breadcrumb";



// Index 컴포넌트는 Recoil을 사용하여
// 장바구니 상태를 업데이트할 수 있는 함수와 상품 목록을 가져오는 셀렉터의 값을 사용
// 현재 라우트에서의 매개변수인 id를 가져와서 사용
const Index = () => {
  // useSetRecoilState 훅을 사용하여 cartState 원자의 상태를 업데이트할 수 있는 함수인 setCartList를 선언
  // 장바구니 상태를 업데이트함
  const setCartList = useSetRecoilState<Product[]>(cartState);

  // useRecoilValue 훅을 사용하여 productsListSelector 셀렉터의 현재 값을 가져옴
  // 상품 목록을 나타낸다
  const productsList = useRecoilValue(productsListSelector);

  // useParams 훅을 사용하여 현재 라우트의 매개변수를 가져옴
  // 이 코드가 포함된 컴포넌트가 라우트에 의해 렌더링되었을 때 URL에서 매개변수를 추출
  // 이를 id 변수에 할당
  const { id } = useParams();


  // useState 훅을 사용하여 상태를 관리
  // 현재 선택된 상품의 정보를 저장

  // product: 현재 상태 값, 이 변수는 상품 정보를 나타내는데 사용
  // setProduct: product 상태를 업데이트하는 함수, 이 함수를 호출하여 product 상태를 변경할 수 있음

  // useState<Product | null>(null): useState 함수의 인자로 초기 상태 값을 전달함,
    //여기서는 Product 타입 또는 null을 가질 수 있는 상태로 설정되어있음
    // 초기 값으로는 null이 지정되어 있으므로, 초기에는 어떤 상품 정보도 없음을 의미
  const [product, setProduct] = useState<Product | null>(null);



  // addCart 함수는 현재 선택된 상품을 장바구니에 추가
  // useEffect 훅은 페이지가 로드될 때 선택된 상품을 설정하거나,
    // 해당 상품이 없으면 오류 페이지로 이동


  // 이 함수는 장바구니에 상품을 추가하는 기능을 수행
  // product가 null이 아닌 경우에만 작동
  const addCart = () => {
    if (product) {

      // 장바구니 상태를 업데이트
      // 이전 상태 값을 활용하기 위해 함수형 업데이트를 사용
      setCartList((old) => {
        let newList = [...old];
        const isProductAlreadyExist = old.find(p => p.id === product.id);
        if(!isProductAlreadyExist){
        // 새로운 장바구니 목록을 기존의 장바구니 목록에 현재 선택된 상품인 product를 추가하여 생성
        newList.push(product);

        // localStorage.setItem을 사용하여 로컬 스토리지에 새로운 장바구니 목록을 문자열로 저장
        localStorage.setItem("cart", JSON.stringify(newList));
        }
        
        
        const rawItemCount = localStorage.getItem('itemCounts');
        const itemCount = rawItemCount? JSON.parse(rawItemCount) : {};
        if(itemCount[product.id]){
          localStorage.setItem('itemCounts', JSON.stringify({...itemCount, [product.id]: itemCount[product.id]+1}))
        }else{
          localStorage.setItem('itemCounts', JSON.stringify({...itemCount, [product.id]: 1}));
        }

        // 새로운 장바구니 목록을 반환
        return newList;
      });
    }
  };

  // 컴포넌트가 렌더링될 때 한 번만 실행
  // 빈 배열 []을 의존성 배열로 전달하여 실현
  useEffect(() => {

    // productsList 배열에서 현재 라우트의 id에 해당하는 상품을 찾는다
    // findProduct 변수에 해당 상품을 할당
    const findProduct = productsList.find(
      (product) => product.id == Number(id)
    );

    // 만약 찾은 상품이 null이면, 페이지를 /error로 이동
    // useNavigate 훅을 사용하여 라우터를 제어
    if (findProduct == null) {
      const navigate = useNavigate();
      navigate("/error");
      return;
    }

    // 찾은 상품이 있다면, 해당 상품을 setProduct 함수를 사용해 product 상태로 설정
    // 이후 컴포넌트가 다시 렌더링되어 선택된 상품을 표시
    setProduct(findProduct);
  }, []);

  return product ? (
    <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <div>
        <Breadcrumb category={product.category} crumb={product.title} />
        <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
          <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
            <img src={product.image} className="object-contain w-full h-72" />
          </figure>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              {product.title}
              <span className="badge badge-accent ml-2">NEW</span>
            </h2>
            <p>{product.description}</p>
            <Rating rate={product.rating.rate} count={product.rating.count} />
            <p className="mt-2 mb-4 text-3xl">${product.price}</p>
            <div className="card-actions">
              <button onClick={addCart} className="btn btn-primary">
                장바구니에 담기
              </button>
              <Link to="/cart" className="btn btn-outline ml-1">
                장바구니로 이동
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Index;