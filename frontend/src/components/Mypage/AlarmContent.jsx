import style from "../../pages/Mypage/Mypage.module.css";

// Mypage 알림/추천 토글 컴포넌트

export function AlarmContent({setActiveTab}) {
    return (
        <div className={style.switchToggleContentAlarm}>
            <div className={style.AlarmContent}>
                <div className={style.noDataDesc}>
                    <div className={style.noData}></div>
                    <div>지난 7일간 맞춤 소식이 없습니다.</div>
                    <div className={style.btnWrap}>
                        <button 
                            className={style.btnSm}
                            type="button"
                            onClick={() => setActiveTab("recommend")}>
                            <span className={style.text}>맞춤 추천 보기</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}