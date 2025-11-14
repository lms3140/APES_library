import styles from "../../pages/Search/Search.module.css";

export function SearchItems({ item }) {
  return (
    <div className={styles.itemBox}>
      <img src={item.imageUrl} alt={item.title} />

      <div className={styles.itemInfo}>
        <h4>{item.title}</h4>
        <p>{item.author}</p>
        <p>출판사</p>
        <p>{item.price}원</p>
        <p>{item.point}</p>
      </div>
    </div>
  );
}
