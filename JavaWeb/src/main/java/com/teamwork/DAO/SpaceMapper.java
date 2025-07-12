package com.teamwork.DAO;

import com.teamwork.entity.Book;
import com.teamwork.entity.Film;
import com.teamwork.entity.Result;
import com.teamwork.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Mapper
public interface SpaceMapper {
    public Integer getNumOfFavoriteBook(Integer userId);

    public Integer getNumOfFavoriteFilm(Integer userId);

    public Integer getNumOfCommentBook(Integer userId);

    public Integer getNumOfCommentFilm(Integer userId);

    public void changeNickname(Integer userId,String newNickname);

    public void changeAvatar(Integer userId,String newAvatarUrl);

    public User getUser(Integer userId);

    public void changeQuestion(String newQuestion,String newAnswer,Integer userId);

    public List<Film> getMyFavoriteFilm(Integer userId,Integer startPage);

    public List<Book> getMyFavoriteBook(Integer userId,Integer startPage);

    public List<Film> getAllFilm(Integer start);

    public Integer getAllFilmNum();

    public List<Book> getAllBook(Integer start);

    public Integer getAllBookNum();

    public void insertNewFilm(String name, String writer,@DateTimeFormat(pattern = "yyyy-MM-dd") Date publishDate, String url, String introduce);

    public Integer getMaxFilmId();

    public void ChangeFilmImg(Integer filmId,String newImgUrl);

    public void insertNewBook(String name, String writer,@DateTimeFormat(pattern = "yyyy-MM-dd") Date publishDate, String url,String ISBN, String introduce);

    public Integer getMaxBookId();

    public void ChangeBookImg(Integer bookId,String newImgUrl);

    public void MaintainFilmInfo(String url,String introduce,Integer resourceId);

    public void maintainBookInfo(String url,String introduce,String ISBN,Integer resourceId);

    public void delFilm(Integer resourceId);

    public void delBook(Integer resourceId);

    public Film getSingleFilm(Integer resourceId);

    public Book getSingleBook(Integer resourceId);
}
