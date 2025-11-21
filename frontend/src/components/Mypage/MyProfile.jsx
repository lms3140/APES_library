import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../../pages/Mypage/Mypage.module.css'

//mypage 프로필 메뉴

export function MyProfile() {
    const [memberWishData, setMemberWishData] = useState(0);
    const wishData = [
        {index:1, label: "찜"},
        {index:2, label: "리스트"}
    ]
    const wish = async () => {
        const res = await axios.get('/wish');
        setMemberWishData(res.data);
    }
    
    return (
        <div className={style.myProfileArea}>
            <div className={style.profileThumbBoxNoImg}>
                <Link to="#" className={style.btnSetting}>
                    <div className={style.thumbBox}>
                        <div className={style.thumbBoxSetting}></div>
                    </div>
                </Link>
            </div>

            <div className={style.profileNameBox}>
                {/* 사용자 이름(닉네임) */}
                <span className={style.nameNowrap}>
                    <b data-role="nickname">닉네임</b>님
                </span>
                {/* 등급 배지 */}
                <span className={style.badge}>
                    <Link to="#" className={style.badgeIg}>
                        <div className={style.badgeImage}></div>
                        <span className={style.text}>프렌즈</span>
                        <div className={style.badgeArrow}></div>
                    </Link>
                </span>
            </div>

            <ul className={style.profileInfoList}>
                {wishData.map((item) => (
                    <li key={item.index} className={style.infoItemWish}>
                        <Link to="/wish" className={style.infoLink}>
                            <span className={style.title}>{item.label}</span>
                            <span className={style.val}>
                                {/* {memberWishData} */}
                                0
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
  )
}
