import React, { useState } from "react";

export default function ProductPage() {
    const [cart, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState("");

    const product = {
        id: 1,
        name: "샘플 상품",
        price: 10000,
        description: "이것은 샘플 상품입니다."
    };

    const addToCart = () => {
        setCart([...cart, product]);
        alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
    };

    const addReview = () => {
        if (reviewInput.trim() !== "") {
            setReviews([...reviews, reviewInput]);
            setReviewInput("");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>{product.name}</h1>
            <p>가격: {product.price}원</p>
            <p>{product.description}</p>
            <button onClick={addToCart}>장바구니에 추가</button>

            <hr />

            <h2>리뷰</h2>
            <ul>
                {reviews.map((rev, idx) => (
                    <li key={idx}>{rev}</li>
                ))}
            </ul>
            <input
                type="text"
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                placeholder="리뷰를 입력하세요"
            />
            <button onClick={addReview}>리뷰 등록</button>

            <hr />

            <h2>장바구니</h2>
            <ul>
                {cart.map((item, idx) => (
                    <li key={idx}>
                        {item.name} - {item.price}원
                    </li>
                ))}
            </ul>
        </div>
    );
}

