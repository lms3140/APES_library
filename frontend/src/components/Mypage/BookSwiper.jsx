import { Link } from "react-router-dom";
import style from "../../pages/Mypage/Mypage.module.css";

export function BookSwiper({items}) {
   return (
        <li className={`${style.ProdBlurItem} ${style.swiperSlide} ${style.swiperSlideVisible} ${style.swiperSlideActive}`}>
            <div className={style.prodBlurWrap}>
                {items.map((item, index) => (
                    <>
                        <div className={style.blurImgBox} key={index}><img src={item.image} className={style.blurImg}/></div>
                        <Link to="#" className={style.ProdBlurInner}>
                            <div className={`${style.prodArea} ${style.horizontal}`}>
                                <div className={`${style.prodThumbBox} ${style.sizeSm}`}>
                                    <span className={style.imgBox}><img src={item.image}/></span>
                                    <span className={style.prodName}>{item.title}</span>
                                    <div className={style.prodPrice}>
                                        <span className={style.percent}>{item.percent}</span>
                                        <span className={style.price}>
                                            <span className={style.val}>{item.price}</span>
                                            <span className={style.unit}>원</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </>
                ))}
            </div>
        </li>
   );
}