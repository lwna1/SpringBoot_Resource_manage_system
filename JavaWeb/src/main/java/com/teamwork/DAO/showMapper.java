package com.teamwork.DAO;


import com.teamwork.entity.Book;
import com.teamwork.entity.Film;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface showMapper {
    //获取电影数目
    @Select("select count(*) from teamwork.films")
    public Integer count1();

    @Select("select count(*) from teamwork.books")
    public Integer count2();

    @Select("SELECT * FROM teamwork.films limit #{start},10")
    List<Film> list(Integer start);

    @Select("SELECT * FROM teamwork.books limit #{start},10")
    List<Book> list1(Integer start);

    @Select("select * FROM teamwork.films  where filmName like '%${filmName}%' order by teamwork.films.releaseDate desc limit #{start},10")
    public List<Film> list2(Integer start ,String filmName);

    @Select("select * FROM teamwork.books  where bookName like '%${bookName}%' order by teamwork.books.uploadDate desc limit #{start},10")
    public List<Book> list3(Integer start, String bookName);

    @Select("select count(*) from teamwork.films where filmName like '%${filmName}%'")
    public Integer count3(String filmName);

    @Select("select count(*) from teamwork.books where bookName like '%${bookName}%'")
    public Integer count4(String bookName);

//    @Select("select * FROM teamwork.films limit #{start},10  where filmName like concat('%',#{filmName},'%') order by films.releaseDate desc")
//    public List<Film> list2(String filmName);
}
