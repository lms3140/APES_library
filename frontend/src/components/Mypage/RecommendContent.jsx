import style from "../../pages/Mypage/Mypage.module.css";
import { BookSwiper } from "./BookSwiper";
import bookSwiperData from '../../data/Mypage/bookSwiperData.json'

export function RecommendContent() {
    return (
        <>
            <div className={style.customSwiperWrap}>
                <div className={style.swiperContainer}>
                    <ul className={style.prodBlurList} style={{ transitionDuration: '0ms', transform: 'translate3d(0px, 0px, 0px)' }}>
                        <BookSwiper items={bookSwiperData.books}/>
                    </ul>
                </div>
                <div className={style.swiperControlBox}>
                    <button className={style.swiperButtonPrev} type='button' tabIndex='0' role='button' aria-label='PreviousSlide' aria-disabled='false'>
                        <span className={style.hidden}>이전</span>
                    </button>
                    <button className={style.swiperButtonNext} type='button' tabIndex='0' role='button' aria-label='NextsSlide' aria-disabled='false'>
                        <span className={style.hidden}>다음</span>
                    </button>
                </div>
            </div>
        
        </>

    )
}