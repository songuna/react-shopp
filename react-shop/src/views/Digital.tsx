import { useRecoilValue } from "recoil";
import ProductList from "../components/products/ProductList";
import { digitalListSelector } from "../store/products";
import Breadcrumb from "../components/common/Breadcrumb";

const Digital = () => {
  const digitalList = useRecoilValue(digitalListSelector);

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <Breadcrumb category="홈" crumb="디지털" />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
          디지털
        </h2>
        <ProductList data={digitalList} />
      </article>
    </section>
  );
};

export default Digital;