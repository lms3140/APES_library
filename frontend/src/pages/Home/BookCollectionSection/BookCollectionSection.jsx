import { SwiperBook } from "../../../components/SwiperWrapper/SwiperBook";
import styles from "./BookCollectionSection.module.css";

const mainSwiperOptions = {
  slidesPerView: 6,
};

export function BookCollectionSection({ bookCollection }) {
  return (
    <section className={styles.bookListSection}>
      <div className={styles.bookListItem}>
        <h2>{bookCollection.collectionName}</h2>
      </div>
      <SwiperBook
        swiperOptions={mainSwiperOptions}
        bookList={bookCollection.books}
      />
    </section>
  );
}
