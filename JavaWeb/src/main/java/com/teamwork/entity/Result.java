package com.teamwork.entity;

public class Result {
    private Integer code;
    private String msg;
    private Object data;

    public  Result(){};
    public  Result(Integer code,String msg,Object data)
    {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static Result success(){
        return new Result(1,"success",null);
    }
    public static Result success(Object data)
    {
        return new Result(1,"success",data);
    }
    public static Result failed()
    {
        return new Result(0,null,null);
    }
    public static Result failed(String msg)
    {
        return new Result(0,msg,null);
    }
    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public Object getData() {
        return data;
    }
    public void setCode(Integer code) {
        this.code = code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
