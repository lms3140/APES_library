// export function StoreTab({ activeTab, onTabChange }) {
//   const koTab = [
//     { key: "서울", value: "seoul" },
//     { key: "경기/인천", value: "gyeonggi" },
//     { key: "수도권 외", value: "etc" },
//   ];
//   return (
//     <div>
//       {koTab &&
//         koTab.map((tab) => {
//           return (
//             <button
//               key={tab.value}
//               className={activeTab === tab.value ? "active" : ""}
//               onClick={() => onTabChange(tab.value)}
//             >
//               {tab.key}
//             </button>
//           );
//         })}
//     </div>
//   );
// }

"use client";

import styles from "./StoreTab.module.css";

export function StoreTab({ activeTab, onTabChange }) {
  const koTab = [
    { key: "서울", value: "seoul" },
    { key: "경기/인천", value: "gyeonggi" },
    { key: "수도권 외", value: "etc" },
  ];

  return (
    <div className={styles.tabContainer}>
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
  );
}
