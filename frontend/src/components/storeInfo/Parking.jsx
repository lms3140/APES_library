export function Parking({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.parkingInfo) {
    return null;
  }

  const parking = selectedStore.parkingInfo;

  return (
    <div>
      {parking}
      {parking}
    </div>
  );
}
