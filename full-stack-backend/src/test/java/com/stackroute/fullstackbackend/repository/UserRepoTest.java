package com.stackroute.fullstackbackend.repository;
import com.stackroute.fullstackbackend.model.User;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.neo4j.DataNeo4jTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
@DataNeo4jTest
public class UserRepoTest {
    @Autowired
    UserRepo userRepo;
    User user,user1,user2;
    @Before
    public void setUp() throws Exception {
        user=new User();
        user.setId(1l);
        user.setUsername("swetha123");
        user.setName("swetha");
    }

    @After
    public void tearDown() throws Exception {
        userRepo.deleteAll();
    }

    @Test
    public void saveUser(){
        userRepo.save(user);
        System.out.println("save user "+user.getName());
        User fetchUser = userRepo.findById(user.getId()).get();
        Assert.assertEquals(user.getId(),fetchUser.getId());

    }
    @Test
    public void getAllUsers(){
        user1=new User();
        user2=new User();
        user1.setId(2l);
        user1.setUsername("shreya123");
        user1.setName("shreya");
        user1.setFriends(user.getId());
        user2.setId(3l);
        user2.setUsername("aish123");
        user2.setName("aish");
        userRepo.save(user1);
        userRepo.save(user2);
        System.out.println("user1 details "+user1.toString());
        List<User> userlist = new ArrayList<>();
        userlist.add(user);
        userlist.add(user1);
        userlist.add(user2);
        assertEquals(user1,userlist.get(1));
    }

    @Test
    public void makeFriend(){
        user2=new User();
        user2.setId(3l);
        user2.setUsername("aish123");
        user2.setName("aish");
        user2.setFriends(user.getId());
//        user.setFriends(user1.getId());
        user.setFriends(user2.getId());
        userRepo.save(user2);
        userRepo.save(user);
//        userRepo.save(user1);
        assertEquals( user.getId(),user2.getFriends().get(0));
    }

    @Test
    public void deleteUser(){
        user2=new User();
        user2.setId(3l);
        user2.setUsername("aish123");
        user2.setName("aish");
        userRepo.save(user2);
        System.out.println("user to delete is saving "+user2.toString());
        User deleteuser=userRepo.findById(3l).get();
        System.out.println("deleted user "+deleteuser);
        userRepo.deleteUserByUsername(user2.getUsername());
        assertEquals(null,userRepo.existsByName(user2.getUsername()));
    }
    @Test
    public void deleteUserFriend(){
        user2=new User();
        user2.setId(3l);
        user2.setUsername("aish123");
        user2.setName("aish");
        user2.setFriends(user.getId());
        user.setFriends(user2.getId());
        userRepo.save(user2);
        userRepo.save(user);
        User deleteuser=userRepo.findById(user.getFriends().get(0)).get();
        System.out.println("deleted user "+deleteuser);
        userRepo.deleteUserfriendsByName(user.getUsername(),deleteuser.getUsername());
        user.friends.remove(user2.getId());
        user2.friends.remove(user.getId());
        userRepo.save(user);
        userRepo.save(user2);
        System.out.println(user.getFriends());
        System.out.println(deleteuser.getUsername());
        List<User> emptylist = new ArrayList<>();
        assertEquals(emptylist,user.getFriends());
    }
}