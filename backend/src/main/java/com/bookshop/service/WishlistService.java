package com.bookshop.service;

import com.bookshop.dto.BookDto;
import com.bookshop.dto.WishlistRespDto;


import java.util.List;

public interface WishlistService {
     List<BookDto> getWishlist();
     int addWishlist(Long bookId);
     List<BookDto> addWishlists(List<Long> bookIds);
     int deleteWishlist(Long bookId);
     boolean existWish(Long bookId);
     WishlistRespDto toggleWishlist(Long bookId);
}
