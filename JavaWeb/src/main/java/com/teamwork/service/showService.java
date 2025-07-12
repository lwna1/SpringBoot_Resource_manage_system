package com.teamwork.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.teamwork.DAO.showMapper;
import com.teamwork.entity.Book;
import com.teamwork.entity.Film;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class showService {

    @Autowired
    public showMapper showMapper1;

    public  Integer filmcount() {
        return showMapper1.count1();
    }

    public Integer bookcount(){
        return showMapper1.count2();
    }

    //查询全部电影数据
    public List<Film> list(Integer start) {
        return showMapper1.list(start);
    }
    //查询全部书籍数据
    public List<Book> list1(Integer start) {
        return showMapper1.list1(start);
    }

    public List<Film> SearchFilm(Integer start ,String filmName) {
        return showMapper1.list2(start,filmName);
    }

    public List<Book> SearchBook(Integer start, String filmName) {
        return showMapper1.list3(start, filmName);
    }//查找书籍

    public Integer filmcount1(String filmName) {
        return showMapper1.count3(filmName);
    }

    public Integer bookcount1(String bookName) {
        return showMapper1.count4(bookName);
    }

//    public PageBean page(Integer page, Integer pageSize, String msg) {
//        PageHelper.startPage(page,pageSize);
//
//        List<Film> filmList = showMapper1.list2(msg); //条件分组查询电影
//        Page<Film> F= (Page<Film>) filmList;
//
//        PageBean pageBean = new PageBean(F.getTotal(),F.getResult());
//        return pageBean;
//    }

}
