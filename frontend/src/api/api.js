import Swal from "sweetalert2";
import "../css/swal.css";

//confirm 버튼만 있는 swal
export async function infoSwal(title, text, confirmButtonText) {
  return await Swal.fire({
    title,
    text,
    confirmButtonText,
    customClass: {
      popup: "customPopup",
      title: "customTitle",
      htmlContainer: "customText",
      confirmButton: "customConfirmButton",
    },
  });
}

//cancel 버튼만 있는 swal
export async function cancelSwal(title, text) {
  return await Swal.fire({
    title,
    text,
    cancelButtonText: "취소",
    showCancelButton: true,
    customClass: {
      popup: "customPopup",
      title: "customTitle",
      htmlContainer: "customText",
      cancelButton: "customCancelButton",
    },
  });
}

//confirm, cancel 버튼 둘다 있는 swal
export async function confirmSwal(title, text, confirmButtonText) {
  return await Swal.fire({
    title,
    text,
    cancelButtonText: "취소",
    showCancelButton: true,
    confirmButtonText,
    customClass: {
      popup: "customPopup",
      title: "customTitle",
      htmlContainer: "customText",
      confirmButton: "customConfirmButton",
      cancelButton: "customCancelButton",
    },
  });
}

//찜 설정 swal
export async function likeSwal(title, confirmButtonText) {
  return await Swal.fire({
    title,
    timer: 2000,
    confirmButtonText,
    customClass: {
      popup: "likePopup",
      title: "likeTitle",
      confirmButton: "likeConfirmButton",
    },
  });
}

//찜 해제 swal
export async function unlikeSwal(title) {
  return await Swal.fire({
    title,
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      popup: "likePopup",
      title: "likeTitle",
    },
  });
}
