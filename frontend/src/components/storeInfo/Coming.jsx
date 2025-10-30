import { FiMapPin } from "react-icons/fi";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { Parking } from "./Parking";

export function Coming({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.kakaoMap) {
    return null;
  }

  //문자열로 된 위도, 경도 숫자타입으로 변환
  const lat = Number(selectedStore.kakaoMap.strLat);
  const lng = Number(selectedStore.kakaoMap.strLong);

  return (
    <div id="coming">
      <h1>오시는길</h1>
      <div>
        <h2>
          <FiMapPin />
          {selectedStore.address}
        </h2>
        <Map center={{ lat, lng }} style={{ width: "50%", height: "360px" }}>
          <MapMarker position={{ lat, lng }}></MapMarker>
          <MapTypeControl position={"TOPRIGHT"} />
          <ZoomControl position={"RIGHT"} />
        </Map>
      </div>
      <div>
        <Parking selectedStore={selectedStore} />
      </div>
    </div>
  );
}
