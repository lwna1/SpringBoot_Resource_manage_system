package com.teamwork.servlet;

import com.teamwork.entity.Book;
import com.teamwork.entity.Film;
import com.teamwork.entity.Result;
import com.teamwork.service.showService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class showController {

    @Autowired
    public showService showService1;


    //查询全部书籍电影数据并展示
    @RequestMapping("/show/films")
    public Result list(Integer page){
        List<Film> FilmList = showService1.list((page-1)*10);
//        List<Book> BookList = showService1.list1();
//        System.out.println("已成功");
         return Result.success(FilmList);
    }
    @RequestMapping("/show/books")
    public Result list1(Integer page){
        List<Book> BookList = showService1.list1((page-1)*10);
//        System.out.println("已成功");
        return Result.success(BookList);
    }
    @RequestMapping("/show/filmsNumber")
    public Result filmsNumber1(){
        return Result.success(showService1.filmcount());
    }
    @RequestMapping("/show/booksNumber")
    public Result booksNumber(){
        return Result.success(showService1.bookcount());
    }
    @RequestMapping("/show/searchMovies")
    public Result searchMovies(Integer page,String filmName){
//        System.out.println(filmName);
        List<Film> FilmListS= showService1.SearchFilm((page-1)*10,filmName);
        return Result.success(FilmListS);
    }
    @RequestMapping("/show/searchBooks")
    public Result searchBooks(Integer page,String filmName){

        System.out.println(page);
        List<Book> BookListS = showService1.SearchBook((page-1)*10,filmName);
        return Result.success(BookListS);
    }
    @RequestMapping("/show/searchFilmsNumber")
    public Result searchfilmsnumber(String filmName1){
        System.out.println(filmName1);
        System.out.println(showService1.filmcount1(filmName1));
        return Result.success(showService1.filmcount1(filmName1));
    }
    @RequestMapping("/show/searchBooksNumber")
    public Result searchbooksnumber(String filmName1){
        return Result.success(showService1.bookcount1(filmName1));
    }
}
