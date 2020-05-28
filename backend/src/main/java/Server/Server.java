package Server;


import Dao.ItemsDao;
import Dto.Cart.CartDto;
import Dto.Items.ItemDto;
import Dto.Items.ItemListDto;
import Dto.Items.ItemResponseDto;
import Dto.Login.LoginDto;
import Dto.Login.LoginResponseDto;
import Dto.Transactions.AddTransactionDto;
import Dto.Transactions.TransactionsListDto;
import com.google.gson.Gson;

import Dao.CartDao;
import Dao.TransactionsDao;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static spark.Spark.*;

public class Server {
    public static List<String> transactions = new ArrayList<>();

    public static void main(String[] args)
    {
        // open connection
        MongoClient mongoClient = new MongoClient("localhost", 27017);
        // get ref to database
        MongoDatabase db = mongoClient.getDatabase("MyDatabase");
        // get ref to collection
        MongoCollection<Document> itemCollection = db.getCollection("Items"); //item collection
        MongoCollection<Document> userCollection = db.getCollection("Users"); //user collection

        port(1235);


        //Init Gson
        Gson gson = new Gson();

//        port(1235);
      post("/api/authenticate", (req, res) -> {
        String BodyString = req.body();
        System.out.println(BodyString);
        LoginDto loginDto = gson.fromJson(BodyString, LoginDto.class);
        String username = loginDto.username;
        String password = loginDto.password;
        List<Document> userDocument = userCollection.find(new Document("username", username))
          .into(new ArrayList<>());
        if(userDocument.size() != 1){
          LoginResponseDto loginResponseDto  =
            new LoginResponseDto(false, "User not found");
          return gson.toJson(loginResponseDto);
        }

        Document userDocument1 = userDocument.get(0); //should be 1
        if(!userDocument1.getString("password").equals((password))){
          LoginResponseDto loginResponseDto =
            new LoginResponseDto(false, "Password is incorrect");
          return gson.toJson(loginResponseDto);
        }

        Document userDocument2 = userDocument.get(0); //should be 1
        if (userDocument1.getString("username").equals(username) &&
          userDocument1.getString("password").equals(password)) {
          String usertype = userDocument2.getString("usertype");
          LoginDto loginDto1 = new LoginDto(username, password, usertype);
          return gson.toJson(loginDto1);
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto(true, null);
        return gson.toJson(loginResponseDto);

      });

      get("api/getUsers" , (req,res) -> {
        List<String> users = userCollection.find().into(new ArrayList<>())
          .stream()
          .map(document -> {
            return document.getString("username");
          })
          .collect(Collectors.toList());

        return gson.toJson(users);
      });

        post("api/addItem", (req, res) ->
        {
            String bodyString = req.body();
            ItemDto itemDto = gson.fromJson(bodyString, ItemDto.class);

            Document newItem = new Document()
                    .append("itemName", itemDto.itemName) //adds item name
                    .append("itemPrice", itemDto.itemPrice); //adds item price
            itemCollection.insertOne(newItem); //inserts into mongoDB item collection
            ItemResponseDto itemResponseDto = new ItemResponseDto(false, "item already exists");
            return gson.toJson(itemResponseDto);
        });

        get("api/getAllItems", (req, res) ->
        {
            ItemsDao itemsDao = ItemsDao.getInstance();
            ItemListDto list = itemsDao.getAllItems();
            System.out.println(gson.toJson(list));
            return gson.toJson(list);
        });

        post("api/deleteItem", (req, res) ->
        {
            String bodyString = req.body();
            ItemDto itemDto = gson.fromJson(bodyString, ItemDto.class);
            itemCollection.deleteOne(new Document("itemName", itemDto.itemName)); //finds item by name & deletes it
            return ("The item [" + itemDto.itemName + "] has been deleted from the DB.");
        });

        post("api/addTransaction", (req, res) -> {
            String bodyString = req.body();
            AddTransactionDto transactionDto = gson.fromJson(bodyString,
                    AddTransactionDto.class);
            // add it to the list
            TransactionsDao transactionsDao = TransactionsDao.getInstance();
            transactionsDao.addTransactions(transactionDto);
            //System.out.println(bodyString);
            System.out.println(transactions.size());
            return "OK";
        });
        get("api/getAllTransactions", (req, res) -> {
            TransactionsDao transactionsDao = TransactionsDao.getInstance();
            //NotesListDto list = new NotesListDto(notes);
            TransactionsListDto list = transactionsDao.getAllTransactions();
            //System.out.println(gson.toJson(list));
            return gson.toJson(list);
        });

        post("api/addToCart", (req, res) -> {
            String bodyString = req.body();
            ItemDto itemDto = gson.fromJson(bodyString,
                    ItemDto.class);
            // add it to the list
            CartDto cartDto = gson.fromJson(bodyString, CartDto.class);
            CartDao cartDao = CartDao.getInstance();
            cartDao.addToCart(itemDto, cartDto.total);
            System.out.println(bodyString);
            System.out.println(transactions.size());
            return "OK";
        });

        post("api/removeFromCart", (req, res) -> {

            CartDao cartDao = CartDao.getInstance();
            cartDao.removeAllFromCart();
            //System.out.println(bodyString);
            System.out.println(transactions.size());
            return "OK";
        });

        get("api/getFromCart", (req, res) -> {
            CartDao cartDao = CartDao.getInstance();
            //NotesListDto list = new NotesListDto(notes);
            //ItemListDto list = cartDao.getFromCart();
            ItemListDto list = cartDao.getFromCart();
            System.out.println(gson.toJson(list));
            return gson.toJson(list);
        });
    }


}
