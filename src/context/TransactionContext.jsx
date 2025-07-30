import { Children, createContext,useContext,useReducer } from "react";
import { TRANSACTION_TYPES } from "../constants/transaction-types";

const TransactionContext = createContext();


const initialState = {
    transactions:[],
};

const transactionReducer = (state,action) =>{
    switch (action.type){
        case TRANSACTION_TYPES.ADD_TRANSACTION:
            return {
                ...state,
                transactions:[
                    ...state.transactions,
                    {...action.payload, id: Date.now()}
                ],
            };
        case TRANSACTION_TYPES.DELETE_TRANSACTION:
            return {
                ...state,
                transactions:state.transactions.filter(
                    (transaction) => transaction.id !==action.payload
                ),
            };
        default:
            return state;
    }
}

export const TransactionProvider = ({children})=>{
    const [state,dispatch] = useReducer(transactionReducer,initialState);
    const calculateBalances = ()=>{
        let income = 0;
        let expense = 0;
        state.transactions.forEach((transaction)=>{
            if(transaction.type === "Income"){
                income = parseFloat(transaction.amount) + income;
            }else{
                expense = parseFloat(transaction.amount) + expense; 
            }
        });
        return{
            income: income.toFixed(2),
            expense: expense.toFixed(2),
            balance: (income-expense).toFixed(2),
        }
    };
    const addTransaction = (transaction)=>{
        dispatch({type:TRANSACTION_TYPES.ADD_TRANSACTION,payload: transaction});
    };
    const deleteTransaction = (transaction)=>{
        dispatch({type:TRANSACTION_TYPES.DELETE_TRANSACTION, payload:transaction})
    };
    return (
        <TransactionContext.Provider
        value={{
            transactions: state.transactions,
            addTransaction,
            deleteTransaction,
            calculateBalances,
        }}
        >
            {children}
        </TransactionContext.Provider>
    )

};

export const useTransaction = ()=>{
    const context = useContext(TransactionContext);
    if(!context){
        throw new Error("useTransaction mus be used within a TransactionProvider");
    }
    return context;
}