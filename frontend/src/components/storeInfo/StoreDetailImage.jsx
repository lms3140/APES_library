import styles from "./StoreDetailImage.module.css";

export function StoreDetailImage({ store }) {
  return (
    <div className={styles.imageWrapper}>
      <img src={store?.image} alt="매장사진" className={styles.storeImage} />
    </div>
  );
}
