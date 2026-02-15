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

  if (!categories) {
    return (
      <>
        <p> Category is Empty</p>
        <button
          onClick={() => {
            navigate("/create-category");
          }}
        >
          {" "}
          Create New Category +
        </button>
      </>
    );
  }
  const items = categories?.map((category) => (
    <div key={category._id}>
      <h2>{category.name}</h2>
      <p>{category.color}</p>
      <p>{category.type}</p>
    </div>
  ));
  return (
    <div>
      <button onClick={() => navigate("/create-category")}>
        Create a new Category{" "}
      </button>
      <h1>Categories</h1>
      {items}
    </div>
  );
}
