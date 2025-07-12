package com.teamwork.service;

import com.teamwork.DAO.LoginMapper;
import com.teamwork.DAO.RegisterMapper;
import com.teamwork.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    @Autowired
    private RegisterMapper mapper;

    public void register(String username, String password, String nickname, String question, String answer){
        mapper.addUser(username, password, nickname, question, answer);
    }

    public Integer registerCheck(String username) {
        return mapper.registerCheck(username);
    }
}
