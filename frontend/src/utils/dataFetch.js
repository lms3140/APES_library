import axios from "axios"

export const axiosData = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

/**
 * axiosPost 함수를 이용하여 백엔드 연동 처리
 */
export const axiosPost = async (url, formData) => {
    const response = await axios.post(url, formData, { "Content-Type": "application/json" });
    /* const response = await axios({
        method: "POST",
        url: url,
        headers: { "Content-Type": "application/json" },
        data: formData
    }); */
    return response.data;
}