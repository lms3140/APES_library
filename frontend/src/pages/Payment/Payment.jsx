import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../Payment/Payment.module.css'
import { OrderProduct } from '../../components/Payment/OrderProduct.jsx'
import { StepItemNum } from '../../components/Payment/stepItemNum.jsx'
import { Point } from '../../components/Payment/Point.jsx'
import { UsePoint } from '../../components/Payment/UsePoint.jsx'

export default function Payment() {
  const cartRecommend = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const scrollToTab = () => {
    cartRecommend.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  

  return (
    <section className={style.contents}>
      <div className={style.contentsInner}>
        <div className={style.cartTopWrap}>
          <p className={style.titleWrap}>주문/결제</p>
          <div className={style.rightAreaWrap}>
            <ol className={style.stepRoundTextList}>
              <StepItemNum />
            </ol>
          </div>
        </div>
        {/* 배송지 정보 */}
        <div className={style.cartBody}>
          <div className={style.cartBodyInner}>
            <div className={style.paymentBoxWrap}>
              <div className={style.tblRowWrap}>
                <table className={style.tblRow}>
                  <colgroup>
                    <col style={{width: '210px'}}/>
                    <col style={{width: 'auto'}}/>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope='row'>배송지 정보</th>
                      <td>
                        <div className={style.addressInfoBox}>
                          <div className={style.addressName}>
                            <span className={style.name}>
                              <i className={style.icoLocationPrimary}>ㅇ</i>
                              <span className={style.text}>주소지 이름</span>
                            </span>
                            <span className={style.badgeSM}>
                              <span className={style.text}>기본배송지</span>
                            </span>
                            <button type="button" className={style.btnXs}>
                              <span className={style.text}>변경(버튼)</span>
                            </button>
                          </div>
                          <div className={style.addressPerson}>
                            <span className={style.name}>수령자 이름</span>
                            <span className={style.gap}>/</span>
                            <span className={style.phoneNumber}>010-1234-5678 수령자번호</span>
                            <button type='button' className={style.btnInfoPopup}>
                              <span className={style.icoQuestion}>팝업</span>
                              <span></span>
                            </button>
                          </div>
                          <div className={style.address}>주소</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={style.hasIp}>배송요청사항</th>
                      <td>
                        <div className={style.btnWrap}>
                          <button type='button' className={style.btnUpBtnLineGray}>
                            <span className={style.icoMsgBlack}></span>
                            <span className={style.textFwMedium}>배송 시 요청사항 / 메모를 선택해 주세요.</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className='' data-form-gatemessage='box'>
                      <th scope='row' className={style.hasIp}>공동현관 출입방법</th>
                      <div className={style.formWrap}>
                        <div className={style.formBox}>
                          <div className={style.formCont}>
                            <ul className={style.chkRowList}>
                              <li className={style.chkRowItem}>
                                <span className={style.formRdo}>
                                  <input type="radio" className={style.doorPassword01} />
                                  <label for="doorPassword01">공동현관 비밀번호</label>
                                </span>
                              </li>
                              <li className={style.chkRowItem}>
                                <span className={style.formRdo}>
                                  <input type="radio" className={style.doorPassword02} />
                                  <label for="doorPassword02">자유출입 가능</label>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className={style.formCont}>
                            <input type="text" className={style.formIp} title='공동현관 출입번호' placeholder='예시) 0000#' data-form-gatemessage="gateMessage"/>
                            <p className={style.infoText} data-form-gatemessage="">※ 공동현관 출입방법이 부정확한 경우, 새벽배송이 공동현관 앞에 배송되거나 반송될 수 있습니다.</p>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* 주문 상품 정보 */}
            <div className={style.foldBoxWrap}>
              <div className={style.foldBoxList}>
                <div className={style.foldBox}>
                  <div className={style.foldBoxHeader}>
                    <button type='button' className={style.btnFold}>컨텐츠 닫기</button>
                  </div>
                  <div className={style.foldBoxContents}> 
                    {/* 원본 교보문고 페이지 중 fold_box list부터 삭제 */}
                    <div className={style.tblProdWrap}>
                      <table className={style.tblProd}>
                        <colgroup>
                          <col style={{width: '210px'}}/>
                          <col style={{width: 'auto'}}/>
                        </colgroup>
                        <tbody>
                          <tr>
                            <th scope='row'>주문상품</th>
                            <td>
                              <div className={style.numberValueBox}>
                                <span className={style.label}>총</span>
                                <span className={style.point}>
                                  <span className={style.val}>999</span>
                                  <span className={style.unit}>개</span>
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button type='button' className={style.btnFold}>컨텐츠 닫기</button>
                    <div className={style.foldBoxContents}>
                      {/* 장바구니 상품들 컴포넌트 화 필요 */}
                      <OrderProduct />
                    </div>
                    <div className={style.foldBox}>
                      <ul className={style.deliveryInfoList}>
                        <li className={style.deliveryInfoItem}>
                          <span className={style.label}>
                            <span className={style.text}>교보문고 배송</span>
                            <button type='button' className={style.btnInfoPopup}>
                              <span className={style.icoQuestion}></span>
                            </button>
                          </span>
                          <span className={style.textBody}>
                            <div className={style.deliveryDaysWrap}>
                              <ul className={style.chkRowList}>
                                <li className={style.chkRowItem}>
                                  <span className={style.formRdo}>
                                    <input type="radio" className={style.orderDeliveryRdo02_1}/>
                                    {/* 날짜 수정 필요 */}
                                    <label for="orderDeliveryRdo02_1">내일 (01/01, 금 오전 7시 전) 도착</label>
                                  </span>
                                </li>
                                <li className={style.chkRowItem}>
                                  <span className={style.formRdo}>
                                    <input type="radio" className={style.orderDeliveryRdo02_2}/>
                                    {/* 날짜 수정 필요 */}
                                    <label for="orderDeliveryRdo02_2">내일 (01/01, 금) 도착</label>
                                  </span>
                                  <div className={style.bubbleSpeechDesc}>e교환권 500원을 드려요!</div>
                                </li>
                              </ul>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 */}
            <div className={style.foldBoxList}>
              <div className={style.foldBox}>
                <div className={style.foldBoxHeader}>
                  <div className={style.pointHeaderBox}>
                    <div className={style.headerText}>나의 통장</div>
                    <div className={style.numberValueBox}>
                      
                      <span className={style.lable}>보유</span>
                      <Point />
                    </div>
                    <button type='button' className={style.btnFold}>컨텐츠 닫기</button>
                  </div>
                </div>
                <div className={style.foldBoxContents}>
                  <div className={style.pointUsedBox}>
                    <table className={style.tblRow}>
                      <colgroup>
                          <col style={{width: '210px'}}/>
                          <col style={{width: 'auto'}}/>
                        </colgroup>
                        <tbody>
                          <tr>
                            <th className={style.hasIp}>통합 포인트</th>
                            <td>
                              <div className={style.numberValueBox}>
                                <Point />
                              </div>
                            </td>
                            <td>
                              <div className={style.inputBtnPriceBox}>
                                <UsePoint />
                              </div>
                            </td>
                          </tr>


                          <tr>
                            <th className={style.hasIp}>예치금</th>
                            <td>
                              <div className={style.numberValueBox}>
                                <Point />
                              </div>
                            </td>
                            <td>
                              <div className={style.inputBtnPriceBox}>
                                <UsePoint />
                              </div>
                            </td>
                          </tr>

                          {/* 반복컴포넌트 필요 */}



                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className={style.noFoldBox}></div>
              <div className={style.noFoldBox}></div>
            </div>






          </div>


        </div>
      </div>
    </section>
  )
}
