// import React from 'react'

// export default function Reports() {
//   return (
//     <div>
      
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [timeframe, setTimeframe] = useState('month');
  const [chartType, setChartType] = useState('bar');
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

  // Colors for charts
  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
  const INCOME_COLOR = '#10b981';
  const EXPENSE_COLOR = '#ef4444';

  // Process data for category breakdown
  const getCategoryData = () => {
    const categoryMap = new Map();
    
    transactions.forEach(t => {
      const categoryName = t.categoryId?.name || 'Uncategorized';
      const categoryColor = t.categoryId?.color || '#6b7280';
      const type = t.type;
      const amount = parseFloat(t.amount) || 0;
      
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, {
          name: categoryName,
          color: categoryColor,
          income: 0,
          expense: 0,
          total: 0
        });
      }
      
      const category = categoryMap.get(categoryName);
      if (type === 'income') {
        category.income += amount;
        category.total += amount;
      } else {
        category.expense += amount;
        category.total -= amount;
      }
    });
    
    return Array.from(categoryMap.values());
  };

  // Process data for daily/monthly trends
  const getTrendData = () => {
    const dateMap = new Map();
    
    transactions.forEach(t => {
      const date = new Date(t.createdAt);
      let key;
      
      if (timeframe === 'day') {
        key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else if (timeframe === 'week') {
        const weekNumber = Math.ceil(date.getDate() / 7);
        key = `Week ${weekNumber}`;
      } else {
        key = date.toLocaleDateString('en-US', { month: 'short' });
      }
      
      if (!dateMap.has(key)) {
        dateMap.set(key, {
          name: key,
          income: 0,
          expense: 0,
          balance: 0
        });
      }
      
      const dayData = dateMap.get(key);
      const amount = parseFloat(t.amount) || 0;
      
      if (t.type === 'income') {
        dayData.income += amount;
        dayData.balance += amount;
      } else {
        dayData.expense += amount;
        dayData.balance -= amount;
      }
    });
    
    return Array.from(dateMap.values()).sort((a, b) => {
      if (timeframe === 'month') {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.indexOf(a.name) - months.indexOf(b.name);
      }
      return 0;
    });
  };

  // Get summary statistics
  const getSummary = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
    const balance = totalIncome - totalExpense;
    
    const avgTransaction = transactions.length > 0 
      ? (totalIncome + totalExpense) / transactions.length 
      : 0;
    
    const largestIncome = Math.max(
      ...transactions.filter(t => t.type === 'income').map(t => parseFloat(t.amount) || 0),
      0
    );
    
    const largestExpense = Math.max(
      ...transactions.filter(t => t.type === 'expense').map(t => parseFloat(t.amount) || 0),
      0
    );
    
    return {
      totalIncome,
      totalExpense,
      balance,
      avgTransaction,
      largestIncome,
      largestExpense,
      transactionCount: transactions.length
    };
  };

  const categoryData = getCategoryData();
  const trendData = getTrendData();
  const summary = getSummary();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/30">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">No Data Available</h2>
          <p className="text-gray-400 text-lg mb-8">Add some transactions to see reports</p>
          <button
            onClick={() => navigate("/transactions/all")}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-1 transition-all duration-300"
          >
            Go to Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Financial Reports
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Comprehensive analysis of your financial activities</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-600 transition-all duration-300">
            <p className="text-gray-400 text-sm mb-1">Total Income</p>
            <p className="text-3xl font-bold text-green-400">+${summary.totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300">
            <p className="text-gray-400 text-sm mb-1">Total Expense</p>
            <p className="text-3xl font-bold text-red-400">-${summary.totalExpense.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300">
            <p className="text-gray-400 text-sm mb-1">Balance</p>
            <p className={`text-3xl font-bold ${summary.balance >= 0 ? "text-green-400" : "text-red-400"}`}>
              {summary.balance >= 0 ? "+" : "-"}${Math.abs(summary.balance).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300">
            <p className="text-gray-400 text-sm mb-1">Transactions</p>
            <p className="text-3xl font-bold text-white">{summary.transactionCount}</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-xs">Average Transaction</p>
            <p className="text-xl font-bold text-white">${summary.avgTransaction.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-xs">Largest Income</p>
            <p className="text-xl font-bold text-green-400">+${summary.largestIncome.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-xs">Largest Expense</p>
            <p className="text-xl font-bold text-red-400">-${summary.largestExpense.toFixed(2)}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setTimeframe('day')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                timeframe === 'day'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeframe('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                timeframe === 'week'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                timeframe === 'month'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                chartType === 'bar'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                chartType === 'line'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                chartType === 'area'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Area Chart
            </button>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Expense Trend */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-600 rounded-full"></span>
              Income vs Expense Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="income" fill={INCOME_COLOR} name="Income" />
                    <Bar dataKey="expense" fill={EXPENSE_COLOR} name="Expense" />
                  </BarChart>
                ) : chartType === 'line' ? (
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke={INCOME_COLOR} strokeWidth={2} />
                    <Line type="monotone" dataKey="expense" stroke={EXPENSE_COLOR} strokeWidth={2} />
                  </LineChart>
                ) : (
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="income" fill={INCOME_COLOR} stroke={INCOME_COLOR} fillOpacity={0.3} />
                    <Area type="monotone" dataKey="expense" fill={EXPENSE_COLOR} stroke={EXPENSE_COLOR} fillOpacity={0.3} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Balance Trend */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-600 rounded-full"></span>
              Balance Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown - Pie Chart */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-600 rounded-full"></span>
              Category Breakdown (Income)
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData.filter(c => c.income > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="income"
                  >
                    {categoryData.filter(c => c.income > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown - Expense Pie */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-600 rounded-full"></span>
              Category Breakdown (Expense)
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData.filter(c => c.expense > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="expense"
                  >
                    {categoryData.filter(c => c.expense > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Details Table */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-600 rounded-full"></span>
            Category Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Income</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Expense</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Net</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((cat, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-200">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                        <span className="text-white">{cat.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 text-green-400">+${cat.income.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 text-red-400">-${cat.expense.toFixed(2)}</td>
                    <td className={`text-right py-3 px-4 font-bold ${cat.total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {cat.total >= 0 ? '+' : '-'}${Math.abs(cat.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}