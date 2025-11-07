import style from '../../pages/Payment/Payment.module.css';

export function UsePoint() {
    return (
        <>
        <div className={style.inputPriceBox}>
            <input className={style.formIp} type="number" placeholder='0'/>
            <span className={style.unit}>원</span>
        </div>
        <button className={style.btnIp} type='button'>
            <span className={style.text}>전액사용</span>
        </button>
        </>
        
    )
}