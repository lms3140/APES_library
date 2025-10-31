import styles from "./StoreMap.module.css";

export function StoreMap({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.storeMapInfo) {
    return null;
  }

  return (
    <div className={styles.storeMap}>
      <h3 className={styles.title}>매장안내도</h3>
      {selectedStore.storeMapInfo &&
        selectedStore?.storeMapInfo?.map((floor, idx) => (
          <div key={idx} className={styles.floorWrapper}>
            <nav className={styles.sectionList}>
              <ul>
                {floor.sections &&
                  floor?.sections?.map((section, i) => (
                    <div>
                      <li key={i} className={styles.sectionItem}>
                        <span className={styles.sectionName}>
                          {section?.sectionName}
                        </span>
                        <span className={styles.categories}>
                          {Array.isArray(section.categories)
                            ? section.categories.join(", ")
                            : section.categories}
                        </span>
                      </li>
                    </div>
                  ))}
              </ul>
            </nav>
            <div className={styles.mapContainer}>
              {/** 매장 2층 이상일 경우 사진 위 버튼 만들어서 한층씩 보이도록 수정해야함 --> 방법 모색.. */}
              <img
                src={floor.map}
                alt="매장안내도"
                className={styles.mapImage}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
