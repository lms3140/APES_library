import style from "../../pages/Mypage/Mypage.module.css";
import { Link } from "react-router-dom";

// Mypage 중단 2열 중, 상단의 통합포인트, e교환권, 기프트카드, 교보캐시 부분 구현 컴포넌트

export function BenefitIcoGroup({ item }) {
    return (
        <div className={`${style.benefitItem} ${style[item.cname]}`}>
            <Link to='#' className={style.benefitLink}>
                <span className={style.benefitTitle}>{item.items.title}</span>
                <div className={style.benefitVal}>
                    <span className={style.val}>{item.items.value}</span>
                    <span className={style.unit}>{item.items.unit}</span>
                </div>
            </Link>
        </div>
    );
}