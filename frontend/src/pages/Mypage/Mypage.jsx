import { Link } from 'react-router-dom';
import style from "../Mypage/Mypage.module.css";
import { BenefitIcoGroup } from '../../components/Mypage/benefitIcoGroup.jsx';
import benefitData from '../../data/Mypage/benefitData.json';
import { BenefitSubGroup } from '../../components/Mypage/BenefitSubGroup.jsx';
import { useState } from 'react';
import { AlarmContent } from '../../components/Mypage/AlarmContent.jsx';
import { RecommendContent } from '../../components/Mypage/RecommendContent.jsx';
import { BreadCrumb } from '../../components/Mypage/BreadCrumb.jsx';
import { SideBarMenu } from '../../components/Mypage/SideBarMenu.jsx';
import { LibraryList } from '../../components/Mypage/LibraryList.jsx';
import { MyProfile } from '../../components/Mypage/MyProfile.jsx';

export function Mypage() {
    const [activeTab, setActiveTab] = useState("recommend");
    const [activeMenu, setActiveMent] = useState("kyobo");

    return (
        <main className={style.mypageMain}>
            <div className={style.containerWrapper}>
                {/* 이미지 */}
                <section className={style.breadCrumbBackImage}> 
                    {/* 메인마이 */}
                    <BreadCrumb />
                </section>
                
                <section className={`${style.contentsWrap}`}>
                    <div className={style.contentsInner}>
                        <aside className={style.asideWrap}>
                            <div className={style.asideBody}>

                                <MyProfile />

                                <SideBarMenu />

                            </div>
                        </aside>
                        <section className={style.sectionWrap}>
                            <div className={style.switchToggleWrapMy}>
                                <div className={style.switchToggleHeader}>
                                    <div className={style.toggleHeaderContainer}>
                                        <div className={style.switchToggleBox}>
                                            <button 
                                                type="button" 
                                                className={activeTab === "alarm" ? style.btnSwitchActive : style.btnSwitch}
                                                onClick={() => setActiveTab("alarm")}
                                            >
                                                <span className={style.text}>알림</span>
                                            </button>
                                            <button 
                                                type="button" 
                                                className={`${activeTab === "recommend" ? style.btnSwitchActive : style.btnSwitch} ${style.recom}`}
                                                onClick={() => setActiveTab("recommend")}
                                            >
                                                <span className={style.text}>추천</span>
                                            </button>
                                        </div>
                                        {activeTab === "recommend" && (
                                        <ul className={style.categoryTagList}>
                                            <li className={style.categoryItem}>
                                            <button 
                                                className={activeMenu === "kyobo" ? style.btnCategory : style.btnCategoryNone}
                                                type='button'
                                                onClick={() => setActiveMent("kyobo")}
                                            >
                                                <span className={style.text}>교보문고</span>
                                            </button>
                                            </li>
                                            <li className={style.categoryItem}>
                                            <button 
                                                className={activeMenu === "hottracks" ? style.btnCategory : style.btnCategoryNone}
                                                type='button'
                                                onClick={() => setActiveMent("hottracks")}
                                            >
                                                <span className={style.text}>핫트랙스</span>
                                            </button>
                                            </li>
                                        </ul>
                                        )}
                                    </div>
                                
                                    {activeTab === "alarm" && <AlarmContent setActiveTab={setActiveTab}/>}
                                    {activeTab === "recommend" && <RecommendContent />}
                                </div>
                            </div>
                            
                            <div className={style.benefitInfoWrap}>
                                <div className={style.benefitIcoGroup}>
                                    
                                    {benefitData.benefitIcoGroup.map((item, index) => (
                                        <BenefitIcoGroup key={index} item={item}/>
                                    ))}
                                    
                                </div>
                                <div className={style.benefitSubGroup}>
                                    
                                    {benefitData.benefitSubBox.map((items, index) => (
                                        <BenefitSubGroup key={index} items={items} />
                                    ))}
                                    
                                </div>
                            </div>

                            <LibraryList />

                            <div className={style.myActivityWrap}>
                                <div className={style.continueViewBox}>
                                    <div className={`${style.titleWrap} ${style.titleSizeMd}`}>
                                        <h2 className={style.titleHeading}>이어보기</h2>
                                    </div>
                                    <div className={style.continueViewList}>
                                        <div className={style.continueViewItem}>
                                            <div className={`${style.continueProdWrap} ${style.noData}`}>
                                                <p className={style.noDataDesc}>독서/시청 중인 상품/콘텐츠가 없습니다.</p>
                                                <p className={style.noDataSdesc}>"Picks추천과 함께 "<br></br>"책 읽는 습관을 길러 보세요."</p>
                                            <div>
                                                
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
}