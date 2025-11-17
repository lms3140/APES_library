import { Link } from 'react-router-dom';
import style from "../Mypage/Mypage.module.css";
import { SnBMenu } from '../../components/Mypage/SnBMenu.jsx';
import { BenefitIcoGroup } from '../../components/Mypage/benefitIcoGroup.jsx';
import snbMenuData from '../../data/Mypage/snbMenuData.json'
import benefitData from '../../data/Mypage/benefitData.json';
import { BenefitSubGroup } from '../../components/Mypage/BenefitSubGroup.jsx';
import { useState } from 'react';
import { AlarmContent } from '../../components/Mypage/AlarmContent.jsx';
import { RecommendContent } from '../../components/Mypage/RecommendContent.jsx';

export function Mypage() {
    const [activeTab, setActiveTab] = useState("recommend");
    const [activeMenu, setActiveMent] = useState("kyobo");

    return (
        <main className={style.mypageMain}>
            <div className={style.containerWrapper}>
                {/* 이미지 */}
                <section className={style.breadCrumbBackImage}> 
                
                    {/* 메인마이 */}
                    <section className={style.breadCrumbWrap}>
                        <div className={style.breadCrumbInner}>
                            <ul className={style.breadCrumbList}>
                                <li className={style.breadCrumbItem}>
                                    <Link to="/" className={style.homeLink}></Link>
                                </li>
                                <li className={style.breadCrumbItem}>
                                    <div className={style.noSub}></div>
                                    <Link to="#" className={style.btnSubDepth} style={{ pointerEvents: 'none' }}>마이</Link>
                                </li>
                            </ul>
                        </div>
                    </section>

                </section>
                <section className={`${style.contentsWrap}`}>
                    <div className={style.contentsInner}>
                        <aside className={style.asideWrap}>
                            <div className={style.asideBody}>
                                <div className={style.myProfileArea}>
                                    <div className={style.profileThumbBoxNoImg}>
                                        <Link to="#" className={style.btnSetting}>
                                            <div className={style.thumbBox}>
                                                <Link to="#"><div className={style.thumbBoxSetting}></div></Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.profileNameBox}>
                                        {/* 사용자 이름(닉네임) */}
                                        <span className={style.nameNowrap}>
                                            <b data-role="nickname">닉네임</b>님
                                        </span>
                                        {/* 등급 배지 */}
                                        <span className={style.badge}>
                                            <Link to="#" className={style.badgeIg}>
                                                <div className={style.badgeImage}></div>
                                                <span className={style.text}>프렌즈</span>
                                                <div className={style.badgeArrow}></div>
                                            </Link>
                                        </span>
                                    </div>
                                    <ul className={style.profileInfoList}>
                                        {/* 찜 정보 */}
                                        <li className={style.infoItemWish}>
                                            <Link to="/wish" className={style.infoLink}>
                                                <span className={style.title}>찜</span>
                                                <span className={style.val}>0</span>
                                            </Link>
                                        </li>
                                        {/* 리스트 정보 */}
                                        <li className={style.infoItemList}>
                                            <div className={style.infoItemListLine}></div>
                                            <Link to="#" className={style.infoLink}>
                                                <span className={style.title}>리스트</span>
                                                <span className={style.val}>0</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={style.snbWrap}>
                                    <ul className={style.snbListCategory}>
                                        <div className={style.snbWrap}>
                                            <ul className={style.snbListCategory}>
                                                {snbMenuData.menus.map((menu, index) => (
                                                    <SnBMenu 
                                                        key={index} 
                                                        title={menu.title} 
                                                        items={menu.items} 
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    </ul>
                                </div>
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
                            <div className={`${style.titleWrap} ${style.titleSizeMd}`}>
                                <p className={style.titleHeading}>라이브러리 리스트</p>
                                <div className={style.rightArea}>
                                    <Link to='#' className='btnMoreView'>
                                        <span className={style.text}>더보기</span>
                                        <span className={style.icoArw}></span>
                                    </Link>
                                </div>
                            </div>
                            <ul>
                                <li className={style.myLibraryItem}>
                                    <div className={`${style.myLibraryBox} ${style.empty}`}>
                                        <div className={style.myLibraryBoxInner}>
                                            <Link to="#" className={style.myLibraryLink}>
                                                <div className={style.myLibraryInfo}>
                                                    <span className={style.myLibraryTitle}>#나의 보관함</span>
                                                    <span className={style.myLibraryDesc}>담겨있는 상품/콘텐츠가 없습니다.</span>
                                                    <div className={style.myLibraryThumbList}>
                                                        <span className={style.thumbAdd}>
                                                            <span className={style.text}>+0</span>    
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                <li className={style.myLibraryItem}>
                                    <div className={`${style.myLibraryBox} ${style.empty}`}>
                                        <div className={style.myLibraryBoxInner}>
                                            <Link to="#" className={style.myLibraryLink}>
                                                <div className={style.myLibraryInfo}>
                                                    <span className={style.myLibraryTitle}>#마이리스트</span>
                                                    <span className={style.myLibraryDesc}>담겨있는 상품/콘텐츠가 없습니다.</span>
                                                    <div className={style.myLibraryThumbList}>
                                                        <span className={style.thumbAdd}>
                                                            <span className={style.text}>+0</span>    
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                <li className={style.myLibraryItem}>
                                    <div className={style.myLibraryBox}>
                                        <div className={style.myLibraryBg}>
                                            <img src="../../../images/bookImg/b1.webp" className={style.blurImg} />
                                        </div>
                                        <div className={style.myLibraryBoxInner}>
                                            <Link to="#">
                                                <div className={`${style.myLibraryImgBox} ${style.typeSquareRound}`}>
                                                    <div className={style.imgBox}>
                                                        <img src="../../../images/bookImg/b1.webp" />
                                                    </div>
                                                </div>
                                                <div className={style.myLibraryInfo}>
                                                    <span className={style.myLibraryTitle}>#구매</span>
                                                    <div className={style.myLibraryThumbList}>
                                                        <span className={style.thumbAdd}>
                                                            <span className={style.text}>0</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
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