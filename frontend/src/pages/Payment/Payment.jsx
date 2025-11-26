import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../Payment/Payment.module.css'
import { OrderProduct } from '../../components/Payment/OrderProduct.jsx'
import { StepItemNum } from '../../components/Payment/stepItemNum.jsx'
import { Point } from '../../components/Payment/Point.jsx'
import { UsePoint } from '../../components/Payment/UsePoint.jsx'
import { PaymentButton } from '../../components/Payment/PaymentButton.jsx'

export function Payment() {
  const pointData = [
    {index: 1, label: '통합포인트', amount: 100},
    {index: 2, label: '예치금', amount: 1000},
    {index: 3, label: '교보캐시', amount: 200},
    {index: 4, label: 'e교환권', amount: 300}
  ];
  const payments = [
    { name: '신용카드' },
    { name: '네이버페이', iconClass: style.icoPaymentNpay, hasBenefit: true, isActive: true },
    { name: '카카오페이', iconClass: style.icoPaymentKakaopay },
    { name: '토스페이', iconClass: style.icoPaymentToss, hasBenefit: true },
    { name: '삼성페이', iconClass: style.icoPaymentSamsungpay },
  ];

  const totalPoint = pointData.reduce((sum, item) => sum+item.amount, 0);
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
          <div className={style.rightArea}>
            <div className={style.rightAreaWrap}>
              <ol className={style.stepRoundTextList}>
                <StepItemNum />
              </ol>
            </div>
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
                            <span className={style.addName}>
                              <i className={style.icoLocationPrimary}></i>
                              <span className={style.text}>주소지 이름</span>
                            </span>
                            <span className={style.badgeSM}>
                              <span className={style.textBadgeSM}>기본배송지</span>
                            </span>
                            <button type="button" className={`${style.btnXs} ${style.btnLineGray}`}>
                              <span className={`${style.text} ${style.btnText}`}>변경</span>
                            </button>
                          </div>
                          <div className={style.addressPerson}>
                            <span className={style.receiveName}>수령자 이름</span>
                            <span className={style.gap}>/</span>
                            <span className={style.phoneNumber}>010-1234-5678</span>
                            <button type='button' className={style.btnInfoPopup}>
                              <span className={style.icoQuestion}></span>
                            </button>
                          </div>
                          <div className={style.address}>
                            <span className={style.addressText}>주소 - 사용자 DB 정보 불러오기</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className={style.hasIp}>배송요청사항</th>
                      <td>
                        <div className={style.btnWrap}>
                          <button type='button' className={style.btnLineGrayFull}>
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
                      <Point amount={totalPoint}/>
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
                        {pointData.map((point, index, arr) => (
                          <tr key={point.id}>
                            <th className={style.hasIp}>{point.label}</th>
                            {index === arr.length - 1 && (
                              <>
                                <button
                                  type="button"
                                  className={style.btn_info_popup}
                                  data-cash-voucher="info-e-coupon"
                                >
                                  <span className={style.ico_question}></span>
                                  <span className="hidden">팝업 열기</span>
                                </button>

                                <button
                                  type="button"
                                  className={`${style.btnXs} ${style.btnLineGray}`}
                                  data-cash-voucher="btn-chg-e-coupon"
                                >
                                  <span className="text">목록</span>
                                </button>
                              </>
                            )}
                            <td>
                              <div className={style.numberValueBox}>
                                <Point amount={point.amount} />
                              </div>
                            </td>
                            <td>
                              <div className={style.inputBtnPriceBox}>
                                <UsePoint />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className={style.noFoldBox}>
                <div className={style.foldBoxHeader}>
                  <div className={style.tblRowWrap}>
                    <table className={style.tblRow}>
                      <colgroup>
                        <col style={{width: '210px'}}/>
                        <col style={{width: 'auto'}}/>
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>
                            <span className={style.giftCardUsedCheckIconArea}>교보문고 기프트카드</span>
                          </th>
                          <td>
                            <div className={style.formInfoSingle}>
                              <div className={style.numberValueBox}>
                                <span className={style.point}>
                                  <span className={style.val}>0</span>
                                  <span className={style.unit}>장</span>
                                </span>
                              </div>
                              <button className={style.btnXs}>
                                <span className={style.text}>사용</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className={style.noFoldBox}>
                <div className={style.foldBoxHeader}>
                  <div className={style.tblRowWrap}>
                    <table className={style.tblRow}>
                      <colgroup>
                        <col style={{width: '210px'}}/>
                        <col style={{width: 'auto'}}/>
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>
                            <span className={style.giftCardUsedCheckIconArea}>제휴포인트 사용/적립</span>
                          </th>
                          <td>
                            <div className={style.formInfoSingle}>
                              <span className={style.defaultText}>
                                GS&POINT / OK캐쉬백 / L.POINT / 문화상품권 / 기아멤버스 / 대한항공
                              </span>
                              <button className={style.btnXs}>
                                <span className={style.text}>사용/적립</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.paymentBoxWrap}>
            <div className={style.paymentHeaderWrap}>
              <div className={style.paymentHeaderInner}>
                <span className={style.headerText}>결제수단</span>
              </div>
            </div>
            <div className={style.paymentHeaderWrap}>
              <div className={style.paymentHeaderInner}>
                <span className={style.formRdo}>
                  <input type="radio"/>
                  <label for="">퀵계좌이체</label>
                </span>
                <div className={style.recentInfoBox}>
                  <span className={style.badgeMd}>
                    <span className={style.text}>즉시 할인</span>
                  </span>
                </div>
                <div className={style.rightArea}>
                  <button type='button' className={style.btnInfoPopup}>
                    <span className={style.icoQuestion}></span>
                  </button>
                </div>
              </div>
            </div>
            <div className={style.paymentHeaderWrap}>
              <div className={style.paymentHeaderInner}>
                <span className={style.formRdo}>
                  <input type="radio"/>
                  <label for="">다른 결제 수단</label>
                </span>
              </div>
            </div>
            <div className={style.paymentBodyWrap}>



              <div className={style.paymentEtcWrap}>
                <div className={style.paymentItemRowGroup}>
                  {payments.map((payment, index) => (
                    <PaymentButton
                      key={index}
                      name={payment.name}
                      iconClass={payment.iconClass}
                      hasBenefit={payment.hasBenefit}
                      isActive={payment.isActive}
                    />
                  ))}

                  <div className={style.paymentItemOptionWrap}>
                    <div className={style.infoTextBox}>
                      <div className={style.formColGroup}>
                        <div className={style.colBox}>
                          <span className={style.formChk}>
                            <input type="checkbox" />
                            <label for="">이 결제수단을 다음에도 사용</label>
                          </span>
                          <span className={style.rightArea}>
                            <a href=""></a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
