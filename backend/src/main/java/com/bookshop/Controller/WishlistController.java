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

    @PostMapping("/delete")
    public WishlistRespDto deleteWishlist(@RequestBody List<Long> bookId) {

        int successCount = 0;

        for (Long id : bookId) {
            int res = wishlistService.deleteWishlist(id);
            if (res == 1) successCount++;
        }

        if (successCount == 0) {
            return new WishlistRespDto(false, "삭제된 항목이 없습니다.");
        }

        return new WishlistRespDto(true, "선택한 항목이 삭제되었습니다.");
    }

    @PostMapping("/toggle")
    public WishlistRespDto toggleWishlist(@RequestBody Long bookId) {
        return wishlistService.toggleWishlist(bookId);
    }


}
