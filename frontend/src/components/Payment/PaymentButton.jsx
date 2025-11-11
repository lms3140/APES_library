import style from "../../pages/Payment/Payment.module.css"

export function PaymentButton({ name, iconClass, hasBenefit, isActive, }) {
     const btnClass = `
    ${style.btnXl}
    ${style.btnLineGray}
    ${style.btnPaymentEtc}
    ${isActive ? style.active : ''}
  `;
    const showText = name == '신용카드';

  return (
    <a
      href="javascript:void(0);"
      className={`${style.btnXl} ${style.btnLineGray} ${style.btnPaymentEtc} ${isActive ? style.active : ''}`}
    >
      {iconClass ? (
        <span className={`${iconClass} ${style.iconWrapper}`}>
          {/* <span className={style.hidden}>{name}</span> */}
        </span>
      ) : (
        showText && <span className={style.text}>{name}</span>
      )}

      {hasBenefit && (
        <>
          <span className={style.tagBenefit}>혜택</span>
        </>
      )}
    </a>
  );
}