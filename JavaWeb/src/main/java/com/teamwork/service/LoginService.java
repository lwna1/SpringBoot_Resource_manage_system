package com.teamwork.service;

import com.teamwork.DAO.LoginMapper;
import com.teamwork.entity.Result;
import com.teamwork.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginMapper mapper;

    public User login(String username,String password){
        User u = mapper.getByUsernameAndPassword(username,password);
        return u;
    }
    public Result loginCheck(String username){
        System.out.println("num = "+mapper.loginCheck(username));
        return Result.success(mapper.loginCheck(username));
    }


}
