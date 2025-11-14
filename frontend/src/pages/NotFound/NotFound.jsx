import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button/Button";
import notFoundStyle from "./NotFound.module.css";

export function NotFound() {
  const nav = useNavigate();
  return (
    <div className={notFoundStyle.notFoundContainer}>
      <div className={notFoundStyle.infoWrapper}>
        <h1>요청하신 페이지를 찾을수 없습니다</h1>
        <p>
          주소를 다시 한 번 확인해 주시거나,
          <br />
          홈으로 돌아가서 다시 시도해 주세요.
        </p>
      </div>
      <div className={notFoundStyle.btnWrapper}>
        <Button
          btnTypes="secondary"
          onClick={() => {
            nav(-1);
          }}
        >
          이전페이지
        </Button>

        <Button
          onClick={() => {
            nav("/");
          }}
        >
          홈으로
        </Button>
      </div>
    </div>
  );
}
