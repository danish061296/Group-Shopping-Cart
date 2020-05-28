package Dao;

import Dto.Items.ItemListDto;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class ItemsDao {

  private static ItemsDao itemsInstance;
  private ItemsDao(){};

  public static ItemsDao getInstance() {
    if (itemsInstance == null)
      itemsInstance = new ItemsDao();
    return itemsInstance;
  }

  public ItemListDto getAllItems() {
    MongoDatabase db = DatabaseConnection
      .mongoClient.getDatabase("MyDatabase"); // does need to exist already
    //collection gets automatically made
    MongoCollection<Document> storeItems = db.getCollection("Items"); //item collection
    MongoCursor<Document> cursor = storeItems.find().projection(Projections.excludeId()).iterator();

    List<Document> listItems = new ArrayList<Document>();

    while (cursor.hasNext())
      listItems.add(cursor.next());

    return new ItemListDto(listItems);
  }
}
