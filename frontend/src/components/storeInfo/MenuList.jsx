import { useState } from "react";
import { Menu } from "./Menu.jsx";

const menus = [
  { href: "#coming", name: "오시는길" },
  { href: "#storeMap", name: "매장 안내도" },
  { href: "#service", name: "매장 서비스" },
];
export function MenuList() {
  //활성화된 탭 기본값 - 오시는길
  const [active, setActive] = useState("오시는길");

  //탭을 클릭하면 활성화된 탭 이름이 바뀜
  const handleClick = (name) => {
    setActive(name);
  };

  return (
    <nav>
      <ul>
        {menus &&
          menus.map((menu) => {
            console.log(menu);
            return (
              <li key={menu.href}>
                <Menu href={menu.href} name={menu.name} click={handleClick} />
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
