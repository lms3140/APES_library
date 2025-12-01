import styles from "./Addresses.module.css";
import { Radio } from "../../../components/RadioButton/Radio.jsx";
import { AddressModal } from "./AddressModal.jsx";
import { useState } from "react";

export function Addresses({ addresses = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultAddress = addresses.find((a) => a.isDefault) || null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>배송주소록</h2>
      <div className={styles.defaultBox}>
        <div className={styles.defaultHeader}>
          {defaultAddress ? (
            <div className={styles.defaultInfo}>
              <p>
                {defaultAddress.addressName}
                <span>기본배송지</span>
              </p>
              <p>
                {defaultAddress.recipient_name} / {defaultAddress.phone}
              </p>
              <p>
                [{defaultAddress.zipcode}] {defaultAddress.addressLine1}{" "}
                {defaultAddress.addressLine2}
              </p>
            </div>
          ) : (
            <p className={styles.noDefault}>기본배송지가 없습니다.</p>
          )}
          <button className={styles.editBtn}>수정</button>
        </div>

        <div className={styles.notice}>
          <p>기본배송지 기준으로 배송일자가 안내됩니다.</p>
          <p>기본배송지는 삭제 불가합니다.</p>
        </div>
      </div>

      <div className={styles.listHeader}>
        <div>
          <h3 className={styles.count}>
            <span>{addresses.length}</span>개
          </h3>
          <p className={styles.limit}>
            * 배송지는 최대 100개까지 등록 가능합니다.
          </p>
          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(true)}
          >
            + 새 배송지 등록
          </button>
        </div>

        <div className={styles.listContainer}>
          {addresses.map((addr) => (
            <div key={addr.id} className={styles.item}>
              <Radio />
              <div>
                <div>
                  <span>{addr.addressName}</span>
                  {addr.isDefault && (
                    <span className={styles.defaultTag}>기본배송지</span>
                  )}
                </div>

                <p>
                  {defaultAddress.recipient_name} / {defaultAddress.phone}
                </p>
                <p>
                  [{defaultAddress.zipcode}] {defaultAddress.addressLine1}{" "}
                  {defaultAddress.addressLine2}
                </p>
              </div>

              <div className={styles.itemBtns}>
                <button className={styles.editBtn}>수정</button>
                {!addr.isDefault && (
                  <button className={styles.deleteBtn}>삭제</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className={styles.submitBtn}>기본 배송지로 설정</button>
      </div>

      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
