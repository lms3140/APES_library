import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { axiosData } from "../../utils/dataFetch.js";
import { SearchTabs } from "../../components/Search/SearchTabs.jsx";
import { SearchSort } from "../../components/Search/SearchSort.jsx";
import { SearchItem } from "../../components/Search/SearchItem.jsx";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const jsonData = await axiosData("../../../../data/aladin_data.json");
      setData(jsonData);
    };
    fetch();
  }, []);

  console.log("data :: ", data);

  useEffect(() => {
    if (!query) return;
    const lower = query.toLowerCase();
    const result = data.filter((item) =>
      item.title.toLowerCase().includes(lower)
    );
    setFiltered(result);
  }, [query, data]);

  return (
    <div className={styles.container}>
      {/* 상단 검색 정보 */}
      <div className={styles.header}>
        <h1>"{query}" 검색 결과</h1>
        <span>총 {filtered.length}건</span>
      </div>

      {/* 상단 카테고리 탭 */}
      <SearchTabs />

      {/* 정렬 영역 */}
      <SearchSort />

      {/* 검색 결과 리스트 */}
      <ul className={styles.list}>
        {filtered.map((item, idx) => (
          <SearchItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  );
}
