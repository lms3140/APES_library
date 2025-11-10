import styles from "./Home.module.css";
import { BannerSection } from "./BannerSection/BannerSection";
import { ShortcutSection } from "./ShortcutSection/ShortcutSection";
import { useEffect, useState } from "react";
import { BookListSection } from "./BookListSection/BookListSection";
import axios from "axios";

export function Home() {
  const { bookCollections, isError } = useBookList();

  return (
    <div className={styles.homeContainer}>
      <BannerSection />
      <ShortcutSection />
      {bookCollections.length > 0 &&
        bookCollections.map((item) => {
          return (
            <BookListSection key={item.collectionId} bookCollection={item} />
          );
        })}
      {isError && (
        <div className={styles.noBook}>
          <img src="./images/bookImg/no_book.png" alt="no_book" width={1200} />
        </div>
      )}
    </div>
  );
}

const useBookList = () => {
  const [bookCollections, setBookCollections] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function getCollectionBookList() {
      try {
        const res = await axios.get("http://localhost:8080/BookCollection/all");
        setBookCollections(res.data);
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
    }

    getCollectionBookList();
  }, []);
  return { bookCollections, isError };
};
