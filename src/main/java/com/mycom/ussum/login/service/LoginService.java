package com.mycom.ussum.login.service;

import com.mycom.ussum.login.vo.LoginVO;

import java.util.List;

public interface LoginService {
    List<LoginVO> login(String mem_id, String mem_password);
}

