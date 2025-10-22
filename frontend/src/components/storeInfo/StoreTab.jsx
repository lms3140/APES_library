export function StoreTab({ activeTab, onTabChange }) {
  const tabs = ["서울", "경기/인천", "수도권 외"];

  return (
    <div>
      {tabs &&
        tabs.map((tab) => {
          return (
            <button
              className={activeTab === tab ? "active" : ""}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          );
        })}
    </div>
  );
}
