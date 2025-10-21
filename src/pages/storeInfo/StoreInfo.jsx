import { useEffect, useState } from "react";

import { StoreDetail } from "../../components/storeInfo/StoreDetail.jsx";
import { StoreList } from "../../components/storeInfo/StoreList.jsx";
import { StoreTab } from "../../components/storeInfo/StoreTab.jsx";
import { axiosData } from "../../utils/dataFetch.js";

export function StoreInfo() {
  const [activeTab, setActiveTab] = useState("서울");
  const [selectedStore, setSelectedStore] = useState(null);
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetch = async () => {
      const jsonData = await axiosData("/data/storeInfo.json");
      setInfo(jsonData);
    };
    fetch();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  return (
    <div>
      sas
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
  );
}
