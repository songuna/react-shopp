import { Product } from "../../store/products";
import ProductCard from "./ProductCard";

const ProductList = (props: { data: Product[] }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {props.data.map((data, index) => {
        console.log(data);
        return <ProductCard data={data} key={index} />;
      })}
    </div>
  );
};

export default ProductList;