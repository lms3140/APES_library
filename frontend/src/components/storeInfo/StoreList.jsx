export function StoreList({ stores, onStoreClick, selectedStore }) {
  console.log(stores);

  return (
    <div>
      {stores &&
        stores.map((store) => (
          <div
            key={store.id}
            className={selectedStore?.id === store.id ? "active" : ""}
            onClick={() => onStoreClick(store)}
          >
            {store.name}
          </div>
        ))}
    </div>
  );
}
