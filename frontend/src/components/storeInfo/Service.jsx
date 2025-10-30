export function Service({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.storeService) {
    return null;
  }

  return (
    <div>
      <h1 id="service">매장 서비스</h1>
      {selectedStore.storeService &&
        selectedStore.storeService.map((service) => (
          <nav>
            <ul>
              <li>
                {service.strSrvcName} <span>제공</span>
              </li>
              <li>{service.strSrvcDscr}</li>
            </ul>
          </nav>
        ))}
    </div>
  );
}
