package Dto.Items;

import org.bson.Document;
import java.util.List;

public class ItemListDto {

  public final List<Document> items;

  public ItemListDto(List<Document> items) {
    this.items = items;
  }
}
