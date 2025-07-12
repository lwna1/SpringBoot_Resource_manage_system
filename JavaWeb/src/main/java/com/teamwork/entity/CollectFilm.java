package com.teamwork.entity;

import java.util.Date;

public class CollectFilm {
    private Integer collectionId;
    private Integer collector;
    private Integer collectFilmId;
    private Date favoriteDate;

    public CollectFilm() {
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

    public Integer getCollectFilmId() {
        return collectFilmId;
    }

    public void setCollectFilmId(Integer collectFilmId) {
        this.collectFilmId = collectFilmId;
    }

    public Date getFavoriteDate() {
        return favoriteDate;
    }

    public void setFavoriteDate(Date favoriteDate) {
        this.favoriteDate = favoriteDate;
    }
}
