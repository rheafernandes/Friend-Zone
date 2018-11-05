package com.stackroute.fullstackbackend.controller;


import com.stackroute.fullstackbackend.exceptions.UserAlreadyExistsException;
import com.stackroute.fullstackbackend.exceptions.UserNotFoundException;
import com.stackroute.fullstackbackend.model.User;
import com.stackroute.fullstackbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.jws.soap.SOAPBinding;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins="*")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;
    }



    @PostMapping("adduser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
     User user1;
     ResponseEntity responseEntity;
   try {
         user1 = userService.addUser(user);
        responseEntity = new ResponseEntity<String>("added succcessfully", HttpStatus.CREATED);
     }catch (UserAlreadyExistsException e){
        responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
     }
     return responseEntity;
    }

    @GetMapping("getuser")
    public ResponseEntity<?> getAllUser(){

        ResponseEntity responseEntity;
        try {
            List<User> user1=userService.getAllUsers();
            responseEntity = new ResponseEntity<List<User>>(user1, HttpStatus.OK);
        }catch (UserNotFoundException e){
            responseEntity = new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
        }
        return responseEntity;
    }



      @DeleteMapping("deleteuser/{username}")
       public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
        boolean user = false;
        ResponseEntity responseEntity;
        try {
            user = userService.deleteUserByUsername(username);
            responseEntity = new ResponseEntity<Boolean>(user, HttpStatus.OK);
        }catch(UserNotFoundException e){
           responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }
    @PutMapping("addfriend/{username1}/{username2}")
    public ResponseEntity<?> addFriend(@PathVariable("username1") String username1, @PathVariable("username2") String username2){
       boolean user1=false;
        ResponseEntity responseEntity;
      // if(user1) {
        try {
            user1=userService.addFriendByName(username1,username2);
            responseEntity = new ResponseEntity<String>("friend made", HttpStatus.CREATED);
        }
        catch(UserNotFoundException e){
            responseEntity = new ResponseEntity<String>("You are already a friend", HttpStatus.CONFLICT);
        }
           return responseEntity;
       //}

    }


    @GetMapping("recommendL1/{username}/{var}")
    public ResponseEntity<?> recommendFriend(@PathVariable("username") String userName, @PathVariable("var") int var){
        List<User> user1= userService.recommendLVar(userName, var);
        ResponseEntity responseEntity=new ResponseEntity<List<User>>(user1, HttpStatus.CREATED);
        return responseEntity;
    }


    @DeleteMapping("deleteuserfriend/{username1}/{username2}")
    public  ResponseEntity<?> deleteUserFriend(@PathVariable("username1") String username1,@PathVariable("username2") String username2)  throws UserNotFoundException{
        ResponseEntity responseEntity;
        User user=null;
        try {
            user = userService.deleteUserFriendsByName(username1, username2);
            responseEntity = new ResponseEntity<User>(user, HttpStatus.OK);
        }catch(UserNotFoundException e){
            responseEntity = new ResponseEntity<String>("This friend does not exist in your friend list", HttpStatus.CONFLICT);
        }
        return responseEntity;
    }


    @GetMapping("searchusers/{name}/{searchname}")
    public  ResponseEntity<?> searchUsersByName(@PathVariable("name") String name,@PathVariable("searchname") String input){
        ResponseEntity responseEntity;
        List<User> user = userService.searchUsersByName(name,input);
            responseEntity = new ResponseEntity<List<User>>(user, HttpStatus.OK);

        return responseEntity;
    }
    @GetMapping("getUserDetails/{username}")
    public ResponseEntity<?> getUserDetails(@PathVariable("username") String username){
        User user1=null;  ResponseEntity responseEntity;
        try {
            user1 = userService.getUserDetails(username);
         responseEntity = new ResponseEntity<User>(user1, HttpStatus.CREATED);
        }catch (UserNotFoundException e){
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }
    
    @GetMapping("getuserfriends/{username}")
    public ResponseEntity<?> getUserFriends(@PathVariable("username") String username)  {
        ResponseEntity responseEntity;


        List<User> user1 = userService.getUserFriends(username);
        responseEntity = new ResponseEntity<List<User>>(user1, HttpStatus.CREATED);

        return responseEntity;
    }


}
