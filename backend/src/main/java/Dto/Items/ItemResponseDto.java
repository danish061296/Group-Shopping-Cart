package Dto.Items;

public class ItemResponseDto {
  public final Boolean success;
  public final String error;

  public ItemResponseDto(Boolean success, String error) {
    this.success = success;
    this.error = error;
  }


}
