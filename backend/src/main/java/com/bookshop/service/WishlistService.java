package com.bookshop.service;

import com.bookshop.dto.BookDto;
import com.bookshop.dto.WishlistRespDto;


import java.util.List;

public interface WishlistService {
     List<BookDto> getWishlist();
     int addWishlist(Long bookId);
     int deleteWishlist(Long bookId);

    WishlistRespDto toggleWishlist(Long bookId);
}
