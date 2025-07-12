package com.teamwork.entity;

import java.util.Date;

public class FilmComment {
    private Integer commentId;
    private Integer commentatorId;
    private Integer commentFilmId;
    private Date commentDate;
    private String comment;

    public FilmComment() {
    }

    public FilmComment(Integer commentId, Integer commentatorId, Integer commentFilmId, Date commentDate, String comment) {
        this.commentId = commentId;
        this.commentatorId = commentatorId;
        this.commentFilmId = commentFilmId;
        this.commentDate = commentDate;
        this.comment = comment;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public Integer getCommentatorId() {
        return commentatorId;
    }

    public void setCommentatorId(Integer commentatorId) {
        this.commentatorId = commentatorId;
    }

    public Integer getCommentFilmId() {
        return commentFilmId;
    }

    public void setCommentFilmId(Integer commentFilmId) {
        this.commentFilmId = commentFilmId;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }
}
