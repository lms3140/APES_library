export function TransportationInfo({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.transportation) {
    return null;
  }

  const subwayData =
    selectedStore.transportation[0]?.subway?.filter((s) => s.trim() !== "") ||
    [];
  const busData = selectedStore.transportation[1]?.bus || [];

  return (
    <div>
      {subwayData.length > 0 && (
        <div>
          <h4>*지하철로 오시려면</h4>
          <ul>
            {subwayData.map((sub, idx) => (
              <li key={idx}>{sub}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h4>*버스로 오시려면</h4>
        <ul>
          {busData.map((bus, idx) => (
            <li key={idx}>{bus}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
