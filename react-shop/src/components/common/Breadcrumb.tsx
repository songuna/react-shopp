// Category라는 다른 파일에서 내보낸 객체를 가져옴
import { Category } from "./Category";

//  category와 crumb라는 두 개의 옵셔널한 속성을 가지며
// defaultProps와 같은 속성도 포함
type Breadcrumbs = {
  category?: string;
  crumb?: string;
} & typeof defaultProps;

// efaultProps는 category와 crumb 속성의 기본값을 정의
const defaultProps = {
  category: "",
  crumb: "",
};

//  컴포넌트는 category와 crumb 속성을 받아와서 사용
// Breadcrumbs 타입을 매개변수로 받으며, 반환값은 JSX 요소
const Breadcrumb = ({ category, crumb }: Breadcrumbs): JSX.Element => {
  
  // category 값을 사용하여 Category 객체에서 해당 카테고리의 이름을 가져오거나
  // 만약 해당 카테고리가 없다면 그대로 표시합니다. 그리고 crumb은 그대로 표시
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>{!!Category[category] ? Category[category] : category}</li>
        <li>{crumb}</li>
      </ul>
    </div>
  );
};

Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
