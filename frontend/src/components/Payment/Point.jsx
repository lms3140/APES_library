import style from '../../pages/Payment/Payment.module.css';

export function Point() {
    return (
        <span className={style.point}>
            {/* DB연결해서 불러오기 필요 */}
            <span className={style.val}>999</span>
            <span className={style.unit}>원</span>
        </span>
    )
}