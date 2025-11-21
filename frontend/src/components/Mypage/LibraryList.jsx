import React from 'react'
import style from '../../pages/Mypage/Mypage.module.css'
import { Link } from 'react-router-dom'

// mypage 중단 보관함, 마이리스트, 구매기록
export function LibraryList() {
    const libData = [
        {index:1, label: '#나의 보관함'},
        {index:2, label: '#마이리스트'}
    ]

    return (
        <>
        <div className={`${style.titleWrap} ${style.titleSizeMd}`}>
            <p className={style.titleHeading}>라이브러리 리스트</p>
            <div className={style.rightArea}>
                <Link to='#' className='btnMoreView'>
                    <span className={style.text}>더보기</span>
                    <span className={style.icoArw}></span>
                </Link>
            </div>
        </div>

        <ul>
            {libData.map((item) => (
                <li key={item.index} className={style.myLibraryItem}>
                    <div className={`${style.myLibraryBox} ${style.empty}`}>
                        <div className={style.myLibraryBoxInner}>
                            <Link to="#" className={style.myLibraryLink}>
                                <div className={style.myLibraryInfo}>
                                    <span className={style.myLibraryTitle}>{item.label}</span>
                                    <span className={style.myLibraryDesc}>담겨있는 상품/콘텐츠가 없습니다.</span>
                                    <div className={style.myLibraryThumbList}>
                                        <span className={style.thumbAdd}>
                                            <span className={style.text}>+0</span>    
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </li>
            ))}
            
            <li className={style.myLibraryItem}>
                <div className={style.myLibraryBox}>
                    <div className={style.myLibraryBg}>
                        <img src="../../../images/bookImg/b1.webp" className={style.blurImg} />
                    </div>
                    <div className={style.myLibraryBoxInner}>
                        <Link to="#">
                            <div className={`${style.myLibraryImgBox} ${style.typeSquareRound}`}>
                                <div className={style.imgBox}>
                                    <img src="../../../images/bookImg/b1.webp" />
                                </div>
                            </div>
                            <div className={style.myLibraryInfo}>
                                <span className={style.myLibraryTitle}>#구매</span>
                                <div className={style.myLibraryThumbList}>
                                    <span className={style.thumbAdd}>
                                        <span className={style.text}>0</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </li>
        </ul>
        </>
        
    )
}
