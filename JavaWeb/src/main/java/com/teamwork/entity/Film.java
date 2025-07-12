package com.teamwork.entity;

import java.util.Date;

public class Film {
    private Integer filmId;
    private String filmName;
    private String director;
    private Date releaseDate;
    private String filmImg;
    private String filmUrl;
    private String filmSynopsis;
    private Integer filmClicks;
    private Date uploadDate;
    private Date favoriteDate;
    public Film() {
    }

    public Film(Integer filmId, String filmName, String director, Date releaseDate, String filmImg, String filmUrl, String filmSynopsis, Integer filmClicks, Date uploadDate, Date favoriteDate) {
        this.filmId = filmId;
        this.filmName = filmName;
        this.director = director;
        this.releaseDate = releaseDate;
        this.filmImg = filmImg;
        this.filmUrl = filmUrl;
        this.filmSynopsis = filmSynopsis;
        this.filmClicks = filmClicks;
        this.uploadDate = uploadDate;
        this.favoriteDate = favoriteDate;
    }

    public Date getFavoriteDate() {
        return favoriteDate;
    }

    public void setFavoriteDate(Date favoriteDate) {
        this.favoriteDate = favoriteDate;
    }

    public Integer getFilmId() {
        return filmId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String filmName) {
        this.filmName = filmName;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getFilmImg() {
        return filmImg;
    }

    public void setFilmImg(String filmImg) {
        this.filmImg = filmImg;
    }

    public String getFilmUrl() {
        return filmUrl;
    }

    public void setFilmUrl(String filmUrl) {
        this.filmUrl = filmUrl;
    }

    public String getFilmSynopsis() {
        return filmSynopsis;
    }

    public void setFilmSynopsis(String filmSynopsis) {
        this.filmSynopsis = filmSynopsis;
    }

    public Integer getFilmClicks() {
        return filmClicks;
    }

    public void setFilmClicks(Integer filmClicks) {
        this.filmClicks = filmClicks;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }
}
