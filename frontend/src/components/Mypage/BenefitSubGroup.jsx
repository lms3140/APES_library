import style from '../../pages/Mypage/Mypage.module.css'
import { Link } from 'react-router-dom';


// Mypage 중단 2열 중, 하단의 쿠폰, 교보e캐시, 예치금 부분 구현 컴포넌트

export function BenefitSubGroup({items}) {
    return(
        <div className={`${style.benefitItem} ${style.benefitSubBox}`}>
            <Link to='#' className={style.benefitLink}>
                <span className={style.benefitTitle}>{items.title}</span>
                <div className={style.benefitVal}>
                    <span className={style.val}>{items.value}</span>
                    <span className={style.unit}>{items.unit}</span>
                </div>
            </Link>
        </div>
    );
}