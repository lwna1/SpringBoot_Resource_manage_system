package com.teamwork;

import com.teamwork.entity.Film;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class TeamWorkApplicationTests {

    @Autowired
    private com.teamwork.DAO.showMapper showMapper;

    @Test
    void testList(){

    }

}
