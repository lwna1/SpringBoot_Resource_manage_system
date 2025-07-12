package com.teamwork.servlet;

import com.teamwork.entity.Result;
import com.teamwork.service.SpaceService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RestController
public class SpaceController {
    @Autowired
    private SpaceService spaceService;

    @RequestMapping("/Space/getFavoriteFilmNum")
    public Result getFavoriteFilmNum(Integer userId)
    {
        return spaceService.getFavoriteFilmNum(userId);
    }

    @RequestMapping("/Space/getFavoriteBookNum")
    public Result getFavoriteBookNum(Integer userId)
    {
        return spaceService.getFavoriteBookNum(userId);
    }

    @RequestMapping("/Space/getFavoriteNum")
    public Result getNumOfFavorite(Integer userId)
    {
        return spaceService.getNumOfFavorite(userId);
    }

    @RequestMapping("/Space/getCommentNum")
    public Result getNumOfComment(Integer userId)
    {
        return spaceService.getNumOfComment(userId);
    }

    @RequestMapping("/Space/ChangeNickname")
    public Result changeNickname(Integer userId,String newNickname)
    {
        return spaceService.changeNickname(userId,newNickname);
    }

    @PostMapping("Space/ChangeAvatar")
    public void changeAvatar(@RequestParam(value = "file")MultipartFile file, Integer userId) throws IOException
    {
        //完成更新头像
        spaceService.changeAvatar(file,userId);
    }

    @RequestMapping("/Space/{id}")
    public Result getUser(@PathVariable Integer id)
    {
        return spaceService.getUser(id);
    }

    @RequestMapping("/Space/ChangeQuestion")
    public Result ChangeQuestion(String newQuestion,String newAnswer,Integer userId)
    {
        return spaceService.ChangeQuestion(newQuestion, newAnswer, userId);
    }

    @RequestMapping("/Space/getMyFavoriteFilms")
    public Result getMyFavoriteFilm(Integer userId,Integer FilmPage)
    {
        return spaceService.getMyFavoriteFilm(userId,FilmPage);
    }

    @RequestMapping("/Space/getMyFavoriteBooks")
    public Result getMyFavoriteBook(Integer userId,Integer BookPage)
    {
        return spaceService.getMyFavoriteBook(userId,BookPage);
    }

    @RequestMapping("/Space/getAllFilm")
    public Result getAllFilm(Integer FilmPage)
    {
        return spaceService.getAllFilm(FilmPage);
    }

    @RequestMapping("/Space/getAllFilmNum")
    public Result getAllFilmNum()
    {
        return spaceService.getAllFilmNum();
    }

    @RequestMapping("/Space/getAllBook")
    public Result getAllBook(Integer BookPage)
    {
        return spaceService.getAllBook(BookPage);
    }

    @RequestMapping("/Space/getAllBookNum")
    public Result getAllBookNum()
    {
        return spaceService.getAllBookNum();
    }

    @PostMapping("/Space/uploadFilmResource")
    public Result uploadFilmResource(@RequestParam(value = "file")MultipartFile file, String name, String writer,
                                 @DateTimeFormat(pattern = "yyyy-MM-dd") Date publishDate,String url,
                                 String introduce) throws IOException
    {
        return spaceService.uploadFilmResource(file,name,writer,publishDate,url,introduce);
    }
    @PostMapping("/Space/uploadBookResource")
    public Result uploadBookResource(@RequestParam(value = "file")MultipartFile file, String name, String writer,
                                     @DateTimeFormat(pattern = "yyyy-MM-dd") Date publishDate,String url,String ISBN,
                                     String introduce) throws IOException
    {
        return spaceService.uploadBookResource(file,name,writer,publishDate,url,ISBN,introduce);
    }

    @RequestMapping("/Space/MaintainFilmImg")
    public Result maintainFilmImg(@RequestParam(value = "file")MultipartFile file,Integer resourceId)
    {
        return spaceService.maintainFilmImg(file,resourceId);
    }

    @RequestMapping("/Space/MaintainBookImg")
    public Result maintainBookImg(@RequestParam(value = "file")MultipartFile file,Integer resourceId)
    {
        return spaceService.maintainBookImg(file,resourceId);
    }

    @RequestMapping("/Space/MaintainFilmInfo")
    public Result maintainFilmInfo(String url,String introduce,Integer resourceId)
    {
        return spaceService.maintainFilmInfo(url,introduce,resourceId);
    }

    @RequestMapping("/Space/MaintainBookInfo")
    public Result maintainBookInfo(String url,String introduce,String ISBN,Integer resourceId)
    {
        return spaceService.maintainBookInfo(url,introduce,ISBN,resourceId);
    }

    @RequestMapping("/Space/DelFilm")
    public Result delFilm(Integer resourceId)
    {
        return spaceService.delFilm(resourceId);
    }

    @RequestMapping("/Space/DelBook")
    public Result delBook(Integer resourceId)
    {
        return spaceService.delBook(resourceId);
    }

    @RequestMapping("/Space/getSingleFilm")
    public Result getSingleFilm(Integer resourceId)
    {
        return spaceService.getSingleFilm(resourceId);
    }

    @RequestMapping("/Space/getSingleBook")
    public Result getSingleBook(Integer resourceId)
    {
        return spaceService.getSingleBook(resourceId);
    }
}
