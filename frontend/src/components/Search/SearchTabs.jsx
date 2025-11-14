import styles from "../../pages/Search/Search.module.css";

export function SearchTabs() {
  return (
    <nav className={styles.tabs}>
      <ul>
        <li>
          <a href="#">통합검색</a>
        </li>
        <li>
          <a href="#">교보문고</a>
        </li>
        <li>
          <a href="#">eBook</a>
        </li>
        <li>
          <a href="#">sam</a>
        </li>
        <li>
          <a href="#">핫트랙스</a>
        </li>
      </ul>
    </nav>
  );
}
