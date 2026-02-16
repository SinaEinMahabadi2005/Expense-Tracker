
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const navigate = useNavigate();
//   const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;
  
//   const token=localStorage.getItem("token") || null;
//   useEffect(() => {
//     (async () => {
//      try {
//       const response=await fetch(`http://localhost:5000/api/transactions?userId=${id}`,{
//         method:"GET",
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       });
//       const data=await response.json();
//       setTransactions(data.data);
//       console.log(data)
//      } catch (error) {
//       console.log(error.message)
//      }
//     })();
//   }, []);

//   if (!transactions || transactions.length === 0) {
//     return (
//       <>
//       <p>Transaction is empty</p>
//         <button
//           onClick={() => {
//             navigate("/create-category");
//           }}
//         >
//           {" "}
//           Add New Transaction
//         </button>
//       </>
//     );
//   }
//   const items=transactions?.map((transaction)=>(
//     <div key={transaction._id}>
//       <h2>{transaction.title}</h2>
//       <p>{transaction.note}</p>
//       <p>{transaction.amount}</p>
//       <p>{transaction.type}</p>
//     </div>
//   ))
//   return (
//   <div>
//     <button onClick={() => navigate("/create-category")}> Add new Transactions </button>
//     <h1>Transactions</h1>
//     {items}
//   </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();
  const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;
  
  const token = localStorage.getItem("token") || null;
  useEffect(() => {
    (async () => {
     try {
      const response = await fetch(`http://localhost:5000/api/transactions?userId=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTransactions(data.data || []);
      console.log(data);
     } catch (error) {
      console.log(error.message);
     }
    })();
  }, [id, token]);

  // Filter transactions based on type
  const filteredTransactions = filterType === "all" 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  
  const totalExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  
  const balance = totalIncome - totalExpense;

  if (!transactions || transactions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/30 animate-pulse">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">No Transactions Yet</h2>
          <p className="text-gray-400 text-lg mb-8">Start tracking your income and expenses today</p>
          <button
            onClick={() => navigate("/create-category")}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create Your First Transaction
          </button>
        </div>
      </div>
    );
  }

  const items = filteredTransactions?.map((transaction, index) => (
    <div
      key={transaction._id}
      className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20 animate-fadeIn"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              {transaction.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              transaction.type === "income"
                ? "bg-green-900/50 text-green-400 border border-green-700"
                : "bg-red-900/50 text-red-400 border border-red-700"
            }`}>
              {transaction.type === "income" ? "💰 Income" : "💸 Expense"}
            </span>
          </div>
          {transaction.note && (
            <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
              {transaction.note}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${
            transaction.type === "income" ? "text-green-400" : "text-red-400"
          }`}>
            {transaction.type === "income" ? "+" : "-"}${parseFloat(transaction.amount).toFixed(2)}
          </p>
          {transaction.categoryId && (
            <div className="flex items-center gap-2 mt-2 justify-end">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: transaction.categoryId.color || "#ccc" }}
              ></div>
              <span className="text-xs text-gray-500">{transaction.categoryId.name}</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-500 flex items-center gap-2 mt-2 pt-2 border-t border-gray-800">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {new Date(transaction.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Transactions
                </span>
              </h1>
              <p className="text-gray-400 text-lg">Track all your financial activities</p>
            </div>
            <button
              onClick={() => navigate("/create-category")}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              New Transaction
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-600 transition-all duration-300 group">
              <p className="text-gray-400 text-sm mb-1">Total Income</p>
              <p className="text-3xl font-bold text-green-400 group-hover:scale-105 transition-transform duration-300">
                +${totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 group">
              <p className="text-gray-400 text-sm mb-1">Total Expense</p>
              <p className="text-3xl font-bold text-red-400 group-hover:scale-105 transition-transform duration-300">
                -${totalExpense.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 group">
              <p className="text-gray-400 text-sm mb-1">Balance</p>
              <p className={`text-3xl font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"} group-hover:scale-105 transition-transform duration-300`}>
                {balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                filterType === "all"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setFilterType("income")}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                filterType === "income"
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
              }`}
            >
              💰 Income ({transactions.filter(t => t.type === "income").length})
            </button>
            <button
              onClick={() => setFilterType("expense")}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                filterType === "expense"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
              }`}
            >
              💸 Expense ({transactions.filter(t => t.type === "expense").length})
            </button>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Showing:</span>
                <span className="text-white font-bold">{filteredTransactions.length}</span>
                <span className="text-gray-400">transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Total:</span>
                <span className={`font-bold ${totalIncome + totalExpense > 0 ? "text-green-400" : "text-red-400"}`}>
                  ${(totalIncome + totalExpense).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items}
        </div>

        {/* Footer Note */}
        {filteredTransactions.length > 0 && (
          <p className="text-center text-gray-500 text-sm mt-8">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}