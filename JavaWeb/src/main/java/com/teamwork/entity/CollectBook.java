package com.teamwork.entity;

import java.util.Date;

public class CollectBook {
    private Integer collectionId;
    private Integer collector;
    private Integer collectBookId;
    private Date favoriteDate;

    public CollectBook() {
    }
    public CollectBook(Integer collectionId, Integer collector, Integer collectBookId, Date favoriteDate) {
        this.collectionId = collectionId;
        this.collector = collector;
        this.collectBookId = collectBookId;
        this.favoriteDate = favoriteDate;
    }
    public Integer getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(Integer collectionId) {
        this.collectionId = collectionId;
    }

    public Integer getCollector() {
        return collector;
    }

    public void setCollector(Integer collector) {
        this.collector = collector;
    }

    public Integer getCollectBookId() {
        return collectBookId;
    }

    public void setCollectBookId(Integer collectBookId) {
        this.collectBookId = collectBookId;
    }

    public Date getFavoriteDate() {
        return favoriteDate;
    }

    public void setFavoriteDate(Date favoriteDate) {
        this.favoriteDate = favoriteDate;
    }
}
