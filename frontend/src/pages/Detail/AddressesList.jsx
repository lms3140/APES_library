import React, { useEffect, useState } from "react";
import styles from "./AddressesList.module.css";
import { Radio } from "../../components/RadioButton/Radio.jsx";
import { AddressModal } from "./AddressModal.jsx";
import { confirmSwal } from "../../api/api.js";
import axios from "axios";

export function AddressesList({ onAddressSelected }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);

  // 주소 불러오기
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.get("http://localhost:8080/address/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data || []);
    } catch (err) {
      console.error("주소 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // 기본 배송지 설정
  const handleSetDefault = async () => {
    if (!selectedAddressId) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.post(
        "http://localhost:8080/address/set-default",
        { addressId: selectedAddressId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(res.data);
    } catch (err) {
      console.error("기본 배송지 설정 실패", err);
    }
  };

  // 주소 삭제
  const handleDelete = async (addressId) => {
    const result = await confirmSwal(
      "선택된 배송지를 삭제하시겠습니까?",
      "",
      "확인"
    );
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.post(
        "http://localhost:8080/address/delete",
        { addressId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(res.data);
    } catch (err) {
      console.error("주소 삭제 실패", err);
    }
  };

  // 수정 modal 열기
  const openEditModal = (address) => {
    setEditAddressData(address);
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>배송주소록</h2>

      <div className={styles.listContainer}>
        {addresses.map((addr) => (
          <div key={addr.addressId} className={styles.item}>
            <Radio
              checked={selectedAddressId === addr.addressId}
              onChange={() => {
                setSelectedAddressId(addr.addressId);
                onAddressSelected && onAddressSelected(addr);
              }}
            />
            <div className={styles.itemInfo}>
              <div className={styles.itemTitle}>
                {addr.addressName}
                {addr.isDefault && <span className={styles.defaultTag}>기본</span>}
              </div>
              <div className={styles.itemText}>
                {addr.recipientName} / {addr.phone}
              </div>
              <div className={styles.itemText2}>
                [{addr.zipCode}] {addr.addressLine1} {addr.addressLine2}
              </div>
            </div>

            <div className={styles.itemBtns}>
              {!addr.isDefault && (
                <>
                  <button
                    className={styles.editBtn}
                    onClick={() => openEditModal(addr)}
                  >
                    수정
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(addr.addressId)}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.submitBtn} ${!selectedAddressId ? styles.disabled : ""}`}
          onClick={handleSetDefault}
        >
          기본 배송지로 설정
        </button>
      </div>

      {isEditModalOpen && (
        <AddressModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSaved={() => {
            fetchAddresses();
            setIsEditModalOpen(false);
          }}
          editData={editAddressData} // 수정용 prop
        />
      )}
    </div>
  );
}
