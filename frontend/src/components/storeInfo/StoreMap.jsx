export function StoreMap({ selectedStore }) {
  //selectedStore가 있을때만 렌더링
  if (!selectedStore || !selectedStore.storeMapInfo) {
    return null;
  }

  return (
    <div>
      <h1>매장안내도</h1>
      {selectedStore.storeMapInfo &&
        selectedStore?.storeMapInfo?.map((floor) => (
          <div>
            <nav>
              <ul>
                {floor.sections &&
                  floor?.sections?.map((section) => (
                    <div>
                      <li>
                        <strong>{section?.sectionName}</strong>
                        <span>
                          {Array.isArray(section.categories)
                            ? section.categories.join(", ")
                            : section.categories}
                        </span>
                      </li>
                    </div>
                  ))}
              </ul>
            </nav>
            {/** 매장 2층 이상일 경우 사진 위 버튼 만들어서 한층씩 보이도록 수정해야함 --> 방법 모색.. */}
            <img src={floor.map} alt="" />
          </div>
        ))}
    </div>
  );
}
