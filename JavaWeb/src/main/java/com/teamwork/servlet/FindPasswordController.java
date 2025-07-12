package com.teamwork.servlet;

import com.teamwork.entity.Result;
import com.teamwork.service.FindPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FindPasswordController {
    @Autowired
    private FindPasswordService service;

    @RequestMapping("/FindPassword/userNameRight")
    public Result IsRight(String userName)
    {
        return service.userNameIsRight(userName);
    }

    @RequestMapping("/FindPassword/getQuestion")
    public Result getQuestion(String userName)
    {
        return service.getQuestion(userName);
    }

    @RequestMapping("/FindPassword/updatePassword")
    public Result updatePassword(Integer userId,String newPassword)
    {
        return service.updatePassword(userId,newPassword);
    }
}
