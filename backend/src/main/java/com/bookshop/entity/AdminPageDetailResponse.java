package com.bookshop.entity;

import com.bookshop.dto.AdminPageDetailDto;
import com.bookshop.dto.AdminPageDto;
import lombok.Data;
import lombok.Getter;

import java.util.List;
@Data
public class AdminPageDetailResponse {
    private List<AdminPageDto> bookdata;
    private List<AdminPageDetailDto> bookdataDetail;

    public AdminPageDetailResponse(List<AdminPageDto> bookdata, List<AdminPageDetailDto> bookdataDetail) {
        this.bookdata = bookdata;
        this.bookdataDetail = bookdataDetail;
    }
}
