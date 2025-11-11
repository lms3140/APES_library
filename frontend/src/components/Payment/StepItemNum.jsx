import style from '../../pages/Payment/Payment.module.css'


export function StepItemNum () {
    const steps = [
        {num:1, label:"장바구니"},
        {num:2, label:"사은품선택"},
        {num:3, label:"주문/결제"},
        {num:4, label:"주문완료"}
    ];

    return (
        <>
            {steps.map((step) => (
                <li key={step.num} className={`${style.stepItem} ${step.num === 3 ? style.activeStepItem : ''}`}>
                    <span className={`${style.stepNum} ${step.num === 3 ? style.activeStepNum : ''}`}>{step.num}</span>
                    {step.label}
                </li>
            ))}
        </>
    );

}