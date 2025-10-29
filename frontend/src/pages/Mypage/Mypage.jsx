import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import style from "./Mypage/Mypage.module.css";

export function Mypage() {
    return (
        <div>
            <Header />
            <main className={style.mypageMain}>
                <section className={style.breadCrumb}>
                    {/* 메인마이 */}
                    <div className={style.breadCrumbInner}>
                        <ul className={style.topBreadCrumb}>
                            <li className={style.breadCrumbItem}>
                                <Link to="/main" className={style.homeLink}>HOME</Link>
                            </li>
                            <li className={style.breadCrumbItem}>
                                <Link to="/main" className={style.btnSubDepth} style={{ pointerEvents: 'none' }}>마이</Link>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className={`${style.contentsWrap} ${style.aside}`}>
                    <div className={style.contentsInner}>
                        <aside className={style.asideWrap}>
                            <div className={style.asideBody}>
                                <div className={style.myProfileArea}>
                                    <div className={style.profileThumbBoxNoImg}>
                                        <div className={style.thumbBox}></div>
                                    </div>
                                    <div className={style.profileNameBox}>
                                        {/* 사용자 이름(닉네임) */}
                                        <span className={style.nameNowrap}>
                                            <b data-role="nickname">닉네임</b>님
                                        </span>
                                        {/* 등급 배지 */}
                                        <span className={style.badge}>
                                            <span className={style.text}>프렌즈</span>
                                        </span>
                                    </div>
                                    <ul className={style.profileInfoList}>
                                        {/* 찜 정보 */}
                                        <li className={style.infoItem}>
                                            <Link to="/wish">
                                                <span className={style.title}>찜</span>
                                                <span className={style.val}>0</span>
                                            </Link>
                                        </li>
                                        {/* 리스트 정보 */}
                                        <li className={style.infoItem}>
                                            <Link to="#">
                                                <span className={style.title}>리스트</span>
                                                <span className={style.val}>0</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={style.snbWrap}>
                                    {/* 컴포넌트 화 */}
                                    <ul className={style.snbListCategory}>
                                        <li className={style.snbItem}>
                                            <Link to="#" className={style.snbLinkDepthTitle}>쇼핑내역</Link>
                                            <ul className={style.snbSubList}>
                                                <li className={style.subItem}><Link to="#">주문/배송목록</Link></li>
                                                <li className={style.subItem}><Link to="#">선물함</Link></li>
                                                <li className={style.subItem}><Link to="#">매장 구매 내역</Link></li>
                                                <li className={style.subItem}><Link to="#">영수증 조회 / 후 적립</Link></li>
                                            </ul>
                                        </li>
                                        <li className={style.snbItem}>
                                            <Link to="#" className={style.snbLinkDepthTitle}>라이브러리</Link>
                                            <ul className={style.snbSubList}>
                                                <li className={style.subItem}><Link to="#">메인</Link></li>
                                                <li className={style.subItem}><Link to="#">찜</Link></li>
                                                <li className={style.subItem}><Link to="#">리스트</Link></li>
                                                <li className={style.subItem}><Link to="#">Klover 리뷰</Link></li>
                                                <li className={style.subItem}><Link to="#">문장수집</Link></li>
                                                <li className={style.subItem}><Link to="#">코멘트</Link></li>
                                                <li className={style.subItem}><Link to="#">구독</Link></li>
                                                <li className={style.subItem}><Link to="#">e-라이브러리</Link></li>
                                            </ul>
                                        </li>
                                        <li className={style.snbItem}>
                                            <Link to="#" className={style.snbLinkDepthTitle}>활동내역</Link>
                                            <ul className={style.snbSubList}>
                                                <li className={style.subItem}><Link to="#">커뮤니티 활동 내역</Link></li>
                                                <li className={style.subItem}><Link to="#">이벤트 참여 내역</Link></li>
                                                <li className={style.subItem}><Link to="#">문화공간 이용 내역</Link></li>
                                            </ul>
                                        </li>
                                        <li className={style.snbItem}>
                                            <Link to="#" className={style.snbLinkDepthTitle}>나의 통장</Link>
                                            <ul className={style.snbSubList}>
                                                <li className={style.subItem}><Link to="#">통합포인트</Link></li>
                                                <li className={style.subItem}><Link to="#">e교환권</Link></li>
                                                <li className={style.subItem}><Link to="#">기프트카드</Link></li>
                                                <li className={style.subItem}><Link to="#">교보캐시</Link></li>
                                                <li className={style.subItem}><Link to="#">쿠폰</Link></li>
                                                <li className={style.subItem}><Link to="#">교보e캐시</Link></li>
                                                <li className={style.subItem}><Link to="#">예치금</Link></li>
                                                <li className={style.subItem}><Link to="#">교환번호 등록</Link></li>
                                            </ul>
                                        </li>
                                        <li className={style.snbItem}>
                                            <Link to="#" className={style.snbLinkDepthTitle}>문의내역</Link>
                                            <ul className={style.snbSubList}>
                                                {/* QnA 링크 필요 */}
                                                <li className={style.subItem}><Link to="/qna">1:1문의</Link></li>
                                                <li className={style.subItem}><Link to="#">핫트랙스 상품 문의내역</Link></li>
                                                <li className={style.subItem}><Link to="#">업체배송 문의내역</Link></li>
                                            </ul>
                                        </li>
                                        <li className={style.snbItem}>
                                            <Link to="#" className={style.snbLinkDepthTitle}>회원정보</Link>
                                            <ul className={style.snbSubList}>
                                                <li className={style.subItem}><Link to="#">회원정보 수정</Link></li>
                                                <li className={style.subItem}><Link to="#">로그인 설정</Link></li>
                                                <li className={style.subItem}><Link to="#">마케팅 수신 설정</Link></li>
                                                <li className={style.subItem}><Link to="#">교보북클럽 카드</Link></li>
                                                <li className={style.subItem}><Link to="#">MY매장</Link></li>
                                                <li className={style.subItem}><Link to="#">배송 주소록</Link></li>
                                            </ul>
                                        </li>
                                        <li className={style.snbItem}>
                                            <Link to="#" className={style.snbLinkDepthTitle}>알림센터</Link>
                                            <ul className={style.snbSubList}>
                                                <li className={style.subItem}><Link to="#">알림함</Link></li>
                                                <li className={style.subItem}><Link to="#">알림신청내역</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    {/* 컴포넌트 화 */}
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
                                    <div className={style.noData} style={{display: none}}>
                                        <div className={style.noDataDesc}>추천 상품이 없습니다.</div>
                                    </div>
                                    <div className={customSwiperWrap}>

                                        <div className={`${style.swiperContainer} ${swiperContainerHorizontal}`}>
                                            {/* 컴포넌트 화 */}
                                            <ul className={style.prodBlurList} style={{ transitionDuration: '0ms', transform: 'translate3d(0px, 0px, 0px)' }}>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b1.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b1.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b2.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b2.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b3.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b3.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b4.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b4.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b5.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b5.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b6.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b6.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b7.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b7.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${swiperSlideActive}`}>
                                                    <div className={style.prodBlurWrap}>
                                                        <div className={style.blurImgBox}><img src="../../../images/bookImg/b8.webp" className={style.blurImg}/></div>
                                                        <Link to="#">
                                                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                                                    <span className={style.imgBox}><img src="../../../images/bookImg/b8.webp"/></span>
                                                                    <span className={style.prodName}>책 이름</span>
                                                                    <div className={style.prodPrice}>
                                                                        <span className={style.percent}>할인율</span>
                                                                        <span className={style.price}>
                                                                            <span className={style.val}>가격</span>
                                                                            <span className={style.unit}>원</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                            {/* 컴포넌트 화 */}
                                        </div>
                                        <div className={style.swiperControlBox}>
                                            <button className={swiperButtonPrev} type='button' tabIndex='0' role='button' aria-label='PreviousSlide' aria-disabled='false'>
                                                <span className={hidden}>이전</span>
                                            </button>
                                            <button className={swiperButtonNext} type='button' tabIndex='0' role='button' aria-label='NextsSlide' aria-disabled='false'>
                                                <span className={hidden}>다음</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.benefitInfoWrap}>
                                <div className={style.benefitIcoGroup}>
                                    <div className={`${style.benefitItem} ${benefitIconboxPoint}`}>
                                        <Link to='#' className={style.benefitLink}>
                                            <span className={style.benefitTitle}>통합포인트</span>
                                            <div className={benefitVal}>
                                                <span className={style.val}>포인트</span>
                                                <span className={style.unit}>P</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={`${style.benefitItem} ${benefitIconboxEVoucher}`}>
                                        <Link to='#' className={style.benefitLink}>
                                            <span className={style.benefitTitle}>e교환권</span>
                                            <div className={style.benefitVal}>
                                                <span className={style.val}>0</span>
                                                <span className={style.unit}>원</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={`${style.benefitItem} ${benefitIconboxGIftcard}`}>
                                        <Link to='#' className={style.benefitLink}>
                                            <span className={style.benefitTitle}>기프트카드</span>
                                            <div className={style.benefitVal}>
                                                <span className={style.val}>0</span>
                                                <span className={style.unit}>장</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={`${style.benefitItem} ${benefitIconboxCash}`}>
                                        <Link to='#' className={style.benefitLink}>
                                            <span className={style.benefitTitle}>교보캐시</span>
                                            <div className={style.benefitVal}>
                                                <span className={style.val}>0</span>
                                                <span className={style.unit}>원</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className={style.benefitSubGroup}>
                                    <div className={`${style.benefitItem} ${benefitSubBox}`}>
                                        <Link to='#' className={style.benefitLink}>
                                            <span className={style.benefitTitle}>쿠폰</span>
                                            <div className={style.benefitVal}>
                                                <span className={style.val}>0</span>
                                                <span className={style.unit}>장</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={`${style.benefitItem} ${benefitSubBox}`}>
                                        <Link to='#' className={style.benefitLink}>
                                            <span className={style.benefitTitle}>교보e캐시</span>
                                            <div className={style.benefitVal}>
                                                <span className={style.val}>0</span>
                                                <span className={style.unit}>원</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={`${style.benefitItem} ${benefitSubBox}`}>
                                        <Link to='#' className={style.benefitLink}>
                                            <span className={style.benefitTitle}>예치금</span>
                                            <div className={style.benefitVal}>
                                                <span className={style.val}>0</span>
                                                <span className={style.unit}>원</span>
                                            </div>
                                        </Link>
                                    </div>
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
                                            <div className={`${style.continueProdWrap} ${noData}`}>
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
            </main>
            <Footer />
        </div>
    );
}