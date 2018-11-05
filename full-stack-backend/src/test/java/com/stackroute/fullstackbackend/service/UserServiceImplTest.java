package com.stackroute.fullstackbackend.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.stackroute.fullstackbackend.exceptions.UserAlreadyExistsException;
import com.stackroute.fullstackbackend.exceptions.UserNotFoundException;
import com.stackroute.fullstackbackend.model.User;
import com.stackroute.fullstackbackend.repository.UserRepo;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
//
import static org.mockito.Mockito.when;

public class UserServiceImplTest {

    User user1, user2;

    @Mock
    UserRepo userRepo;

    @InjectMocks
    UserServiceImpl userService;
    List<User> list= null;
    Optional optional;
    List<Long> friendlist= new ArrayList<>();
    List<Long> friendlist2= new ArrayList<>();

    @Before
    public void setUp(){
        //Initialising the mock object
        MockitoAnnotations.initMocks(this);
        friendlist.add(2l);

    //friendlist2.add(4l);
      user1 = new User(1l,"noor123","noor",21,"23-11-96","some description",friendlist,null);
        user2 = new User(2l,"aish123","aish",21,"23-07-96","some description",friendlist2,null);
      list = new ArrayList<>();
        list.add(user1);
        list.add(user2);
        optional= Optional.of(user1);
        optional= Optional.of(user2);


    }

//    @Test
//    public void addUser() throws UserAlreadyExistsException {
//
//        when(userRepo.save((User)any())).thenReturn(user1);
//        User savedUser= userService.addUser(user1);
//        Assert.assertEquals(user1, savedUser);
//    }

    @Test
    public void getAllUsers() throws UserNotFoundException {

    when(userRepo.getAllUsers()).thenReturn(list);
    List<User> userList= userService.getAllUsers();
    Assert.assertEquals(list, userList);
    }
//
//    @Test
//    public void addFriendByName() {
//       when(userRepo.makeFriend(user1.getName(),user2.getName())).thenReturn(user1);
//       when(userRepo.save((user1))).thenReturn(user1);
//       when(userRepo.save((user2))).thenReturn(user2);
//       Boolean  b= userService.addFriendByName(user1.getName(), user2.getName());
//       Assert.assertEquals(true, b);
//   }

//    @Test
//    public void deleteUserByUsername() throws UserNotFoundException{
//        when(userRepo.deleteUserByUsername(user1.getUsername())).thenReturn(user1);
//        Boolean b= userService.deleteUserByUsername("noor123");
//        Assert.assertEquals(true, b);
//
//    }

    @Test
    public void recommendLVar() {

        when(userRepo.recommendL1(user1.getUsername())).thenReturn(list);
        List<User> users= userService.recommendLVar(user1.getUsername(), 1 );
        List<User> listuser=new ArrayList<>();
        listuser.add(user1);
        listuser.add(user2);
        Assert.assertEquals(users,listuser);
        when(userRepo.recommendL1(user1.getUsername())).thenReturn(list);
        List<User> users1= userService.recommendLVar(user1.getUsername(), 2 );
        Assert.assertEquals(users1,new ArrayList<>());
    }
//
//    @Test
//    public void deleteUserFriendsByName() throws UserNotFoundException {
//        when(userRepo.deleteUserfriendsByName(user1.getUsername(),user2.getUsername())).thenReturn(user1);
//        User u= userService.deleteUserFriendsByName("noor123","aish123");
//        Assert.assertEquals(u, user1);
//    }

    @Test
    public void getUserDetails() throws UserNotFoundException {
        when(userRepo.getUserDetails(user1.getUsername())).thenReturn(user1);
        User u= userService.getUserDetails("noor123");
        Assert.assertEquals(u, user1);
    }

}