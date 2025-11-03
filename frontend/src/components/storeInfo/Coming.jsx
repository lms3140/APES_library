import styles from "./Coming.module.css";
import { FiMapPin } from "react-icons/fi";
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

  return (
    <div className={styles.coming}>
      <h1 className={styles.title}>오시는길</h1>
      <div className={styles.mapWrap}>
        <div className={styles.mapBox}>
          <h2 className={styles.address}>
            <FiMapPin className={styles.icon} />
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
