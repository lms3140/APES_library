/**
 * Review.jsx
 * - axios 유틸 사용하도록 수정
 * - bookId props에 따라 리뷰 목록 fetch
 * - 리뷰 작성 버튼 클릭 시 모달 표시
 * - 리뷰 정렬 Dropdown 추가
 * - 리뷰 작성 시간 표시 (날짜 + 시간)
 */

import React, { useEffect, useState } from "react";
import { axiosData } from "../../utils/dataFetch.js";
import ReviewWriteModal from "./ReviewWriteModal";
import ReviewSummary from "./ReviewSummary";
import { Dropdown } from "../../components/Dropdown/Dropdown.jsx";

import styles from "./Review.module.css";

export default function Review({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // 🔹 정렬 옵션 추가
  const sortOptions = ["최신순", "오래된순"];
  const [sort, setSort] = useState("최신순");

  /** 리뷰 목록 조회 */
  const fetchReviews = async (sortParam = sort) => {
    try {
      const data = await axiosData(`/api/reviews?book_id=${bookId}&sort=${sortParam}`);
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setReviews([]);
    }
  };

  /** 리뷰 요약 조회 */
  const fetchSummary = async () => {
    try {
      const data = await axiosData(`/api/reviews/summary?book_id=${bookId}`);
      setSummary(data);
    } catch (e) {
      console.error(e);
      setSummary(null);
    }
  };

  /** bookId 또는 sort 변경 시 데이터 새로 가져오기 */
  useEffect(() => {
    fetchReviews();
    fetchSummary();
    setLoading(false);
  }, [bookId, sort]);

  /** 정렬 변경 시 상태 업데이트 */
  const handleSortChange = (newSort) => {
    setSort(newSort);
    fetchReviews(newSort); // sort 파라미터와 함께 API 호출
  };

  return (
    <div className={styles.reviewSection}>

      {/* 🔹 1. 상단 헤더 영역 */}
      <div className={styles.headerRow}>
        <h3 className={styles.sectionTitle}>
          리뷰
        </h3>

        <button
          className={styles.writeButton}
          onClick={() => setModalOpen(true)}
        >
          <img
            src="/images/detail/ico_review.png"
            alt="리뷰 작성"
            className={styles.pencilIcon}
          />
          리뷰 작성
        </button>
      </div>

      {/* 🔹 2. 리뷰 요약 Summary */}
      <ReviewSummary summary={summary} />

      {/* 🔹 2-1. 리뷰 정렬 Dropdown */}
      <div className={styles.sortDropdowns}>
        <Dropdown
          options={sortOptions}
          selected={sort}
          onChange={handleSortChange}
        />
      </div>

      {/* 🔹 3. 리뷰 리스트 표시 */}
      {loading ? (
        <p>로딩중...</p>
      ) : reviews.length === 0 ? (
        <p className={styles.noReview}>아직 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.review_id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <span className={styles.memberId}>{review.member_id}</span>

              <span className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < review.rating
                        ? "/images/detail/cloveron.png"
                        : "/images/detail/cloveroff.png"
                    }
                    alt={i < review.rating ? "on" : "off"}
                    className={styles.clover}
                  />
                ))}
              </span>
            </div>

            <p className={styles.content}>{review.content}</p>

            {/* 🔹 리뷰 작성 시간 표시 */}
            <span className={styles.date}>
              {new Date(review.created_at).toLocaleString()}
              {/*
                - API에서 내려오는 review.created_at 사용
                - toLocaleString()으로 YYYY.MM.DD HH:MM:SS 형태로 표시
                - 사용자 입장에서 언제 작성했는지 정확하게 확인 가능
              */}
            </span>
          </div>
        ))
      )}

      {/* 🔹 4. 리뷰 작성 모달 */}
      {modalOpen && (
        <ReviewWriteModal
          bookId={bookId}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchReviews();
            fetchSummary(); // 리뷰 작성 후 Summary도 업데이트
          }}
        />
      )}
    </div>
  );
}
