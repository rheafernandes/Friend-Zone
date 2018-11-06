package com.stackroute.fullstackbackend.model;

import org.neo4j.ogm.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@NodeEntity
public class User {
    @GraphId
    private Long id;
    private String username;
    private String name;
    private Integer age;
    private String birthdate;
    private String imageUrl;
    private String description;
    @Relationship(type = "friend")
    public List<Long> friends=new ArrayList<>();


    public User() {
    }

    public User(Long id, String username, String name, Integer age, String birthdate, String description, List<Long> friends, String imageUrl) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.age = age;
        this.birthdate = birthdate;
        this.description = description;
        this.imageUrl = imageUrl;
        this.friends =friends;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
        
    public List<Long> getFriends() {
        return friends;
    }

    public void setFriends(Long friend) {
        System.out.println("adding friend: "+this.friends.add(friend));;
        System.out.println(" user model " + this.friends);

    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(username, user.username) &&
                Objects.equals(name, user.name) &&
                Objects.equals(age, user.age) &&
                Objects.equals(birthdate, user.birthdate) &&
                Objects.equals(imageUrl, user.imageUrl) &&
                Objects.equals(description, user.description) &&
                Objects.equals(friends, user.friends);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, name, age, birthdate, imageUrl, description, friends);
    }

}

