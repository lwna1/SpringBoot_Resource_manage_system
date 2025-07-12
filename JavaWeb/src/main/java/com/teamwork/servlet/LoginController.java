package com.teamwork.servlet;

import com.teamwork.DAO.LoginMapper;
import com.teamwork.entity.Result;
import com.teamwork.entity.User;
import com.teamwork.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    private LoginService service;


    @RequestMapping("/Login/login")
    public Result login(String username,String password){
        System.out.println("username1 ="+username);
        System.out.println("password1 ="+password);

        User u = service.login(username,password);


        return u !=null ? Result.success(u) :Result.failed("用户名或密码错误");
    }
    @RequestMapping("/Login/loginCheck")
    public Result loginCheck(String username){
        System.out.println("username = " +username);
        return service.loginCheck(username);
    }

}
