import axios from "axios"

export const axiosData = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

