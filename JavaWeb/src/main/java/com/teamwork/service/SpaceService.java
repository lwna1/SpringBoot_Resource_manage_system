package com.teamwork.service;

import com.teamwork.DAO.SpaceMapper;
import com.teamwork.entity.Result;
import com.teamwork.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

@Service
public class SpaceService {
    @Autowired
    private SpaceMapper spaceMapper;
    public Result getFavoriteFilmNum(Integer userId)
    {
        return Result.success(spaceMapper.getNumOfFavoriteFilm(userId));
    }

    public Result getFavoriteBookNum(Integer userId)
    {
        return Result.success(spaceMapper.getNumOfFavoriteBook(userId));
    }
    public Result getNumOfFavorite(Integer userId)
    {
        return Result.success(spaceMapper.getNumOfFavoriteBook(userId) + spaceMapper.getNumOfFavoriteFilm(userId));
    }

    public Result getNumOfComment(Integer userId)
    {
        return Result.success(spaceMapper.getNumOfCommentBook(userId) + spaceMapper.getNumOfCommentFilm(userId));
    }

    public Result changeNickname(Integer userId,String newNickname)
    {
        spaceMapper.changeNickname(userId,newNickname);
        return Result.success();
    }

    public void changeAvatar(MultipartFile file, Integer userId) throws IOException
    {
        //获取文件名
        String fileOrigName = file.getOriginalFilename();
        StringBuilder LastName = new StringBuilder();
        if (fileOrigName != null)
        {
            for (int i = fileOrigName.length() - 1; i >= 0; i--)
            {
                if (fileOrigName.charAt(i) == '.')
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                    break;
                }else
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                }
            }
        }
        //设置文件存储路径
        String filePath = "src/main/resources/static/img/Space/" + userId + "_avatar" + LastName;
        try {
            File targetFile = new File(filePath);
            //判断文件是否存在
            if (targetFile.exists())
            {
                File delFile = new File(filePath);
                delFile.delete();
                System.out.println("exists!");
            }
            try {
                if (!targetFile.exists())
                {
                    //再次判断写入文件
                    boolean bool = targetFile.createNewFile();
                    FileOutputStream outputStream = new FileOutputStream(targetFile);
                    byte[] bytes = file.getBytes();
                    outputStream.write(bytes);
                    outputStream.close();
                }else
                {
                    System.out.println("img is exists!!!");
                }
                System.out.println(filePath);
            }catch (IOException e)
            {
                e.printStackTrace();
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }

        //修改数据库内容
        spaceMapper.changeAvatar(userId,"img/Space/" + userId + "_avatar" + LastName);
    }

    public Result getUser(Integer userId)
    {
        return Result.success(spaceMapper.getUser(userId));
    }

    public Result ChangeQuestion(String newQuestion,String newAnswer,Integer userId)
    {
        spaceMapper.changeQuestion(newQuestion, newAnswer, userId);
        return Result.success();
    }

    public Result getMyFavoriteFilm(Integer userId,Integer FilmPage)
    {
        return Result.success(spaceMapper.getMyFavoriteFilm(userId,(FilmPage-1) * 3));
    }

    public Result getMyFavoriteBook(Integer userId,Integer BookPage)
    {
        return Result.success(spaceMapper.getMyFavoriteBook(userId,(BookPage-1) * 3));
    }

    public Result getAllFilm(Integer FilmPage)
    {
        return Result.success(spaceMapper.getAllFilm((FilmPage-1)*3));
    }

    public Result getAllFilmNum()
    {
        return Result.success(spaceMapper.getAllFilmNum());
    }

    public Result getAllBook(Integer BookPage)
    {
        return Result.success(spaceMapper.getAllBook((BookPage-1)*3));
    }

    public Result getAllBookNum()
    {
        return Result.success(spaceMapper.getAllBookNum());
    }

    public Result uploadFilmResource(MultipartFile file, String name, String writer,Date publishDate, String url,String introduce) throws IOException
    {
        spaceMapper.insertNewFilm(name,writer,publishDate,url,introduce);
        Integer maxId = spaceMapper.getMaxFilmId();
        //获取文件名
        String fileOrigName = file.getOriginalFilename();
        StringBuilder LastName = new StringBuilder();
        if (fileOrigName != null)
        {
            for (int i = fileOrigName.length() - 1; i >= 0; i--)
            {
                if (fileOrigName.charAt(i) == '.')
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                    break;
                }else
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                }
            }
        }
        //设置文件存储路径
        String filePath = "src/main/resources/static/img/Film/Film_img_" + maxId + LastName;
        try {
            File targetFile = new File(filePath);
            //判断文件是否存在
            if (targetFile.exists())
            {
                File delFile = new File(filePath);
                delFile.delete();
                System.out.println("exists!");
            }
            try {
                if (!targetFile.exists())
                {
                    //再次判断写入文件
                    boolean bool = targetFile.createNewFile();
                    FileOutputStream outputStream = new FileOutputStream(targetFile);
                    byte[] bytes = file.getBytes();
                    outputStream.write(bytes);
                    outputStream.close();
                }else
                {
                    System.out.println("img is exists!!!");
                }
                System.out.println(filePath);
            }catch (IOException e)
            {
                e.printStackTrace();
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        //修改数据库内容
        spaceMapper.ChangeFilmImg(maxId,"img/Film/Film_img_" + maxId + LastName);
        return Result.success();
    }

    public Result uploadBookResource(MultipartFile file, String name, String writer, Date publishDate,String url,String ISBN, String introduce) throws IOException
    {
        spaceMapper.insertNewBook(name,writer,publishDate,url,ISBN,introduce);
        Integer maxId = spaceMapper.getMaxBookId();
        //获取文件名
        String fileOrigName = file.getOriginalFilename();
        StringBuilder LastName = new StringBuilder();
        if (fileOrigName != null)
        {
            for (int i = fileOrigName.length() - 1; i >= 0; i--)
            {
                if (fileOrigName.charAt(i) == '.')
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                    break;
                }else
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                }
            }
        }
        //设置文件存储路径
        String filePath = "src/main/resources/static/img/Book/Book_img_" + maxId + LastName;
        try {
            File targetFile = new File(filePath);
            //判断文件是否存在
            if (targetFile.exists())
            {
                File delFile = new File(filePath);
                delFile.delete();
                System.out.println("exists!");
            }
            try {
                if (!targetFile.exists())
                {
                    //再次判断写入文件
                    boolean bool = targetFile.createNewFile();
                    FileOutputStream outputStream = new FileOutputStream(targetFile);
                    byte[] bytes = file.getBytes();
                    outputStream.write(bytes);
                    outputStream.close();
                }else
                {
                    System.out.println("img is exists!!!");
                }
                System.out.println(filePath);
            }catch (IOException e)
            {
                e.printStackTrace();
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        //修改数据库内容
        spaceMapper.ChangeBookImg(maxId,"img/Book/Book_img_" + maxId + LastName);
        return Result.success();
    }

    public Result maintainFilmImg(@RequestParam(value = "file")MultipartFile file,Integer resourceId)
    {
        //获取文件名
        String fileOrigName = file.getOriginalFilename();
        StringBuilder LastName = new StringBuilder();
        if (fileOrigName != null)
        {
            for (int i = fileOrigName.length() - 1; i >= 0; i--)
            {
                if (fileOrigName.charAt(i) == '.')
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                    break;
                }else
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                }
            }
        }
        //设置文件存储路径
        String filePath = "src/main/resources/static/img/Film/Film_img_" + resourceId + LastName;
        try {
            File targetFile = new File(filePath);
            //判断文件是否存在
            if (targetFile.exists())
            {
                File delFile = new File(filePath);
                delFile.delete();
                System.out.println("exists!");
            }
            try {
                if (!targetFile.exists())
                {
                    //再次判断写入文件
                    boolean bool = targetFile.createNewFile();
                    FileOutputStream outputStream = new FileOutputStream(targetFile);
                    byte[] bytes = file.getBytes();
                    outputStream.write(bytes);
                    outputStream.close();
                }else
                {
                    System.out.println("img is exists!!!");
                }
                System.out.println(filePath);
            }catch (IOException e)
            {
                e.printStackTrace();
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        //修改数据库
        spaceMapper.ChangeFilmImg(resourceId,"img/Film/Film_img_" + resourceId + LastName);
        return Result.success();
    }

    public Result maintainBookImg(@RequestParam(value = "file")MultipartFile file,Integer resourceId)
    {
        //获取文件名
        String fileOrigName = file.getOriginalFilename();
        StringBuilder LastName = new StringBuilder();
        if (fileOrigName != null)
        {
            for (int i = fileOrigName.length() - 1; i >= 0; i--)
            {
                if (fileOrigName.charAt(i) == '.')
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                    break;
                }else
                {
                    LastName.insert(0, fileOrigName.charAt(i));
                }
            }
        }
        //设置文件存储路径
        String filePath = "src/main/resources/static/img/Book/Book_img_" + resourceId + LastName;
        try {
            File targetFile = new File(filePath);
            //判断文件是否存在
            if (targetFile.exists())
            {
                File delFile = new File(filePath);
                delFile.delete();
                System.out.println("exists!");
            }
            try {
                if (!targetFile.exists())
                {
                    //再次判断写入文件
                    boolean bool = targetFile.createNewFile();
                    FileOutputStream outputStream = new FileOutputStream(targetFile);
                    byte[] bytes = file.getBytes();
                    outputStream.write(bytes);
                    outputStream.close();
                }else
                {
                    System.out.println("img is exists!!!");
                }
                System.out.println(filePath);
            }catch (IOException e)
            {
                e.printStackTrace();
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        //修改数据库
        spaceMapper.ChangeBookImg(resourceId,"img/Book/Book_img_" + resourceId + LastName);
        return Result.success();
    }

    public Result maintainFilmInfo(String url,String introduce,Integer resourceId)
    {
        spaceMapper.MaintainFilmInfo(url,introduce,resourceId);
        return Result.success();
    }

    public Result maintainBookInfo(String url,String introduce,String ISBN,Integer resourceId)
    {
        spaceMapper.maintainBookInfo(url,introduce,ISBN,resourceId);
        return Result.success();
    }

    public Result delFilm(Integer resourceId)
    {
        String filePath = "src/main/resources/static/img/Film/Film_img_" + resourceId;
        File targetFile_jpg = new File(filePath+".jpg");
        File targetFile_png = new File(filePath+".png");
        File targetFile_jpeg = new File(filePath+".jpeg");
        File targetFile_gif = new File(filePath+".gif");
        //判断文件是否存在
        if (targetFile_jpg.exists())
        {
            File delFile = new File(filePath+".jpg");
            delFile.delete();
        }
        if (targetFile_png.exists())
        {
            File delFile = new File(filePath+".png");
            delFile.delete();
        }
        if (targetFile_jpeg.exists())
        {
            File delFile = new File(filePath+".jpeg");
            delFile.delete();
        }
        if (targetFile_gif.exists())
        {
            File delFile = new File(filePath+".gif");
            delFile.delete();
        }
        spaceMapper.delFilm(resourceId);
        return Result.success();
    }

    public Result delBook(Integer resourceId)
    {
        String filePath = "src/main/resources/static/img/Book/Book_img_" + resourceId;
        File targetFile_jpg = new File(filePath+".jpg");
        File targetFile_png = new File(filePath+".png");
        File targetFile_jpeg = new File(filePath+".jpeg");
        File targetFile_gif = new File(filePath+".gif");
        //判断文件是否存在
        if (targetFile_jpg.exists())
        {
            File delFile = new File(filePath+".jpg");
            delFile.delete();
        }
        if (targetFile_png.exists())
        {
            File delFile = new File(filePath+".png");
            delFile.delete();
        }
        if (targetFile_jpeg.exists())
        {
            File delFile = new File(filePath+".jpeg");
            delFile.delete();
        }
        if (targetFile_gif.exists())
        {
            File delFile = new File(filePath+".gif");
            delFile.delete();
        }
        spaceMapper.delBook(resourceId);
        return Result.success();
    }

    public Result getSingleFilm(Integer resourceId)
    {
        return Result.success(spaceMapper.getSingleFilm(resourceId));
    }

    public Result getSingleBook(Integer resourceId)
    {
        return Result.success(spaceMapper.getSingleBook(resourceId));
    }
}
