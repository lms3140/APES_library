import styles from "../../pages/Search/Search.module.css";
import { Link } from "react-router-dom";

export function SearchItems({ item }) {
  return (
    <div className={styles.itemBox}>
      <img src={item.imageUrl} alt={item.title} />

      <div className={styles.itemInfo}>
        <h4>{item.title}</h4>
        <p>
          <Link to={`?keyword=${encodeURIComponent(item.authors)}`}>
            {item.authors}
          </Link>
          저자(글)
        </p>
        <p>출판사</p>
        <p>{item.price}원</p>
        <p>{item.point}</p>
      </div>
      <div>
        <Link to="/cart">장바구니</Link>
        <Link to="/payment">바로구매</Link>
      </div>
    </div>
  );
}
