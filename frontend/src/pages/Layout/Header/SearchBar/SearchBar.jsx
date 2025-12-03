import style from "./SearchBar.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

export function SearchBar() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const searchSubmit = (data) => {
    if (data.keyword.trim() === "") {
      toast("검색어를 입력해주세요");
      return;
    }
    const url = `/search?keyword=${data.keyword}`;
    navigate(url);
  };

  return (
    <div className={style.headerInputContainer}>
      <form method="get" onSubmit={handleSubmit(searchSubmit)}>
        <select {...register("searchType")} className={style.headerInputSelect}>
          <option value="bookTitle">책 제목</option>
        </select>
        <div className={style.headerInputWrapper}>
          <input
            {...register("keyword")}
            className={style.headerInput}
            type="text"
            placeholder="검색"
          />
        </div>
        <button className={style.submitBtn}>
          <IoSearch fontSize={"1.5rem"} />
        </button>
      </form>
    </div>
  );
}
