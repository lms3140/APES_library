import style from '../Checkout/Checkout.module.css';

// 결제 페이지

export function Checkout() {
    return (
        <main className={style.containerWrapper}>
            <section className={style.contentsWrap}>
                <div className={contentsInner}>
                    <div className={`${cartTopWrap} ${sps} ${sps-abv}`}>
                        <div className={cartTopInner}>
                            <div className={cartTitleBox}>
                                <div className={titleWrap}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}