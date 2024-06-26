package com.mycom.ussum.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class MemberVO {
    private String mem_id;
    private String mem_pwd;
    private String mem_gender;
    private String mem_phone;
    private String mem_address;
    private Date mem_birth;
    private Date mem_regdate;
    private String mem_type;
    private String mem_hot;
    private String mem_nickname;
    private String mem_name;
    private String mem_image;
}
