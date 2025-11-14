import { Link } from 'react-router-dom';
import style from "../Mypage/Mypage.module.css";
import { SnBMenu } from '../../components/Mypage/SnBMenu.jsx';
import { BookSwiper } from '../../components/Mypage/BookSwiper.jsx';
import { BenefitIcoGroup } from '../../components/Mypage/benefitIcoGroup.jsx';
import snbMenuData from '../../data/Mypage/snbMenuData.json'
import bookSwiperData from '../../data/Mypage/bookSwiperData.json'
import benefitData from '../../data/Mypage/benefitData.json';
import { BenefitSubGroup } from '../../components/Mypage/BenefitSubGroup.jsx';

export function Mypage() {
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
                                    <div className={style.switchToggleBox}>
                                        <button type="button" className={style.btnSwitch} data-active="recommend">
                                            <span className={style.text}>알림</span>
                                        </button>
                                        <button type="button" className={style.btnSwitchActive}>
                                            <span className={style.text}>추천</span>
                                        </button>
                                    </div>
                                    <ul className={`${style.categoryTagList}`} data-active="recommend">
                                        <li className={style.categoryItemActive}>
                                            <button className={style.btnCategory} type="button">
                                                <span className={style.text}>교보문고</span>
                                            </button>
                                        </li>
                                        <li className={style.categoryItem}>
                                            <button className={style.btnCategory} type="button">
                                                <span className={style.text}>핫트랙스</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                {/* 알림 */}
                                <div className={style.switchToggleContentAlarm}>
                                    <div className={`${style.noData} ${style.sizeSm}`}>
                                        <div className={style.noDataDesc}>지난 7일간 맞춤 소식이 없습니다.</div>
                                        <div className={style.btnWrap}>
                                            <button className={style.btnSm}>
                                                <span className={style.text}>맞춤 추천 보기</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* 추천 */}
                                <div data-active="recommend" className={`${style.switchToggleContent} ${style.active}`}>
                                    <div className={style.noData} style={{display: 'none'}}>
                                        <div className={style.noDataDesc}>추천 상품이 없습니다.</div>
                                    </div>
                                    <div className={style.customSwiperWrap}>
                                        <div className={`${style.swiperContainer} ${style.swiperContainerHorizontal}`}>
                                            <ul className={style.prodBlurList} style={{ transitionDuration: '0ms', transform: 'translate3d(0px, 0px, 0px)' }}>
                                                <BookSwiper items={bookSwiperData.books}/>

                                            </ul>
                                        </div>
                                        <div className={style.swiperControlBox}>
                                            <button className={style.swiperButtonPrev} type='button' tabIndex='0' role='button' aria-label='PreviousSlide' aria-disabled='false'>
                                                <span className={style.hidden}>이전</span>
                                            </button>
                                            <button className={style.swiperButtonNext} type='button' tabIndex='0' role='button' aria-label='NextsSlide' aria-disabled='false'>
                                                <span className={style.hidden}>다음</span>
                                            </button>
                                        </div>
                                    </div>
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