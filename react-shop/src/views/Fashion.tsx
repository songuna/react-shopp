import { useRecoilValue } from "recoil";
import ProductList from "../components/products/ProductList";
import { fashionListSelector } from "../store/products";
import Breadcrumb from "../components/common/Breadcrumb";

const Fashion = () => {
  const fashionList = useRecoilValue(fashionListSelector);
  console.log(fashionList);
 return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <Breadcrumb category="홈" crumb="패션" />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
          패션
        </h2>
        <ProductList data={fashionList} />
      </article>
    </section>
  );
};

export default Fashion;




