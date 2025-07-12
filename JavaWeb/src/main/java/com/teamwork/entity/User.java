package com.teamwork.entity;

public class User {
    private Integer userId;
    private String userName;
    private String userPWd;
    private String nickname;
    private String question;
    private String answer;
    private Integer identity;
    private String avatar;

    public User() {
    }

    public User(Integer userId, String userName, String userPWd, String nickname, String question, String answer, Integer identity, String avatar) {
        this.userId = userId;
        this.userName = userName;
        this.userPWd = userPWd;
        this.nickname = nickname;
        this.question = question;
        this.answer = answer;
        this.identity = identity;
        this.avatar = avatar;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPWd() {
        return userPWd;
    }

    public void setUserPWd(String userPWd) {
        this.userPWd = userPWd;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getIdentity() {
        return identity;
    }

    public void setIdentity(Integer identity) {
        this.identity = identity;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
