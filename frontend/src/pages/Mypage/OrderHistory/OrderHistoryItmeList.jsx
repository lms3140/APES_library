import listStyle from "./OrderHistoryItmeList.module.css";
import { Link } from "react-router-dom";
export function OrderHistoryItemList({ itmes }) {
  return (
    <div>
      {itmes?.map((book) => {
        return (
          <div className={listStyle.listContainer} key={book.bookId}>
            <div>
              <Link to={`/detail/${book.bookId}`}>
                <img src={book?.imageUrl} alt={book?.bookId} />
              </Link>
            </div>
            <div>
              <p className={listStyle.title}>{book?.title}</p>
            </div>
            <div>
              <span>{book?.quantity} 개</span>
            </div>
            <div>
              <span>{book?.unitPrice * book?.quantity} 원</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
