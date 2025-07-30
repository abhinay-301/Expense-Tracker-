import { useTransaction } from "../../context/TransactionContext";
import TransactionCard from "../Transaction Cart/TransactionCard"

const TransactionList = ()=>{
    // {id,description,amount,type,category,date}
    const {transactions,deleteTransaction} = useTransaction()
    return (
        <div className="bg-white p-3 rounded-lg container mx-auto my-3">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Transaction History</h1>
            </div>
            <div className="mt-3 max-h-[65vh] overflow-y-auto pt-2">
                {transactions.map((transaction)=>(
                    <TransactionCard 
                    deleteTransaction={deleteTransaction}
                    key={transactions.id} 
                    transaction={transaction}
                    />
                ))}
            </div>
        </div>
    )
}

export default TransactionList;