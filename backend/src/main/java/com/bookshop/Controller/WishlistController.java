package com.bookshop.Controller;

import com.bookshop.dto.BookDto;
import com.bookshop.dto.WishlistRespDto;
import com.bookshop.entity.Wishlist;
import com.bookshop.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping("/get")
    public List<BookDto> getWishlist(){
        return wishlistService.getWishlist();
    }

    @PostMapping("/add")
    public WishlistRespDto addWishlist(@RequestBody Long bookId) {

        int res = wishlistService.addWishlist(bookId);

        if (res != 1) {
            return new WishlistRespDto(false, "찜 추가에 실패했습니다.");
        }

        return new WishlistRespDto(true, "찜에 추가되었습니다.");
    }

    @DeleteMapping("/delete")
    public WishlistRespDto deleteWishlist(@RequestBody Long bookId) {

        int res = wishlistService.deleteWishlist(bookId);

        if (res != 1) {
            return new WishlistRespDto(false, "찜 삭제에 실패했습니다.");
        }

        return new WishlistRespDto(true, "찜에서 삭제되었습니다.");
    }

    @PostMapping("/toggle")
    public WishlistRespDto toggleWishlist(@RequestBody Long bookId) {
        return wishlistService.toggleWishlist(bookId);
    }


}
