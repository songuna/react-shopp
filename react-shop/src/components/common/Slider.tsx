import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../assets/css/style.css";
import fashionImage from "../../assets/img/carousel/img_shop_fashion.jpeg";
import digitalImage from "../../assets/img/carousel/img_shop_digital.jpeg";
import groceryImage from "../../assets/img/carousel/img_shop_grocery.jpeg";
import { Link } from "react-router-dom";

const sliderData = [
  {
    name: "fashion",
    src: fashionImage,
    text: "물빠진 청바지!",
    small: "이제 막 도착한 패션 청바지를 구경해 보세요.",
  },
  {
    name: "digital",
    src: digitalImage,
    text: "신속한 업무처리!",
    small: "다양한 디지털 상품을 둘러보세요.",
  },
  {
    name: "grocery",
    src: groceryImage,
    text: "신선한 식품!",
    small: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
  },
];

interface sliderItem {
  readonly name: string;
  readonly src: string;
  readonly text: string;
  readonly small: string;
}

const renderSlides = sliderData.map((slide: sliderItem) => (
  <div key={slide.name} className="carousel-slide">
    <div className="carousel-description absolute left-auto right-auto bottom-1/3 mb-10 text-left w-full lg:container px-4 md:px-10">
      <h2 className="text-2xl lg:text-4xl font-bold text-white">
        {slide.text}
      </h2>
      <p className="my-2 text-white">{slide.small}</p>
      <Link to={`/${slide.name}`} className="btn btn-sm lg:btn-md mt-3">
        바로가기
        <svg
          xmlns="https://www.w3.org/TR/SVG2/"
          className="h-5 w-5 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
    <img src={slide.src} alt={slide.name} />
  </div>
));

export default function Slider() {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      className="carousel-container"
    >
      {renderSlides}
    </Carousel>
  );
}