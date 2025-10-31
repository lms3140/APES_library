package com.bookshop.dto;

import lombok.Data;

@Data
public class Member {
    private String id;
    private String pwd;
    private String name;
    private String phone;
    private String email;
    private String birth;
    private String gender;
}
