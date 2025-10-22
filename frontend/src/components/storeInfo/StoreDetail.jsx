import { FaRegStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export function StoreDetail({ store }) {
  //지도보기 버튼 누르면 새창으로 카카오맵 열기
  const handleOpenMap = () => {
    if (store?.mapUrl) {
      window.open(store.mapUrl, "_blank");
    }
  };

  return (
    <div>
      <div>
        <FiMapPin />
        {store?.name}
      </div>
      <h2>{store?.name}</h2>
      <button>
        <FaRegStar />
      </button>
      <p>
        <span>매장주소 </span>
        {store?.address}
      </p>
      <p>
        <span>영업시간 </span>
        {store?.time}
      </p>
      <p>
        <span>휴점 </span>
        {store?.holiday}
      </p>
      <div>
        <button onClick={handleOpenMap}>지도보기</button>
        <button>매장문의 {store?.tel}</button>
      </div>
      <div>
        <img src={store?.image} alt="매장사진" />
      </div>
    </div>
  );
}
