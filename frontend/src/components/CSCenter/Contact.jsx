// // import styles from "./Contact.module.css";
import { Link } from "react-router-dom";

export function Contact() {
  return (
    <div>
      <div>
        <h1>전화상담서비스 안내도</h1>
        <p>1. 로그인 하시면 배송조회/반품조회는 확인 가능합니다.</p>
        <p>
          2. 밑줄 친 내용의 경우 사이트 내에서 확인 가능한 메뉴이며, 선택 시
          해당 페이지로 이동됩니다.
        </p>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>1. 주문배송 및 이용안내</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>1. </span>
                        <Link to="#">주문/배송 조회</Link>
                        {/* 마이페이지로 연결 */}
                      </td>
                    </tr>
                    <tr>
                      <td>2. 반품조회</td>
                    </tr>
                    <tr>
                      <td>3. 환불 조회</td>
                    </tr>
                    <tr>
                      <td>0. 기타문의 및 상담원 연결</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <th>2. 도서문의</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>1. 도서재고</td>
                    </tr>
                    <tr>
                      <td>2. 도서상담</td>
                    </tr>
                    <tr>
                      <td>3. 교과서 안내</td>
                      <td>
                        <p>1. 초,중, 고 교과서</p>
                        <p>2. 방송대 교과서</p>
                        <p>0. 기타문의 및 상담원 연결</p>
                      </td>
                    </tr>
                    <tr>
                      <td>4. 교환/반품 안내</td>
                    </tr>
                    <tr>
                      <td>5. 출판사 전화번호</td>
                    </tr>
                    <tr>
                      <td>0. 기타문의 및 상담원 연결</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th>3. 매장 이용안내</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>1. </span>
                        <Link to="/store-info/001">매장 영업시간 안내</Link>
                      </td>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>1. 서울</td>
                              <td>
                                <p>01.광화문점</p>
                                <p>02.강남점</p>
                                <p>03.잠실점</p>
                                <p>04.목동점</p>
                                <p>05.영등포점</p>
                                <p>06.디큐브시티 바로드림 센터</p>
                                <p>07.수유 바로드림 센터</p>
                                <p>08.동대문 바로드림 센터</p>
                                <p>09.은평 바로드림 센터</p>
                                <p>10.청량리 바로드림 센터</p>
                                <p>11.합정점</p>
                                <p>12.가든파이브 바로드림 센터</p>
                                <p>13.천호점</p>
                                <p>00.기타문의 및 상담원 연결</p>
                              </td>
                            </tr>
                            <tr>
                              <td>2. 수도권</td>
                              <td>
                                <p>01.분당점</p>
                                <p>02.평촌점</p>
                                <p>03.부천점</p>
                                <p>04.인천점</p>
                                <p>05.일산점</p>
                                <p>06.송도 바로드림 센터</p>
                                <p>07.판교 바로드림 센터</p>
                                <p>08.광교 월드스퀘어 센터</p>
                                <p>09.광교점</p>
                                <p>00.기타문의 및 상담원 연결</p>
                              </td>
                            </tr>
                            <tr>
                              <td>3. 지방</td>
                              <td>
                                <p>01.대구점</p>
                                <p>02.해운대점</p>
                                <p>03.부산점</p>
                                <p>04.창원점</p>
                                <p>05.천안점</p>
                                <p>06.울산점</p>
                                <p>07.대전점</p>
                                <p>08.전주 바로드림 센터</p>
                                <p>09.센텀시티점</p>
                                <p>10.칠곡 센터</p>
                                <p>11.세종 바로드림 센터</p>
                                <p>12.광주상무 센터</p>
                                <p>13.경성대부경대 센터</p>
                                <p>00.기타문의 및 상담원 연결</p>
                              </td>
                            </tr>
                            <tr>
                              <td>4. 대학 구내서점</td>
                              <td>
                                <p>01.이화여대점</p>
                                <p>02.서울대점</p>
                                <p>03.카톨릭대점</p>
                                <p>04.포항공대점</p>
                                <p>05.전북대점</p>
                                <p>00.기타문의 및 상담원 연결</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
