import { Header } from "../../../../src/pages/Layout/Header/Header";



export function Mypage() {

    

    return (
        <div>
            <Header />
            <main className="mypage_main">
                <section className="breadcrumb">
                    {/* 메인마이 */}
                    <div className="breadcrumb_inner">
                        <ul className="top_breadcrumb">
                            <li className="breadcrumb_item">
                                <Link to="https://www.kyobobook.co.kr" className="home_link">HOME</Link>
                            </li>
                            <li className="breadcrumb_item">
                                ::before
                                <Link to="/main" className="btn_sub_depth" style={{ pointerEvents: 'none' }}>마이</Link>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="contents_wrap">
                    <div className="contents_inner">
                        <aside className="aside_wrap">
                            <div className="aside_body">
                                <div className="my_profile_area">
                                    <div className="profile_thumb_box"></div>
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

    );
}