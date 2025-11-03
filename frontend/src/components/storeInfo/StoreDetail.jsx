import styles from "./StoreDetail.module.css";
import { FaRegStar } from "react-icons/fa";

export function StoreDetail({ store }) {
  //지도보기 버튼 누르면 새창으로 카카오맵 열기
  const handleOpenMap = () => {
    if (store?.mapUrl) {
      window.open(store.mapUrl, "_blank");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoSection}>
        <div className={styles.header}>
          <h2 className={styles.title}>{store?.name}</h2>
          <button className={styles.favoriteButton}>
            <FaRegStar />
          </button>
        </div>

        <p className={styles.infoRow}>
          <span className={styles.infoLabel}>매장주소 </span>
          {store?.address}
        </p>

        <p className={styles.infoRow}>
          <span className={styles.infoLabel}>영업시간 </span>
          {store?.time}
        </p>

        <p className={styles.infoRow}>
          <span className={styles.infoLabel}>휴점 </span>
          {store?.holiday}
        </p>

        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={handleOpenMap}>
            지도보기
          </button>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>
            매장문의 {store?.tel}
          </button>
        </div>
      </div>

      <div className={styles.imageSection}>
        <img src={store?.image} alt="매장사진" className={styles.storeImage} />
      </div>
    </div>
  );
}
