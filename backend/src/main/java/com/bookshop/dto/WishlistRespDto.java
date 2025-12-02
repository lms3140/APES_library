package com.bookshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class WishlistRespDto {
    private boolean wished;  // 현재 상태
    private String message;
}
