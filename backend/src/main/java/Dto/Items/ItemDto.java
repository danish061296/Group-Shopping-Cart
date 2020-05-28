package Dto.Items;

//from front-end to back-end
public class ItemDto {
  public final String itemName;
  public final String itemPrice;

  public ItemDto(String itemName, String itemPrice) {
    this.itemName = itemName;
    this.itemPrice = itemPrice;
  }
}
