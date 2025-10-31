import styles from "./Service.module.css";

export function Service({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.storeService) {
    return null;
  }

  return (
    <div id="service" className={styles.serviceContainer}>
      <h1 className={styles.title}>매장 서비스</h1>
      <div className={styles.serviceGrid}>
        {selectedStore.storeService &&
          selectedStore.storeService.map((service, idx) => (
            <nav key={idx} className={styles.serviceBox}>
              <ul className={styles.serviceList}>
                <li className={styles.serviceName}>
                  {service.strSrvcName} <span className={styles.tag}>제공</span>
                </li>
                <li className={styles.serviceDesc}>{service.strSrvcDscr}</li>
              </ul>
            </nav>
          ))}
      </div>
    </div>
  );
}
