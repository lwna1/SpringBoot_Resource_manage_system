package com.teamwork.service;

import com.teamwork.DAO.detailstageMapper;
import com.teamwork.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class detailstageService {

    @Autowired
    public detailstageMapper detailstageMapper1;

    public List<Book> getResource1(Integer id) {

        return detailstageMapper1.detailBook(id);
    }

    public List<Film> getResource2(Integer id) {
        return detailstageMapper1.detailFilm(id);
    }

    public void addClickBook(Integer id) {
        detailstageMapper1.addBookC(id);
    }

    public void addClickFilm(Integer id) {
        detailstageMapper1.addFilmC(id);
    }

    public void collectBooks(Integer id,Integer userId) {
        detailstageMapper1.collectBooks(id,userId);
    }

    public void collectFilm(Integer id,Integer userId) {
        detailstageMapper1.collectFilms(id,userId);
    }

    public void uncollectBooks(Integer id, Integer userId) {
        detailstageMapper1.uncollectBooks(id,userId);
    }

    public void uncollectFilms(Integer id, Integer userId) {
        detailstageMapper1.uncollectFilms(id,userId);
    }

    public String getUserName(Integer userId) {
        return detailstageMapper1.getName(userId);
    }

    public void addCommentBook(Integer id, Integer userId, String comment) {
        detailstageMapper1.addCommentBook(id,userId,comment);
    }

    public void addCommentFilm(Integer id, Integer userId, String comment) {
        detailstageMapper1.addCommentFilm(id,userId,comment);
    }

    public List<BookComment> getCommentBook(Integer id) {
        return detailstageMapper1.getCommentBook(id);
    }

    public List<FilmComment> getCommentFilm(Integer id) {
        return detailstageMapper1.getCommentFilm(id);
    }
}
