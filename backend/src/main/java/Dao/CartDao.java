package Dao;
import Dto.Items.ItemDto;

import Dto.Items.ItemListDto;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import org.bson.Document;


import java.util.ArrayList;
import java.util.List;

public class CartDao
{
    private static CartDao cartInstance;

    private CartDao(){};

    public static CartDao getInstance()
    {
        if (cartInstance == null)
        {
            cartInstance = new CartDao();
        }
        return cartInstance;
    }

    public void addToCart(ItemDto dto, float total)
    {
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("TransactionDatabase");
        MongoCollection<Document> transactionsCollection = db.getCollection("Cart");
        Document newTransaction = new Document("item", dto.itemName)
                .append("price", dto.itemPrice)
                .append("total", total);
        transactionsCollection.insertOne(newTransaction);

    }

    public void removeAllFromCart()
    {
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("TransactionDatabase");
        MongoCollection<Document> transactionsCollection = db.getCollection("Cart");
        //db.getCollection("Cart").deleteMany(new Document("item", dto.item));

        MongoCursor<Document> cursor = transactionsCollection.find().iterator();
        while(cursor.hasNext())
        {
            transactionsCollection.deleteMany(cursor.next());
        }

        System.out.println("Delete from cart");
    }

    public ItemListDto getFromCart()
    {
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("TransactionDatabase"); // does need to exist already
        //collection gets automatically made
        MongoCollection<Document> transactionsCollection = db.getCollection("Cart");
        MongoCursor<Document> cursor = transactionsCollection.find().projection(Projections.excludeId()).iterator();

        List<Document> listTransactions = new ArrayList<Document>();

        while(cursor.hasNext())
        {
            listTransactions.add(cursor.next());
        }

        return new ItemListDto(listTransactions) ;
    }
}
