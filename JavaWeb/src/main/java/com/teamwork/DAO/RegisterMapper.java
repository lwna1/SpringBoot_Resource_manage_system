package com.teamwork.DAO;

import com.teamwork.entity.Result;
import com.teamwork.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegisterMapper {

    public void addUser(String username, String password, String nickname, String question, String answer);

    public Integer registerCheck(String username);
}
