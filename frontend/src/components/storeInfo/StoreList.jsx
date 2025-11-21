import styles from "./StoreList.module.css";

export function StoreList({ stores, onStoreClick, selectedStore }) {
  return (
    <div className={styles.listOuter}>
      <div className={styles.listInner}>
        {stores &&
          stores.map((store) => (
            <div
              key={store.id}
              className={`${styles.storeItem} ${
                selectedStore?.id === store.id ? styles.active : ""
              }`}
              onClick={() => onStoreClick(store)}
            >
              {store.name}
            </div>
          ))}
      </div>
    </div>
  );
}
