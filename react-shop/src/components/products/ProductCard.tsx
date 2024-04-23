import { Link } from "react-router-dom";
import { Product } from "../../store/products";

const ProductCard = (props: { data: Product }) => {
  const product = props.data;
  return (
    <Link
      to={`/product/${[product.id]}`}
      className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
    >
      <figure className="flex h-80 bg-white overflow-hidden">
        <img src={product.image} alt={product.title} />
      </figure>
      <div className="card-body rounded-b-2xl bg-gray-100 dark:bg-gray-700">
        <p className="card-title text-base">{product.title}</p>
        <p className="text-base">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;