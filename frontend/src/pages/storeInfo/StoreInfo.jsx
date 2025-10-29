import { useEffect, useState } from "react";

import { StoreDetail } from "../../components/storeInfo/StoreDetail.jsx";
import { StoreList } from "../../components/storeInfo/StoreList.jsx";
import { StoreTab } from "../../components/storeInfo/StoreTab.jsx";
import { MenuList } from "../../components/storeInfo/MenuList.jsx";
import { axiosData } from "../../utils/dataFetch.js";

export function StoreInfo() {
  const [activeTab, setActiveTab] = useState("seoul");
  const [selectedStore, setSelectedStore] = useState(null);
  const [info, setInfo] = useState();

  //json데이터 불러오기
  useEffect(() => {
    const fetch = async () => {
      const jsonData = await axiosData("/data/storeInfo.json");
      setInfo(jsonData);

      const defaultStore = jsonData["seoul"]?.find(
        (store) => store.name === "광화문점"
      );
      if (defaultStore) setSelectedStore(defaultStore);
    };

    fetch();
  }, []);

  //탭 클릭시 이벤트
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  //
  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  return (
    <div>
      <div>
        <StoreTab activeTab={activeTab} onTabChange={handleTabChange} />
        {info && (
          <div>
            <StoreList
              stores={info[activeTab]}
              onStoreClick={handleStoreClick}
              selectedStore={selectedStore}
            />
            <StoreDetail store={selectedStore} />
          </div>
        )}
      </div>
      <div>
        <MenuList stores={selectedStore} />
      </div>
    </div>
  );
}
