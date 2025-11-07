import { SwiperBook } from "../../../components/SwiperWrapper/SwiperBook";
import styles from "./BookListSection.module.css";

const mainSwiperOptions = {
  slidesPerView: 6,
};

export function BookListSection({ bookList }) {
  return (
    <section className={styles.bookListSection}>
      <div className={styles.bookListItem}>
        <h2>타이틀</h2>
      </div>
      <SwiperBook swiperOptions={mainSwiperOptions} bookList={bookList} />
    </section>
  );
}
