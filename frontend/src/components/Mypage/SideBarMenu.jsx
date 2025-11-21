import React from 'react'
import { SnBMenu } from './SnBMenu.jsx'
import snbMenuData from '../../data/Mypage/snbMenuData.json'
import style from '../../pages/Mypage/Mypage.module.css'

// mypage 좌측 세로 메뉴

export function SideBarMenu() {
  return (
    <div className={style.snbWrap}>
        <ul className={style.snbListCategory}>
            <div className={style.snbWrap}>
                <ul className={style.snbListCategory}>
                    {snbMenuData.menus.map((menu, index) => (
                        <SnBMenu 
                            key={index} 
                            title={menu.title} 
                            items={menu.items} 
                        />
                    ))}
                </ul>
            </div>
        </ul>
    </div>
  )
}
