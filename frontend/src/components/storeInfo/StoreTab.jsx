import styles from "./StoreTab.module.css";

export function StoreTab({ activeTab, onTabChange }) {
  const koTab = [
    { key: "서울", value: "seoul" },
    { key: "경기/인천", value: "gyeonggi" },
    { key: "수도권 외", value: "etc" },
  ];
  return (
    <div className={styles.tabOuter}>
      <div className={styles.tabInner}>
        {koTab &&
          koTab.map((tab) => {
            return (
              <button
                key={tab.value}
                className={`${styles.tab} ${
                  activeTab === tab.value ? styles.active : ""
                }`}
                onClick={() => onTabChange(tab.value)}
              >
                {tab.key}
              </button>
            );
          })}
      </div>
    </div>
  );
}
