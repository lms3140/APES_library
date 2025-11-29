import { useEffect, useState } from "react";
import axios from "axios";
/**
 * [Get] 데이터 요청 훅
 * @param {string} url get요청을 보낼 URL
 * @returns {{ data: any | null, isError: boolean, isLoading: boolean }}
 *
 *
 * @example
 * ```
 *  // 사용예시 코드!!
 *
 *  const url = "http://example.com/getSomething"
 *  const {data, isLoading, isError} = useGetFetch(url);
 *
 *  if(isError){
 *    return <h1>에러발생!</h1>
 *  }
 *
 *  return
 *    <div>
 *      {isLoading ? <h1>로딩중</h1> : <h1>로딩완료</h1>}
 *    </div>
 *
 * ```
 *
 */
export const useGetFetch = (url) => {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getFetch() {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (e) {
        console.error(`[dev] useGetFetch 훅에서 에러 발생 : ${e}`);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getFetch();
  }, []);

  return { isError, isLoading, data };
};
