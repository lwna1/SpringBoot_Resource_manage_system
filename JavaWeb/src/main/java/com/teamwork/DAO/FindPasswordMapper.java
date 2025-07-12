package com.teamwork.DAO;

import com.teamwork.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FindPasswordMapper {
    public Integer userNameIsRight(String userName);

    public User getQuestion(String userName);

    public void updatePassword(Integer userId,String newPassword);
}
