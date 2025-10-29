export function StoreList({ stores, onStoreClick, selectedStore }) {
  console.log(stores);

  return (
    <div>
      {stores &&
        stores.map((store) => {
          return (
            <div
              key={store.name}
              className={selectedStore?.name === store.name ? "active" : ""}
              onClick={() => onStoreClick(store)}
            >
              {store.name}
            </div>
          );
        })}
    </div>
  );
}
