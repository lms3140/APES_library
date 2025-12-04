import { useEffect, useState } from "react";
import { OrderHistoryItemList } from "./OrderHistory/OrderHistoryItmeList";
import { OrderHistoryAddress } from "./OrderHistory/OrderHistoryAddress";
import { OrderHistoryPayment } from "./OrderHistory/OrderHistoryPayment";
import axios from "axios";
import dayjs from "dayjs";
import style from "./Orders.module.css";

export function Orders() {
  const [historyData, setHistoryData] = useState();
  useEffect(() => {
    const testCall = async () => {
      const token = localStorage.getItem("jwtToken");

      const resp = await axios("http://localhost:8080/order-history/get", {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
      });
      setHistoryData(resp.data);
    };
    testCall();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>주문/배송 목록</h1>
      <div>
        {historyData ? (
          historyData?.map((data) => {
            return (
              <div className={style.card} key={data.orderId}>
                <h1 className={style.orderHeader}>
                  {dayjs(data.paidAt).format("YYYY-MM-DD")}(배송중)
                </h1>
                <div className={style.orderBody}>
                  <OrderHistoryItemList itmes={data.items} />
                  <h1>배송지</h1>
                  <OrderHistoryAddress address={data.address} />
                </div>
                <hr className={style.orderBody} />
              </div>
            );
          })
        ) : (
          <div className={style.emptyBox}>
            <img src="/images/mypage/ico_nodata.png" alt="" />
            <div>주문한 상품이 없습니다.</div>
          </div>
        )}
      </div>

      <nav className={style.noticeBox}>
        <p>유의사항</p>
        <ul>
          <li>･ 배송조회는 택배사로 상품전달 후 조회 가능합니다.</li>
          <li>･ eBook은 구매 후 다운로드 시 이용할 수 있습니다.</li>
          <li>
            ･ eBook ‘sam’ 이용내역 조회 및 서비스 해지는 마이룸 {">"}{" "}
            sam이용내역 {">"} my이용권 페이지에서 가능합니다.
          </li>
          <li>
            ･ 주문한 상품이 품절될 경우 해당 상품은 자동 취소 신청되며,
            취소금액은 승인 취소 또는 예치금으로 반환됩니다.
          </li>
          <li>
            ･ 반환된 예치금은 나의 통장 {">"} 예치금에서 환불신청시, 신청계좌로
            환불해 드립니다.
          </li>
        </ul>
      </nav>

      <nav className={style.noticeBox}>
        <p>카드결제(간편결제,법인카드 포함) 취소 안내</p>
        <ul>
          <li>
            ･ 카드결제 취소 기간 안내
            <ul>
              <li>- 전체취소 : 당일 취소/환불 처리</li>
              <li>- 부분취소 : 영업일 기준 3~5일 소요(당일 취소 포함)</li>
            </ul>
          </li>
          <li>
            ･ 카드사 정책에 따라 주문당일 부분취소한 경우 당일 취소 및 환불
            불가합니다.
          </li>
          <li>･ 부분취소한 경우 카드사 승인 취소는 약 3~5일 소요됩니다.</li>
          <li>
            ･ 카드사에서 부분취소를 지원하지 않는 카드의 경우 승인취소가 아닌
            예치금으로 환불됩니다.
          </li>
          <li>
            ･ 주문취소시 오류가 발생하거나 환불이 정상 처리되지 않을 경우 1:1로
            문의 주시기 바랍니다.
          </li>
        </ul>
      </nav>
    </div>
  );
}
