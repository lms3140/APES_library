import styles from "./Dropdown.module.css";
import { useEffect, useRef, useState } from "react";

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
    <div className={styles.sortDropdown} ref={dropdownRef}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <span>{selected}</span>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="#000"
            viewBox="0 0 12 12"
          >
            <desc>위쪽 화살표 아이콘</desc>
            <g clip-path="url(#a)">
              <path
                stroke="current"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.125 7.875 6.202 3.953 2.319 7.83"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h12v12H0z" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
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
        )}
      </button>

      {open && (
        <ul>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
