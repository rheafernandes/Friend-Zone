package com.stackroute.fullstackbackend.repository;

import com.stackroute.fullstackbackend.model.User;
import org.springframework.data.neo4j.annotation.EnableNeo4jAuditing;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

@EnableNeo4jRepositories
public interface UserRepo extends Neo4jRepository<User,Long> {

    @Query("MATCH (me:User)-[:friend]->(myFriend:User)-[:friend]->(friendOfFriend:User) WHERE NOT \n" +
            "(me)-[:friend]->(friendOfFriend:User) AND me.username = {username} AND NOT friendOfFriend.username={username}\n" +
            "RETURN \n" +
            " friendOfFriend")
    public List<User> recommendL1(@Param("username") String username);

    @Query("MATCH (me:User)-[:friend]->(myFriend:User)-[:friend]->(friendOfFriend:User)-[:friend]->(friendOfFriendOfFriend:User) WHERE NOT \n" +
            "(me)-[:friend]->(friendOfFriendOfFriend:User) AND NOT (me)-[:friend]->(friendOfFriend:User) AND me.username = {username} AND NOT friendOfFriendOfFriend.username={username}\n" +
            "RETURN \n" +
            " friendOfFriendOfFriend")
    public List<User> recommendL2(@Param("username") String username);

    @Query("MATCH (a:User),(b:User) WHERE a.username={userName1} AND b.username={userName2} CREATE(a)-[r:friend]->(b) CREATE(a)<-[f:friend]-(b) RETURN a")
    public User makeFriend(@Param("userName1") String userName1,@Param("userName2") String userName2);


    @Query("MATCH(n) RETURN n")
    public List<User> getAllUsers();

    @Query("MATCH(user:User) where user.username={username} detach delete user return user")
    public User deleteUserByUsername(@Param("username") String username);


//    @Query("MATCH(user:User{username:{username}}) detach delete user")
//    public boolean deleteUser(@Param("username") String username);

    @Query("MATCH(user:User)<-[r:friend]->(friend:User) where friend.username={username2} and user.username={username1} delete r return user")
    public User deleteUserfriendsByName(@Param("username1") String username1, @Param("username2") String username2);

//    @Query("MATCH(user:User)-[r:friend]->(friend:User) where user.username={username} return friend")
//    public List<User> getUserFriends(@Param("username")String username);

    @Query("MATCH(user:User) where user.username={username} return user")
    public User existsByName(@Param("username") String username);
//    @Query("MATCH(n) RETURN n")
//    public List<User> searchUsersByusername(@Param("username") String username);

    @Query("MATCH(a:User) WHERE a.username={username} return a")
    public User getUserDetails(@Param("username") String username);

}

