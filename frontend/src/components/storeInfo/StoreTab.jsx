export function StoreTab({ activeTab, onTabChange }) {
  const koTab = [
    { label: "서울", value: "seoul" },
    { label: "경기/인천", value: "gyeonggi" },
    { label: "수도권 외", value: "etc" },
  ];
  return (
    <div>
      {koTab &&
        koTab.map((tab) => {
          return (
            <button
              className={activeTab === tab.value ? "active" : ""}
              onClick={() => onTabChange(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
    </div>
  );
}
