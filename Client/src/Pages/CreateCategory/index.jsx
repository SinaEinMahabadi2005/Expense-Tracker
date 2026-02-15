// import React, { useState } from 'react'
// import notify from '../../Utils/notify';
// import { useNavigate } from 'react-router-dom';

// export default function CreateCategory() {
//   const token = localStorage.getItem('token')
//    const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;
// const [name, setName] = useState("");
// const [color, Setcolor] = useState("");
// const [type, setType] = useState("income");
// const navigate = useNavigate();
// const handleSubmit = async (e) => {
//    e.preventDefault();
//    try {
//     const res=await fetch("http://localhost:5000/api/categories",{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json",
//         "Authorization":`Bearer ${token}`
//       },
//       body:JSON.stringify({
//         name:name,
//         color:color,
//         type:type,
//         userId:id
//       })
//       })
//       const data = await res.json();
//       if(data.success){
//         notify("success","Category created successfully")
//         setName("")
//         Setcolor("")
//         setType("income")
//         navigate("/categories")

//       }
//    } catch (error) {
//     console.log(error)
//    }
// }
 
  
//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Create Category</h1>
//       <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Please Enter your Category Name"/>
//       <input type="text" name="color" id="color" value={color} onChange={(e) => Setcolor(e.target.value)}  placeholder="Please Enter your Category Color"/>
//       <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
//         <option value="income">Income</option>
//         <option value="expense">Expense</option>
//       </select>
//       <button type='submit'>Create Category</button>
//     </form>
//   )
// }
import React, { useState } from 'react'
import notify from '../../Utils/notify';
import { useNavigate } from 'react-router-dom';

export default function CreateCategory() {
  const token = localStorage.getItem('token')
   const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;
const [name, setName] = useState("");
const [color, setColor] = useState("");
const [type, setType] = useState("income");
const navigate = useNavigate();

const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    const res=await fetch("http://localhost:5000/api/categories",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        name:name,
        color:color,
        type:type,
        userId:id
      })
      })
      const data = await res.json();
      if(data.success){
        notify("success","Category created successfully")
        setName("")
        setColor("")
        setType("income")
        navigate("/categories/all/all")

      }
   } catch (error) {
    console.log(error)
   }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-red-900 to-transparent pointer-events-none"></div>

      <div className="relative w-full max-w-md">
        {/* Card Container */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 shadow-red-900/20">
          {/* Red Accent Line */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                Create New Category
              </h1>
              <p className="text-gray-400 text-sm mt-2">Add a new income or expense category</p>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {/* Category Name Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-red-400 transition-colors duration-300">
                  Category Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-5-5A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 group-hover:border-red-600/50"
                    placeholder="e.g., Salary, Groceries, Rent"
                    required
                  />
                </div>
              </div>

              {/* Color Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-red-400 transition-colors duration-300">
                  Category Color
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="color"
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 group-hover:border-red-600/50"
                      placeholder="#FF0000 or red"
                      required
                    />
                    {color && (
                      <div
                        className="w-12 h-12 rounded-xl border border-gray-700"
                        style={{ backgroundColor: color }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Type Select */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-red-400 transition-colors duration-300">
                  Category Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      ></path>
                    </svg>
                  </div>
                  <select
                    name="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 group-hover:border-red-600/50 appearance-none cursor-pointer"
                  >
                    <option value="income" className="bg-gray-800 text-green-400">💰 Income</option>
                    <option value="expense" className="bg-gray-800 text-red-400">💸 Expense</option>
                  </select>
                </div>
              </div>

              {/* Type Preview */}
              <div className="mt-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Selected Type:</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${
                  type === "income"
                    ? "bg-green-900/50 text-green-400 border border-green-700"
                    : "bg-red-900/50 text-red-400 border border-red-700"
                }`}>
                  {type === "income" ? "💰 Income" : "💸 Expense"}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/categories/all/all")}
                className="flex-1 py-3 px-4 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
              >
                Create
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Categories help you organize your{" "}
          <span className="text-red-400">transactions</span> better
        </p>
      </div>
    </div>
  )
}