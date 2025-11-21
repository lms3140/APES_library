import styles from "./StoreDetail.module.css";

export function StoreDetail({ store }) {
  //지도보기 버튼 누르면 새창으로 카카오맵 열기
  const handleOpenMap = () => {
    if (store?.mapUrl) {
      window.open(store.mapUrl, "_blank");
    }
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#fff"
      stroke="#000"
      class="min-w-5"
      viewBox="0 0 16 16"
    >
      <desc>별 아이콘</desc>
      <g clip-path="url(#a)">
        <path
          stroke="current"
          d="M7.706 2.85a.327.327 0 0 1 .589 0l1.327 2.464c.166.308.453.53.785.6l2.655.561c.257.056.362.387.181.593L11.41 9.153c-.226.26-.34.616-.302.971l.31 2.812c.03.276-.242.482-.476.363l-2.459-1.177c-.31-.15-.664-.15-.973 0L5.05 13.3c-.24.119-.505-.087-.474-.363l.309-2.812a1.25 1.25 0 0 0-.302-.971L2.758 7.068c-.181-.206-.076-.537.18-.593l2.656-.56a1.18 1.18 0 0 0 .784-.6z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.infoSection}>
        <div className={styles.header}>
          <h2 className={styles.title}>{store?.name}</h2>
          <button className={styles.favoriteButton}>{icon}</button>
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
