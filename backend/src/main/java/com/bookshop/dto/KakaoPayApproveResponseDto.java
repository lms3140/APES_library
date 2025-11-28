package com.bookshop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoPayApproveResponseDto {
    private String aid;
    private String tid;
    private String cid;
    private String sid;
    private String partner_order_id;
    private String partner_user_id;
    private String payment_method_type;
    private String item_name;
    private String approved_at;
    private Integer quantity;
    private Integer total_amount;
}
