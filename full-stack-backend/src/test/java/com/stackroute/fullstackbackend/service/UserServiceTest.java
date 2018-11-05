package com.stackroute.fullstackbackend.service;

import com.stackroute.fullstackbackend.model.User;
import com.stackroute.fullstackbackend.repository.UserRepo;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.List;

import static org.junit.Assert.*;

public class UserServiceTest {

    @Mock
    UserRepo userRepo;
    @InjectMocks
    UserServiceImpl userService;
    List<User> list=null;

    @Before
    public void setUp() throws Exception {

        User user = new User();
        user.setUsername("swetha123");

    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void addUser() {

    }

    @Test
    public void getAllUsers() {
    }

    @Test
    public void addFriendByName() {
    }

    @Test
    public void deleteUserById() {
    }

    @Test
    public void deleteUserFriendsByName() {
    }
}