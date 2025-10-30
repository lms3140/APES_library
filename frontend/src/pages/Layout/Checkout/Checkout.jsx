import style from '../Checkout/Checkout.module.css';

// 결제 페이지

export function Checkout() {
    return (
        <main className={style.containerWrapper}>
            <section className={style.contentsWrap}>
                <div className={style.contentsInner}>
                    <div className={`${style.cartTopWrap} ${style.sps} ${style.sps-abv}`}>
                        <div className={style.cartTopInner}>
                            <div className={style.cartTitleBox}>
                                <div className={style.titleWrap}>
                                    <p className={style.titleHeading}>주문/결제</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}