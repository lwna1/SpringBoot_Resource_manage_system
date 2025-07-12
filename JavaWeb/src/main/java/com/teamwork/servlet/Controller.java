package com.teamwork.servlet;

import com.teamwork.DAO.UserMapper;
import com.teamwork.entity.Result;
import com.teamwork.entity.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller{
    @Autowired
    private UserMapper userMapper;

    @RequestMapping("/hello")
    public Result Hello()
    {
        List<User> userList = new ArrayList<>();
        User user = new User();
        user.setUserName("山茱萸");
        User user1 = new User();
        user1.setUserName("邹同东");
        userList.add(user);
        userList.add(user1);
        return Result.success(userList);
    }

    @RequestMapping("/set")
    public Result Set()
    {
        User user = new User();
        user.setUserName("李思豪");
        return Result.success(user);
    }

    @RequestMapping("/login")
    public void Login(String userName,String password,HttpServletResponse response) throws IOException {
        System.out.println(userName);
        System.out.println(password);
        response.sendRedirect("https://www.baidu.com");
    }
    @RequestMapping("/Demo/{id}")
    public Result Demo(@PathVariable String id)
    {
        return Result.success(id);
    }
    @RequestMapping("/users")
    public Result Users()
    {
        return Result.success(userMapper.getAllUser());
    }
    @RequestMapping("/users/{id}")
    public Result getUser(@PathVariable Integer id)
    {
        return Result.success(userMapper.getTheUser(id));
    }
}
