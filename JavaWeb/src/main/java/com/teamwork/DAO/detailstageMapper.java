package com.teamwork.DAO;

import com.teamwork.entity.*;
import com.teamwork.entity.Result;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface detailstageMapper {

    @Select("select * FROM teamwork.books where bookId =#{bookId}")
    List<Book> detailBook(Integer bookId);

    @Select("select * FROM teamwork.films where filmId =#{filmId}")
    List<Film> detailFilm(Integer filmId);

    @Update("UPDATE teamwork.books SET bookClicks=bookClicks+1 WHERE bookId=#{bookId}")
    void addBookC(Integer bookId);

    @Update("UPDATE teamwork.films SET filmClicks=filmClicks+1 WHERE filmId=#{filmId}")
    void addFilmC(Integer filmId);

    @Insert("INSERT INTO teamwork.collection_book (collection_book.collector, collection_book.collectbookId, collection_book.favoriteDate) VALUES (#{userId},#{collectBookId},NOW())")
    void collectBooks(Integer collectBookId,Integer userId);

    @Insert("INSERT INTO teamwork.collection_film (collection_film.collector, collection_film.collectFilmId, collection_film.favoriteDate) VALUES (#{userId},#{collectFilmId},NOW())")
    void collectFilms(Integer collectFilmId,Integer userId);

    @Delete("Delete FROM teamwork.collection_book WHERE collection_book.collectBookId = #{id} AND collection_book.collector = #{userId}")
    void uncollectBooks(Integer id, Integer userId);

    @Delete("Delete FROM teamwork.collection_film WHERE collection_film.collectFilmId = #{id} AND collection_film.collector = #{userId}")
    void uncollectFilms(Integer id, Integer userId);

    @Select("select userName FROM teamwork.user where userId =#{userId}")
    String getName(Integer userId);

    @Update("INSERT INTO teamwork.comments_book (comments_book.commentBookId,comments_book.commentatorId,comments_book.comment,comments_book.commentDate) VALUES (#{id},#{userId},#{comment},NOW())")
    void addCommentBook(Integer id, Integer userId, String comment);

    @Update("INSERT INTO teamwork.comments_film (comments_film.commentFilmId,comments_film.commentatorId,comments_film.comment,comments_film.commentDate) VALUES (#{id},#{userId},#{comment},NOW())")
    void addCommentFilm(Integer id, Integer userId, String comment);

    @Select("select * from teamwork.comments_book where commentBookId = #{commentBookId}")
    List<BookComment> getCommentBook(Integer commentBookId);

    @Select("select * from teamwork.comments_film where commentFilmId = #{commentBookId}")
    List<FilmComment> getCommentFilm(Integer commentBookId);
}
