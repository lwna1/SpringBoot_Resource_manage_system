package com.teamwork.entity;

import java.util.Date;

public class Book {
    private Integer bookId;
    private String bookName;
    private String writer;
    private String ISBN;
    private Date publicDate;
    private String bookImg;
    private String bookUrl;
    private String bookSynopsis;
    private Integer bookClicks;
    private Date uploadDate;
    private Date favoriteDate;

    public Book() {
    }

    public Book(Integer bookId, String bookName, String writer, String ISBN, Date publicDate, String bookImg, String bookUrl, String bookSynopsis, Integer bookClicks, Date uploadDate, Date favoriteDate) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.writer = writer;
        this.ISBN = ISBN;
        this.publicDate = publicDate;
        this.bookImg = bookImg;
        this.bookUrl = bookUrl;
        this.bookSynopsis = bookSynopsis;
        this.bookClicks = bookClicks;
        this.uploadDate = uploadDate;
        this.favoriteDate = favoriteDate;
    }

    public Date getFavoriteDate() {
        return favoriteDate;
    }

    public void setFavoriteDate(Date favoriteDate) {
        this.favoriteDate = favoriteDate;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public Date getPublicDate() {
        return publicDate;
    }

    public void setPublicDate(Date publicDate) {
        this.publicDate = publicDate;
    }

    public String getBookImg() {
        return bookImg;
    }

    public void setBookImg(String bookImg) {
        this.bookImg = bookImg;
    }

    public String getBookUrl() {
        return bookUrl;
    }

    public void setBookUrl(String bookUrl) {
        this.bookUrl = bookUrl;
    }

    public String getBookSynopsis() {
        return bookSynopsis;
    }

    public void setBookSynopsis(String bookSynopsis) {
        this.bookSynopsis = bookSynopsis;
    }

    public Integer getBookClicks() {
        return bookClicks;
    }

    public void setBookClicks(Integer bookClicks) {
        this.bookClicks = bookClicks;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }
}
