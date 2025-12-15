import axios from "axios";

export const axiosData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const groupByRows = (array, number) => {
  const rows = array.reduce((acc, cur, idx) => {
    if (idx % number === 0) acc.push([cur]);
    else acc[acc.length - 1].push(cur);
    return acc;
  }, []);

  return rows;
};

export const axiosGet = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const axiosPost = async (url, formData) => {
  const token = localStorage.getItem("jwtToken");

  const response = await axios.post(url, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const axiosGetKakaoAuth = async (url) => {

  const response = await axios.get(url);

  return response.data;
};

export const axiosPostKakaoToken = async (data) => {

  const response = await axios.post("https://kauth.kakao.com/oauth/token", data, {
    headers: {

      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
  });
  return response.data;
};

export const fetchData = async (url) => {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
};
