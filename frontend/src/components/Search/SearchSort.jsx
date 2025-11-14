import styles from "../../pages/Search/Search.module.css";
import { useState } from "react";
import { Dropdown } from "../../pages/Dropdown/Dropdown.jsx";
import { ImMenu } from "react-icons/im";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";

export function SearchSort({ books }) {
  const sortOptions = ["인기순", "최신순", "낮은가격순", "높은가격순"];
  const selectedOptions = ["20개씩 보기", "50개씩 보기", "100개씩 보기"];
  const [sort, setSort] = useState("인기순"); //현재 선택된 정렬
  const [selected, setSelected] = useState(selectedOptions[0]); //기본으로 보이는 갯수
  const [limit, setLimit] = useState();

  const handleChange = (value) => {
    setSelected(value);
    const number = parseInt(value.replace("개씩 보기", "").trim());
    setLimit(number);
  };

  return (
    <div className={styles.sortBar}>
      <div className={styles.sortLeft}>
        <h3>전체 {books.length}건</h3>
      </div>

      <div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="0"
            viewBox="0 0 32 32"
          >
            <path
              stroke="none"
              d="M9.5 5C5.363 5 2 8.402 2 12.5c0 1.43.648 2.668 1.25 3.563a9.3 9.3 0 0 0 1.219 1.468L15.28 28.375l.719.719.719-.719L27.53 17.531S30 15.355 30 12.5C30 8.402 26.637 5 22.5 5c-3.434 0-5.645 2.066-6.5 2.938C15.145 7.066 12.934 5 9.5 5m0 2c2.988 0 5.75 2.906 5.75 2.906l.75.844.75-.844S19.512 7 22.5 7c3.043 0 5.5 2.496 5.5 5.5 0 1.543-1.875 3.625-1.875 3.625L16 26.25 5.875 16.125s-.484-.465-.969-1.187C4.422 14.215 4 13.273 4 12.5 4 9.496 6.457 7 9.5 7"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            stroke="#000"
            viewBox="0 0 16 16"
          >
            <desc>장바구니 아이콘</desc>
            <g stroke="current" clip-path="url(#a)">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2 2.667h1.123c.204.004.4.08.554.214.154.135.257.32.29.523l1.015 5.859a.9.9 0 0 0 .29.522.87.87 0 0 0 .554.215h6.448a.87.87 0 0 0 .537-.2.88.88 0 0 0 .298-.495l.86-4.123a.914.914 0 0 0-.448-1.035.9.9 0 0 0-.387-.104H6.667"
              />
              <path
                stroke-miterlimit="10"
                d="M6.333 13.333a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM11.667 13.333a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
              </clipPath>
            </defs>
          </svg>
          장바구니 담기
        </button>
      </div>

      <div className={styles.sortRight}>
        <Dropdown
          options={sortOptions}
          selected={sort}
          onChange={(value) => setSort(value)}
        />

        <Dropdown
          options={selectedOptions}
          selected={selected}
          onChange={handleChange}
        />
      </div>

      <div>
        <button>
          <ImMenu />
        </button>
        <button>
          <TfiLayoutGrid2Alt />
        </button>
      </div>
    </div>
  );
}
