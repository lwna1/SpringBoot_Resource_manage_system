package com.teamwork.servlet;

import com.teamwork.entity.Result;
import com.teamwork.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {
    @Autowired
    private RegisterService service;

    @RequestMapping("/Register/register")
    public String register(String username, String password, String nickname, String question, String answer){
         service.register(username,password,nickname,question,answer);
         return "success";
    }
    @RequestMapping("Register/registerCheck")
    public Integer registerCheck(String username){
        return service.registerCheck(username);
    }
}
