import { Button } from "../components/common/Button/Button";

export function NotFound() {
  return (
    <div>
      <div>
        <h1>요청하신 페이지를 찾을수 없습니다</h1>
        <p>
          주소를 다시 한 번 확인해 주시거나,
          <br />
          홈으로 돌아가서 다시 시도해 주세요.
        </p>
      </div>
      <div>
        <Button>아니이럴수가</Button>
        <Button>아니이럴수가</Button>
      </div>
    </div>
  );
}
