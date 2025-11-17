package com.bookshop.service;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.CartItemDto;
import com.bookshop.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    private final BookRepository bookRepository;

    public CartServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookDetailDto> cartToPayment(List<CartItemDto> cartItems) {
        List<BookDetailDto> bookDetails = new ArrayList<>();

        for (CartItemDto item : cartItems) {
            BookDetailDto book = bookRepository.findDetailByBookId(item.getBookId());
//            book.setQuantity(item.getQuatity());
            bookDetails.add(book);
        }

        return bookDetails;
    }
}
