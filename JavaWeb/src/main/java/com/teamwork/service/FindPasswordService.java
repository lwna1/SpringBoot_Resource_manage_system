package com.teamwork.service;

import com.teamwork.DAO.FindPasswordMapper;
import com.teamwork.entity.Result;
import jakarta.annotation.Resource;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class FindPasswordService {
    @Autowired
    private FindPasswordMapper mapper;

    public FindPasswordService(){};

    public Result userNameIsRight(String userName)
    {
        Integer result = mapper.userNameIsRight(userName);
        if (result == 0)
        {
            return Result.failed("用户名不存在");
        }
        return Result.success();
    }

    public Result getQuestion(String userName)
    {
        return Result.success(mapper.getQuestion(userName));
    }

    public Result updatePassword(Integer userId,String newPassword)
    {
        mapper.updatePassword(userId,newPassword);
        return Result.success();
    }
}
