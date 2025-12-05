import { useEffect, useState } from "react";
import axios from "axios";

export const useWishlist = (bookId) => {
  const token = localStorage.getItem("jwtToken");
  const [isWish, setIsWish] = useState(false);

  useEffect(() => {
    async function getWish() {
      const resp = await axios.post(
        `http://localhost:8080/wishlist/exists`,
        { bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsWish(resp.data);
    }
    if (token) {
      getWish();
    }
  }, []);

  const toggleWish = async () => {
    const resp = await axios.post(
      `http://localhost:8080/wishlist/toggle`,
      { bookId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setIsWish((prev) => !prev);
    return resp.data;
  };
  return { isWish, toggleWish };
};
