package com.teamwork.DAO;

import com.teamwork.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    public List<User> getAllUser();
    public User getTheUser(Integer id);
}
