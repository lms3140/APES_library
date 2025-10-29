import { Header } from "../../../../src/pages/Layout/Header/Header";
import { Footer } from "../Layout/Footer/Footer";



export function Mypage() {

    

    return (
        <div>
            <Header />
            <main className="mypageMain">
                <section className="breadCrumb">
                    {/* 메인마이 */}
                    <div className="breadCrumbInner">
                        <ul className="topBreadCrumb">
                            <li className="breadCrumbItem">
                                <Link to="https://www.kyobobook.co.kr" className="homeLink">HOME</Link>
                            </li>
                            <li className="breadCrumbItem">
                                ::before
                                <Link to="/main" className="btnSubDepth" style={{ pointerEvents: 'none' }}>마이</Link>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="contentsWrap">
                    <div className="contentsInner">
                        <aside className="asideWrap">
                            <div className="asideBody">
                                <div className="myProfileArea">
                                    <div className="profileThumbBoxNoImg">

                                    </div>
                                    <div className="profileNameBox">
                                        {/* 사용자 이름(닉네임) */}
                                        <span className="nameNowrap"><b data-role="nickname">닉네임</b>님</span>
                                        {/* 등급 배지 */}

                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                </section>
                    {/* 알림/추천 토글 */}
                    <div className="switch_toggle_wrap">
                        <div className="switch_toggle_header">
                        <button className="btn_switch active">
                            <span className="text">알림</span>
                        </button>
                        <button className="btn_switch">
                            <span className="text">추천</span>
                        </button>
                        </div>
                    </div>
                    {/* 혜택 정보 */}
                    <div className="benefit_info_wrap">
                        <div className="benefit_ico_group">
                        <div className="benefit_item benefit_ico_box point">
                            <a href="/benefit/point" className="benefit_link">
                            <span className="benefit_title">통합포인트</span>
                            <div className="benefit_val">
                                <span className="val">{benefits.point.toLocaleString()}</span>
                                <span className="unit">P</span>
                            </div>
                            </a>
                        </div>
                        
                        <div className="benefit_item benefit_ico_box e_voucher">
                            <a href="/benefit/ecoupon" className="benefit_link">
                            <span className="benefit_title">e교환권</span>
                            <div className="benefit_val">
                                <span className="val">{benefits.eVoucher}</span>
                                <span className="unit">원</span>
                            </div>
                            </a>
                    </div>
                
                    {/* 나머지 혜택 항목들 */}
                    </div>
                    </div>
                    
                    {/* 라이브러리 리스트 */}
                        <div className="title_wrap title_size_md">
                            <p className="title_heading">라이브러리 리스트</p>
                            <div className="right_area">
                            <a href="/library" className="btn_more_view">
                                <span className="text">더보기</span>
                            </a>
                            </div>
                        </div>
                        
                        <ul className="my_library_list">
                            <li className="my_library_item">
                            <div className="my_library_box empty">
                                <a className="my_library_link" href="/library/collection/1">
                                <div className="my_library_info">
                                    <span className="my_library_title">#나의 보관함</span>
                                    <span className="my_library_desc">담겨있는 상품/콘텐츠가 없습니다.</span>
                                </div>
                                </a>
                            </div>
                            </li>
                        </ul>
                


            </main>
        </div>
        <Footer />
    );
}