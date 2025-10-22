import { useState } from "react";

export function MenuList({ stores }) {
  const [active, setActive] = useState("오시는길");

  return (
    <nav>
      <ul>
        {stores && stores.map}
        <li></li>
      </ul>
    </nav>
  );
}
