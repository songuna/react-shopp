import { Routes, Route } from "react-router-dom";
import Error from "../components/common/Error";
import Index from "../views/Index";
import Cart from "../views/Cart";
import Fashion from "../views/Fashion";
import Accessory from "../views/Accessory";
import Digital from "../views/Digital";
import Detail from "../components/products/ProductView";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/accessory" element={<Accessory />} />
      <Route path="/digital" element={<Digital />} />
      <Route path="/product/:id" element={<Detail />} />
    </Routes>
  );
};

export default Router;