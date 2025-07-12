package com.teamwork.servlet;

import com.teamwork.entity.*;
import com.teamwork.service.detailstageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class detailstageController {
    @Autowired
    public detailstageService detailstageService1;

    @RequestMapping("/detailstage/resources")
    public Result displayResource(String classify,Integer id){
        if(classify.equals("Book")){
            List<Book> BookResource = detailstageService1.getResource1(id);
            return Result.success(BookResource);
        }
        else if(classify.equals("Film")){
            List<Film> FilmResource = detailstageService1.getResource2(id);
            return Result.success(FilmResource);
        }
        else {
            return null;
        }
    }

    @PostMapping("/detailstage/increaseClicks")
    public void increaseClicks(String classify,Integer id){
        if(classify.equals("Book")){
            detailstageService1.addClickBook(id);
            System.out.println(id);
            System.out.println("成功给click+1");
        }
        else if(classify.equals("Film")){
            detailstageService1.addClickFilm(id);
            System.out.println("成功给click+1 film");
        }
    }

    @PostMapping("/detailstage/favorite")
    public void favorite(String classify,Integer id,Integer userId){
        if(classify.equals("Book")){
//            System.out.println("我是收藏书籍");
//            System.out.println(id);
//            System.out.println(userId);
            detailstageService1.collectBooks(id,userId);
        }
        else if(classify.equals("Film")){
            detailstageService1.collectFilm(id,userId);
        }
    }

    @PostMapping("/detailstage/unfavorite")
    public void unfavorite(String classify,Integer id,Integer userId){
        if(classify.equals("Book")){
            detailstageService1.uncollectBooks(id,userId);
            System.out.println("我是取消收藏书籍");
            System.out.println(id);
            System.out.println(userId);
        }
        else if(classify.equals("Film")){
            detailstageService1.uncollectFilms(id,userId);
        }
    }

    @RequestMapping("/detailstage/users")
    public String displayUsers(Integer userId){
        return detailstageService1.getUserName(userId);
    }

    @PostMapping("/detailstage/comments")
    public void comments(String classify,Integer id,Integer userId,String comment){
        if(classify.equals("Book")){
            detailstageService1.addCommentBook(id,userId,comment);
        }
        else if(classify.equals("Film")){
            detailstageService1.addCommentFilm(id,userId,comment);
        }
    }

    @RequestMapping("/detailstage/getcomments")
    public Result getComments(String classify,Integer id){
        if(classify.equals("Book")){
            List<BookComment> bookCommentList = detailstageService1.getCommentBook(id);
            return Result.success(bookCommentList);
        }
        else if(classify.equals("Film")){
        List<FilmComment> filmCommentList = detailstageService1.getCommentFilm(id);
            return Result.success(filmCommentList);
        }
        return null;
    }
}
