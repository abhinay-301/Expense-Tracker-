Here's a clear summary of **how global state management** is used in your React app to store and manage **transaction data**:

---

## 🌍 Global State Management – Summary

### ✅ **Purpose**

To **centrally store and manage transactions (data)** across multiple components **without prop drilling**.

---

### 🧱 1. **Context API** – Sets up the Global Store

* `createContext()` creates a **context container** (`TransactionContext`) that holds shared state and functions.
* `TransactionProvider` wraps your app and supplies the context value to all children components.

```js
<TransactionContext.Provider value={{ ... }}>
  {children}
</TransactionContext.Provider>
```

---

### 🔁 2. **useReducer** – Manages Complex State Logic

* `useReducer()` holds the current `state` and handles updates using `dispatch()` and a reducer function.
* The `reducer` listens to actions:

  * `ADD_TRANSACTION`: adds a new transaction to the array.
  * `DELETE_TRANSACTION`: removes a transaction by its `id`.

This keeps your logic clean and centralized:

```js
const [state, dispatch] = useReducer(transactionReducer, initialState);
```

---

### 🔄 3. **dispatch(action)** – Updates the State

Functions like `addTransaction()` and `deleteTransaction()` **dispatch actions** to the reducer:

```js
dispatch({ type: 'ADD_TRANSACTION', payload: {...} });
```

The reducer takes the current state + action and returns a new state.

---

### 🧠 4. **useContext + Custom Hook** – Easy Access to Global State

The custom hook `useTransaction()` wraps `useContext(TransactionContext)` to let any component access:

* The transaction data
* The add/delete functions
* The balance calculator

This allows components like `TransactionList` or `Balance` to use global state easily:

```js
const { transactions, addTransaction, deleteTransaction } = useTransaction();
```

---

### 🔁 5. **Components React Automatically**

When the context state updates (e.g., a new transaction is added), all subscribed components automatically **re-render** with the latest state — no manual syncing needed.

---

## 🔗 Full Flow

```plaintext
Component → useTransaction() 
  → gets data & functions from context
    → context wraps state managed by useReducer
      → state changes via dispatch(action)
        → reducer updates transactions array
          → all subscribed components re-render
```

---

### 🧩 Example:

* User adds a transaction
* `addTransaction()` is called → dispatches an action
* `transactionReducer` updates the global state
* `transactions` array updates
* UI re-renders automatically using updated data

---

Let me know if you'd like this visualized in a diagram or turned into code comments for easier reference.
