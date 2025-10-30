import style from '../../pages/Mypage/Mypage.module.css'
import { Link } from 'react-router-dom';

export function SnBMenu({ title, items }) {
    return (
        <li className={style.snbItem}>
            <Link to="#" className={style.snbLinkDepthTitle}>{title}</Link>
            <ul className={style.snbSubList}>
                {items.map((item, index) => (
                    <li key={index} className={style.subItem}>
                        <Link to="#">{item.label}</Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}