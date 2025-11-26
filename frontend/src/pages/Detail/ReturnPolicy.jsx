import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Detail.module.css";

export const ReturnPolicy = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.detailSection}>
      {/* 아코디언 헤더 */}
      <div className={styles.groupHeader} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.sectionTitle}>교환/반품/품절 안내</h3>
        {isOpen ? (
          <FaChevronUp className={styles.iconToggle} />
        ) : (
          <FaChevronDown className={styles.iconToggle} />
        )}
      </div>

      {/* 아코디언 내용 */}
      <div
        className={`${styles.policyContent} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.description}>
          <h4>반품/교환 방법</h4>
          <p>
            마이룸 &gt; 주문관리 &gt; 주문/배송내역 &gt; 주문조회 &gt; 반품/교환 신청, <br />
            [1:1 상담 &gt; 반품/교환/환불] 또는 고객센터 (1544-1900) <br />
            * 오픈마켓, 해외배송 주문, 기프트 주문시 [1:1 상담 &gt; 반품/교환/환불] 또는 고객센터 (1544-1900)
          </p>

          <h4>반품/교환 가능 기간</h4>
          <p>
            변심반품: 수령 후 7일 이내 <br />
            상품의 결함 및 계약내용과 다를 경우: 문제점 발견 후 30일 이내
          </p>

          <h4>반품/교환 비용</h4>
          <p>변심 혹은 구매착오로 인한 반품/교환은 반송료 고객 부담</p>

          <h4>반품/교환 불가 사유</h4>
          <ul>
            <li>소비자의 책임 있는 사유로 상품 등이 손실 또는 훼손된 경우 (단지 확인을 위한 포장 훼손은 제외)</li>
            <li>소비자의 사용, 포장 개봉에 의해 상품 등의 가치가 현저히 감소한 경우 (예: 화장품, 식품, 가전제품 등)</li>
            <li>복제가 가능한 상품 등의 포장을 훼손한 경우 (예: 음반/DVD/비디오, 소프트웨어, 만화책 등)</li>
            <li>소비자의 요청에 따라 개별적으로 주문 제작되는 상품 ((1)해외주문도서)</li>
            <li>디지털 컨텐츠인 ebook, 오디오북 등을 1회 이상 다운로드 받거나 '바로보기'로 열람한 경우</li>
            <li>시간 경과로 재판매가 곤란할 정도로 가치가 현저히 감소한 경우</li>
            <li>전자상거래 등에서의 소비자보호법상 청약철회 제한 내용 해당</li>
            <li>세트상품 일부만 반품 불가 (필요 시 세트상품 반품 후 낱권 재구매)</li>
            <li>기타 반품 불가 품목: 잡지, 테이프, 대학입시자료, 사진집, 교과서, 미디어 전품목 등</li>
          </ul>

          <h4>상품 품절</h4>
          <p>공급사(출판사) 재고 사정에 의해 품절/지연될 수 있으며, 품절 시 이메일과 문자로 안내</p>

          <h4>소비자 피해보상 및 환불 지연</h4>
          <ul>
            <li>상품 불량, A/S, 환불, 품질보증, 피해보상 등은 소비자분쟁 해결 기준(공정거래위원회 고시) 준수</li>
            <li>대금 환불 및 환불 지연에 따른 배상금 지급 조건은 전자상거래법에 따라 처리</li>
          </ul>

          <p>상품 설명에 반품/교환 관련 안내가 있는 경우, 해당 내용 우선 적용 (업체 사정에 따라 달라질 수 있음)</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
