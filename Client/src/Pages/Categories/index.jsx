// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function WorkoutsList() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();
//   const id = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))._id
//     : null;

//   const token = localStorage.getItem("token") || null;
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/categories?userId=${id}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//         const data = await response.json();
//         setCategories(data.data);
//         console.log(data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     })();
//   }, []);

//   if (!categories) {
//     return (
//       <>
//         <p> Category is Empty</p>
//         <button
//           onClick={() => {
//             navigate("/create-category");
//           }}
//         >
//           {" "}
//           Create New Category +
//         </button>
//       </>
//     );
//   }
//   const items = categories?.map((category) => (
//     <div key={category._id}>
//       <h2>{category.name}</h2>
//       <p>{category.color}</p>
//       <p>{category.type}</p>
//     </div>
//   ));
//   return (
//     <div>
//       <button onClick={() => navigate("/create-category")}>
//         Create a new Category{" "}
//       </button>
//       <h1>Categories</h1>
//       {items}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function WorkoutsList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))._id
    : null;

  const token = localStorage.getItem("token") || null;
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories?userId=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setCategories(data.data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/30">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Categories Found</h2>
          <p className="text-gray-400 mb-6">Start by creating your first category</p>
          <button
            onClick={() => {
              navigate("/create-category");
            }}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create New Category
          </button>
        </div>
      </div>
    );
  }

  const items = categories?.map((category) => (
    <div
      key={category._id}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xl font-bold text-white">{category.name}</h2>
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: category.color }}
        ></div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-400 flex items-center gap-2">
          <span className="w-20 text-sm">Color:</span>
          <span className="text-white font-mono">{category.color}</span>
        </p>
        <p className="text-gray-400 flex items-center gap-2">
          <span className="w-20 text-sm">Type:</span>
          <span
            className={`px-2 py-1 rounded-lg text-xs font-bold ${
              category.type === "income"
                ? "bg-green-900/50 text-green-400 border border-green-700"
                : "bg-red-900/50 text-red-400 border border-red-700"
            }`}
          >
            {category.type === "income" ? "💰 Income" : "💸 Expense"}
          </span>
        </p>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-gray-400">Manage your income and expense categories</p>
          </div>
          <button
            onClick={() => navigate("/create-category")}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create New Category
          </button>
        </div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No categories found</p>
          </div>
        )}

        {/* Summary Stats */}
        {categories && categories.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Total Categories</p>
              <p className="text-2xl font-bold text-white">{categories.length}</p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Income Categories</p>
              <p className="text-2xl font-bold text-green-400">
                {categories.filter((c) => c.type === "income").length}
              </p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Expense Categories</p>
              <p className="text-2xl font-bold text-red-400">
                {categories.filter((c) => c.type === "expense").length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}