package Dto.Transactions;

public class AddTransactionDto
{
    public final String item;
    public final String price;
    public final String transactionCode;
    public final String total;

    public AddTransactionDto(String price, String item, String transactionCode, String total)
    {
        this.price = price;
        this.item = item;
        this.transactionCode = transactionCode;
        this.total = total;

    }
}
