package com.teamwork.DAO;

import com.teamwork.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    public User getByUsernameAndPassword(String username,String password);
    public Integer loginCheck(String username);
}

