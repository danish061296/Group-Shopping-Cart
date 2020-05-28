package Dto.Transactions;

import java.util.List;


import org.bson.Document;

public class TransactionsListDto
{
    public final List<Document> transactions;

    public TransactionsListDto(List<Document> transactions)
    {
        this.transactions = transactions;
    }
}
