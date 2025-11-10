/* 
  참고사항!!
  Primary button
  Primary button 컴포넌트는 가장 중요한 액션을 나타내는 버튼으로, 강조된 색상과 크기로 다른 버튼과 구분되어 시각적 우선순위를 제공합니다.
  '장바구니', '구매하기' 등 수행할 행동을 명확히 전달하며, 박스 버튼 형태에서만 사용됩니다. 한 영역에서는 하나의 행동만 유도해야 합니다.

  Secondary button
  주로 Primary button의 보조 역할을 합니다.
  색상이나 크기에서 더 부드럽거나 중립적인 스타일을 가집니다. 

  Tertiary button
  기본 버튼(Primary button)과 보조 버튼(Secondary button)과 함께 사용되며, 상대적으로 중요도가 낮은 작업이나 선택을 나타냅니다. 시각적으로 부드럽게 디자인되며, 가장 낮은 위계로 전 채널에서 공통으로 사용됩니다.
  
  */

import style from "./Button.module.css";

const btnTypeObject = {
  primary: style.primary,
  secondary: style.secondary,
  tertiary: style.tertiary,
};

const btnSizeObj = {
  lg: style.btnLarge,
  sm: style.btnSmall,
};

/**
 *
 * @param {object} props
 * @returns
 */
export function Button({
  btnTypes = "primary",
  size = "lg",
  children,
  onClick,
}) {
  const btnType = btnTypeObject[btnTypes] || btnTypeObject["primary"];
  const btnSize = btnSizeObj[size] || btnSizeObj["lg"];
  return (
    <button onClick={onClick} className={`${btnType} ${btnSize}`}>
      {children}
    </button>
  );
}
