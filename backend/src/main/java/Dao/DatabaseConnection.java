package Dao;

import com.mongodb.MongoClient;

public class DatabaseConnection
{
    public static MongoClient mongoClient = new MongoClient("localhost", 27017);
}
