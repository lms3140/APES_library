import styles from "./Home.module.css";
import { BannerSection } from "./BannerSection/BannerSection";
import { ShortcutSection } from "./ShortcutSection/ShortcutSection";
import { useEffect, useState } from "react";
import { BookListSection } from "./BookListSection/BookListSection";
import axios from "axios";

export function Home() {
  const url = "http://localhost:8080/BookCollection/all";
  const [bookCollections, setBookCollections] = useState([]);
  const { isLoading, isError } = useGetFetch(setBookCollections, url);
  console.log(isLoading);
  return (
    <div className={styles.homeContainer}>
      <BannerSection />
      <ShortcutSection />
      <div style={{ width: 1200, minHeight: 800 }}>
        {bookCollections.length > 0 &&
          bookCollections.map((item) => {
            return (
              <BookListSection key={item.collectionId} bookCollection={item} />
            );
          })}
        {isLoading && (
          <div className={styles.noBook}>
            <img
              src="./images/bookImg/loading.png"
              alt="no_book"
              width={1200}
            />
          </div>
        )}
        {isError && (
          <div className={styles.noBook}>
            <img
              src="./images/bookImg/no_book.png"
              alt="no_book"
              width={1200}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const useGetFetch = (setState, url) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getFetch() {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setState(res.data);
      } catch (e) {
        console.log(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getFetch();
  }, []);

  return { isError, isLoading };
};
