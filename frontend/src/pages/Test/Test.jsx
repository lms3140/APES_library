import axios from "axios";
import { useEffect } from "react";

export function Test() {
  useEffect(() => {
    const testCall = async () => {
      const token = localStorage.getItem("jwtToken");

      const resp = await axios("http://localhost:8080/order-history/get", {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
      });
      console.log(resp.data);
    };
    testCall();
  }, []);

  return <></>;
}
