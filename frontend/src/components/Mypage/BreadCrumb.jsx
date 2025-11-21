import React from 'react'
import style from '../../pages/Mypage/Mypage.module.css'
import { Link } from 'react-router-dom'

// Mypage 상단 홈 버튼 / 마이페이지 버튼 BreadCrumble

export function BreadCrumb() {
  return (
    <section className={style.breadCrumbWrap}>
        <div className={style.breadCrumbInner}>
            <ul className={style.breadCrumbList}>
                <li className={style.breadCrumbItem}>
                    <Link to="/" className={style.homeLink}></Link>
                </li>
                <li className={style.breadCrumbItem}>
                    <div className={style.noSub}></div>
                    <Link to="#" className={style.btnSubDepth} style={{ pointerEvents: 'none' }}>마이</Link>
                </li>
            </ul>
        </div>
    </section>
  )
}
