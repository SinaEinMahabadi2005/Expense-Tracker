// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import notify from "../../Utils/notify";

// export default function CategoryDetails() {
//   const { id } = useParams();
//   const token = localStorage.getItem("token");
//   const [category, setCategory] = useState();
//   const [transactions, setTransactions] = useState([]);
//   const [type, setType] = useState("income");
//   const [title, setTitle] = useState("");
//   const [note, setNote] = useState("");
//   const [amount, setAmount] = useState("");
//   const [mainTransactions, setMainTransactions] = useState([]);
//   const [update,setUpdate]=useState(true)
//   useEffect(() => {
//     (async () => {
//       try {
//         //part1
//         const res = await fetch(
//           `http://localhost:5000/api/categories?_id=${id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         const data = await res.json();
//         console.log(data.data[0]);
//         setCategory(data.data[0]);
//         //part2
//             // const resTwo = await fetch(`http://localhost:5000/api/exercises`);
//             // const dataTwo = await resTwo.json();
//             // setExercises(dataTwo.data);
//             // console.log(dataTwo.data);
//         //part3
//         const resThree = await fetch(
//           `http://localhost:5000/api/transactions?categoryId=${id}`,
//         );
//         const dataThree = await resThree.json();
//         setMainTransactions(dataThree.data);
//         console.log(dataThree.data);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, [update,id]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:5000/api/transactions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           categoryId: id,
//           title,
//           note,
//           amount, 
//           type,
//         }),
//       });
//       const data = await res.json();
//       console.log(data);
//       if (data.success) {
//         notify(
//           "success",
//         data.message
//         );
//         (setTitle(""), setAmount(""), setNote(""));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   //
//   const itemTwo = mainTransactions?.map((main) => (
//     <div key={main._id}>
//       <p>{main.title}</p>
//       <p>{main.note}</p>
//       <p>{main.amount}</p>
//       <p>{main.type}</p>
//       <p>{main.categoryId.name}</p>
//       <p>{main.categoryId.color}</p>
//       <p>{main.categoryId.type}</p>
//     </div>
//   ));
//   return (
//     <div>
//       <h2>Category : {category?.name}</h2>
//       <p>{category?.color}</p>
//       <p>{category?.type}</p>
//       {mainTransactions ? (
//         <></>
//       ) : (
//         <>
//           <p>This Category is Empty Please Add Transaction</p>
//           <button>Add Transaction</button>
//         </>
//       )}
//       <div>
//         {itemTwo}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <h1>Add new Transactions</h1>
//         <select
//           name="exercises"
//           id=""
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//         >
//           <option value="income">Income</option>
//           <option value="expense">Expense</option>
//         </select>
        
//         <input
//           type="text"
//           name=""
//           id=""
//           placeholder=" Please Enter Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           name=""
//           id=""
//           placeholder=" Please Enter Note"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//         />
//         <input
//           type="text"
//           name=""
//           id=""
//           placeholder=" Please Enter Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <button type="submit" onClick={()=>{setUpdate(!update)}}>Add Transaction</button>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../Utils/notify";

export default function CategoryDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState();
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("income");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [mainTransactions, setMainTransactions] = useState([]);
  const [update, setUpdate] = useState(true);
  const [showForm, setShowForm] = useState(false);
const navigate=useNavigate()
  useEffect(() => {
    (async () => {
      try {
        //part1
        const res = await fetch(
          `http://localhost:5000/api/categories?_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        console.log(data.data[0]);
        setCategory(data.data[0]);
        //part2
        // const resTwo = await fetch(`http://localhost:5000/api/exercises`);
        // const dataTwo = await resTwo.json();
        // setExercises(dataTwo.data);
        // console.log(dataTwo.data);
        //part3
        const resThree = await fetch(
          `http://localhost:5000/api/transactions?categoryId=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataThree = await resThree.json();
        setMainTransactions(dataThree.data || []);
        console.log(dataThree.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [update, id, token]);
  const deleteItemTwo=async()=>{
try {
  const res=await fetch(`http://localhost:5000/api/categories/${id}`,{
    method:"DELETE" ,
    headers:{
       "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
    }
  })
  const data=await res.json()
  if(data.success){
    notify("success",data.message)
    setUpdate(!update)
    console.log(data)
    navigate("/categories/all/all")

  }
  else{
     notify("error",data.message)
  }
} catch (error) {
  console.log(error.message)
}
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId: id,
          title,
          note,
          amount: parseFloat(amount),
          type,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        notify("success", data.message);
        setTitle("");
        setAmount("");
        setNote("");
        setUpdate(!update);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate totals
  const totalIncome = mainTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  
  const totalExpense = mainTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  
  const balance = totalIncome - totalExpense;

  const itemTwo = mainTransactions?.map((main) => (
    <div
      key={main._id}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-red-600 transition-all duration-300"
    >
        
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">{main.title}</h3>
          <p className="text-sm text-gray-400">{main.note}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-lg text-xs font-bold ${
            main.type === "income"
              ? "bg-green-900/50 text-green-400 border border-green-700"
              : "bg-red-900/50 text-red-400 border border-red-700"
          }`}
        >
          {main.type === "income" ? "💰" : "💸"} {main.type}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: main.categoryId?.color || "#ccc" }}
          ></div>
          <span className="text-sm text-gray-400">{main.categoryId?.name}</span>
        </div>
        <span
          className={`text-lg font-bold ${
            main.type === "income" ? "text-green-400" : "text-red-400"
          }`}
        >
          {main.type === "income" ? "+" : "-"}${parseFloat(main.amount).toFixed(2)}
        </span>
      </div>
    </div>
  ));

   
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        {category && (
          <div className="mb-8">
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-xl"
              style={{
                borderLeft: `6px solid ${category.color}`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {category.name}
                    </h1>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                      category.type === "income"
                        ? "bg-green-900/50 text-green-400 border border-green-700"
                        : "bg-red-900/50 text-red-400 border border-red-700"
                    }`}
                  >
                    {category.type === "income" ? "💰 Income" : "💸 Expense"} Category
                  </span>
                </div>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  {showForm ? "Close Form" : "Add Transaction"}
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2" onClick={()=>deleteItemTwo() }>Delete Category</button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {mainTransactions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-400">+${totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Total Expense</p>
              <p className="text-2xl font-bold text-red-400">-${totalExpense.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Balance</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"}`}>
                {balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Add Transaction Form */}
        {showForm && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                Add New Transaction
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Transaction Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                    >
                      <option value="income" className="bg-gray-800 text-green-400">💰 Income</option>
                      <option value="expense" className="bg-gray-800 text-red-400">💸 Expense</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Salary, Groceries, Rent"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Add a note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 px-4 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1 h-8 bg-red-600 rounded-full"></span>
              Transactions ({mainTransactions.length})
            </h2>
            {mainTransactions.length > 0 && (
              <p className="text-gray-400">
                Total: <span className="text-white font-bold">${(totalIncome + totalExpense).toFixed(2)}</span>
              </p>
            )}
          </div>

          {mainTransactions && mainTransactions.length > 0 ? (
            <div className="space-y-4">
              {itemTwo}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-800/20 rounded-2xl border border-gray-800">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Transactions Yet</h3>
              <p className="text-gray-400 mb-6">Start by adding your first transaction</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}