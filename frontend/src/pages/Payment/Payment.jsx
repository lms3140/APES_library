import React from 'react'
import style from '../Payment/Payment.module.css'

export default function Payment() {
  return (
    <section className={style.contents}>
      <div className={style.contentsInner}>
        <div className={style.cartTopWrap}>
          <p className={style.titleWrap}>주문/결제</p>
          <div className={style.rightAreaWrap}>
            <ol className={style.stepRoundTextList}>
              <li className={style.stepItem}><span className={style.stepNum}>1</span>장바구니</li>
              <li className={style.stepItem}><span className={style.stepNum}>2</span>사은품선택</li>
              <li className={style.stepItem}><span className={style.stepNumActive}>3</span>주문/결제</li>
              <li className={style.stepItem}><span className={style.stepNum}>4</span>주문완료</li>
            </ol>
          </div>
        </div>
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
                          <div className={style.addressName}>주소지 이름</div>
                          <div className={style.addressPerson}>주문자</div>
                          <div className={style.address}>주소</div>
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
    </section>
  )
}
