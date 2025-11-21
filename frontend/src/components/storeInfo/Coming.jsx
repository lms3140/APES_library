import styles from "./Coming.module.css";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { TransportationInfo } from "./TransportationInfo.jsx";

export function Coming({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.kakaoMap) {
    return null;
  }

  //문자열로 된 위도, 경도 숫자타입으로 변환
  const lat = Number(selectedStore.kakaoMap.strLat);
  const lng = Number(selectedStore.kakaoMap.strLong);

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      className={styles.icon}
    >
      <desc>위치 아이콘</desc>
      <path
        stroke="#000"
        d="M12 2.5a8.07 8.07 0 0 0-5.646 2.266A7.7 7.7 0 0 0 4 10.273C4 16.318 12 21.5 12 21.5s8-5.182 8-11.227a7.7 7.7 0 0 0-2.354-5.507A8.07 8.07 0 0 0 12 2.5Z"
      />
      <circle cx="12" cy="10.5" r="3" stroke="#8F603D" />
    </svg>
  );

  return (
    <div className={styles.coming}>
      <h1 className={styles.title}>오시는길</h1>
      <div className={styles.mapWrap}>
        <div className={styles.mapBox}>
          <h2 className={styles.address}>
            {icon}
            {selectedStore.address}
          </h2>
          <Map center={{ lat, lng }} className={styles.map}>
            <MapMarker position={{ lat, lng }}></MapMarker>
            <MapTypeControl position={"TOPRIGHT"} />
            <ZoomControl position={"RIGHT"} />
          </Map>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.transportWrap}>
          <span className={styles.tabButton}>대중교통 안내</span>
          <TransportationInfo selectedStore={selectedStore} />
        </div>
      </div>
    </div>
  );
}
