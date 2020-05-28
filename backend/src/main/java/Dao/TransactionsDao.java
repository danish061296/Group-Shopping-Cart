package Dao;

import Dto.Transactions.AddTransactionDto;
import Dto.Transactions.TransactionsListDto;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class TransactionsDao
{


    private static TransactionsDao transactionInstance;

    private TransactionsDao(){};

    public static TransactionsDao getInstance()
    {
        if (transactionInstance == null)
        {
            transactionInstance = new TransactionsDao();
        }
        return transactionInstance;
    }

    public void addTransactions(AddTransactionDto dto)
    {
        MongoDatabase db = DatabaseConnection.mongoClient.getDatabase("TransactionDatabase");
        MongoCollection<Document> transactionsCollection = db.getCollection("Transactions");
        Document newTransaction = new Document("item", dto.item)
                .append("price", dto.price)
                .append("total", dto.total)
                .append("transactionCode", dto.transactionCode);
        transactionsCollection.insertOne(newTransaction);

    }

    public TransactionsListDto getAllTransactions()
    {
        MongoDatabase db = DatabaseConnection.mongoClient.getDatabase("TransactionDatabase"); // does need to exist already
        //collection gets automatically made
        MongoCollection<Document> transactionsCollection = db.getCollection("Transactions");
        MongoCursor<Document> cursor = transactionsCollection.find().projection(Projections.excludeId()).iterator();

        List<Document> listTransactions = new ArrayList<Document>();

        while(cursor.hasNext())
        {
            listTransactions.add(cursor.next());
        }

        return new TransactionsListDto(listTransactions) ;
    }

}
