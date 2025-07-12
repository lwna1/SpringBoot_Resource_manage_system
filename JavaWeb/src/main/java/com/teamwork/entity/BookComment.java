package com.teamwork.entity;

import java.util.Date;

public class BookComment {
    private Integer commentId;
    private Integer commentatorId;
    private Integer commentBookId;
    private Date commentDate;
    private String comment;

    public BookComment() {
    }

    public BookComment(Integer commentId, Integer commentatorId, Integer commentBookId, Date commentDate, String comment) {
        this.commentId = commentId;
        this.commentatorId = commentatorId;
        this.commentBookId = commentBookId;
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

    public Integer getCommentBookId() {
        return commentBookId;
    }

    public void setCommentBookId(Integer commentBookId) {
        this.commentBookId = commentBookId;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }
}
