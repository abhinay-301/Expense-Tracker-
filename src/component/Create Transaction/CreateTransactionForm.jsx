import { useState } from "react"

const CreateTransactionForm = ({addTransaction})=>{
    const [formData,setFromData] = useState({
        type:"Expense",
        amount:0,
        category:"",
        description:"",
        data: new Date().toISOString().split("T")[0],
    });
    const categories = {
        Income: ["Salary","Gift","Other"],
        Expense: [
            "Food",
            "Entertainment",
            "Utilities",
            "Transportation",
            "Shopping",
            "Other"
        ],
    };
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFromData({...formData,[name]:value});
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log();
        addTransaction({
            ...formData,id:Date.now()
        });
    }
    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
                Create New Transation
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <div className="flex gap-4 mb-4">
                    <label className="flex items-center">
                        <input
                        type="radio"
                        name="type"
                        value="Expense"
                        checked={formData.type === "Expense"}
                        className="mr-2"
                        onChange={handleChange}
                        />
                        <span className="text-red-500 font-medium">Expense</span>
                    </label>
                    <label className="flex items-center">
                        <input
                        type="radio"
                        name="type"
                        value="Income"
                        checked={formData.type === "Income"}
                        className="mr-2"
                        onChange={handleChange}
                        />
                        <span className="text-green-500 font-medium">Income</span>
                    </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="amount" className="block text-gray-700 mb-2">
                        Amount
                    </label>
                    <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    required
                    onChange={handleChange}
                    />

                </div>

                <div>
                    <label htmlFor="category" className="block text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                    name="category"
                    id="category"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    onChange={handleChange}
                    >
                       <option value="">Select a category </option> 
                       {categories[formData.type].map((category)=>(
                        <option key={category} value={category}>{category}</option>
                       ))}
                    </select>

                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 mb-2">
                        Description
                    </label>
                    <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    required
                    onChange={handleChange}
                    />

                </div>

                <div>
                    <label htmlFor="date" className="block text-gray-700 mb-2">
                        Date
                    </label>
                    <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.Date}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    required
                    onChange={handleChange}
                    />

                </div>
                <button type="submit" className={`w-full p-2 px-4 rounded-md text-white font-medium ${
                    formData.type ==="Expense" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-red-600"
                }`}
                >
                    Add {formData.type == "Expense" ? "Expense" : "Income"}
                </button>
            </form>

        </div>
    )
}

export default CreateTransactionForm;