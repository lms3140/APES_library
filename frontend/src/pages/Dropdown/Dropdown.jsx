import { dropdownArrow } from "../../components/common/Svgs";
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
        {dropdownArrow}
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
