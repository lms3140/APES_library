import { useEffect, useState } from "react";
import styles from "./StoreMap.module.css";

export function StoreMap({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.storeMapInfo) return null;

  const floors = selectedStore.storeMapInfo;
  const isMultiFloor = floors.length > 1;

  // 어떤 매장이든 첫 번째 층 이름을 기본 선택값으로
  const [activeFloor, setActiveFloor] = useState("");

  // ✅ 매장이 바뀌거나 층 데이터가 갱신될 때 자동 초기화
  useEffect(() => {
    if (floors.length > 0) {
      setActiveFloor(floors[0].floorNumber || "default");
    }
  }, [selectedStore, floors]);

  // 층 데이터 찾기 (floorNumber가 완전히 다르더라도 index 기반 fallback)
  const currentFloor =
    floors.find((f) => f.floorNumber === activeFloor) || floors[0]; // 혹시 매칭 실패 시 첫 번째 층 표시

  if (!currentFloor) return null;

  return (
    <div className={styles.storeMap}>
      <h3 className={styles.title}>매장안내도</h3>

      {/* 지도와 위치 안내를 한 행으로 묶음 */}
      <div className={styles.floorWrapper}>
        {/* 왼쪽 — 위치 안내 */}
        <nav className={styles.sectionList}>
          <ul>
            {currentFloor.sections?.map((section, i) => (
              <li key={i} className={styles.sectionItem}>
                <span className={styles.sectionName}>
                  {section.sectionName}
                </span>
                <span className={styles.categories}>
                  {Array.isArray(section.categories)
                    ? section.categories.join("·")
                    : section.categories}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        {/* 오른쪽 — 지도 + 층 버튼 */}
        <div className={styles.mapContainer}>
          {isMultiFloor && (
            <div className={styles.floorTabs}>
              {floors.map((floor, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFloor(floor.floorNumber)}
                  className={`${styles.floorButton} ${
                    activeFloor === floor.floorNumber ? styles.active : ""
                  }`}
                >
                  {floor.floorNumber || `${idx + 1}층`}
                </button>
              ))}
            </div>
          )}
          <img
            src={currentFloor.map}
            alt={`${currentFloor.floorNumber} 매장 안내도`}
            className={styles.mapImage}
          />
        </div>
      </div>
    </div>
  );
}
