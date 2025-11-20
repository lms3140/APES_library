import styles from "./Dropdown.module.css";
import { useEffect, useRef, useState } from "react";

/**
 * 사용법 SearchSort.jsx 참고!
 */

export function Dropdown({ options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      className={`${styles.sortDropdown} ${open ? styles.open : ""}`}
      ref={dropdownRef}
    >
      <button onClick={() => setOpen((prev) => !prev)}>
        <span>{selected}</span>
        <svg
          className={styles.arrowIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="#000"
          viewBox="0 0 12 12"
        >
          <g clip-path="url(#a)">
            <path
              stroke="current"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m1.875 4.125 3.923 3.922L9.682 4.17"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h12v12H0z" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <ul className={open ? styles.openList : styles.closeList}>
        {options.map((option) => (
          <li
            key={option}
            className={option === selected ? styles.selected : ""}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
