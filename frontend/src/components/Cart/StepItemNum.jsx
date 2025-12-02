import style from './StepItemNum.module.css';


export function StepItemNum () {
    const steps = [
        {num:1, label:"장바구니"},
        {num:2, label:"주문/결제"},
        {num:3, label:"주문완료"}
    ];

    return (
        <>
            {steps.map((step) => (
                <li key={step.num} className={`${style.stepItem} ${step.num === 1 ? style.activeStepItem : ''}`}>
                    <span className={`${style.stepNum} ${step.num === 1 ? style.activeStepNum : ''}`}>{step.num}</span>
                    {step.label}
                </li>
            ))}
        </>
    );

}