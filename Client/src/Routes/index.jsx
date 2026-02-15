import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import PublicLayout from "../Layout/Public";
import Auth from "../Pages/Auth";
import PrivateLayout from "../Layout/Private";
import Profile from "../Pages/Profile";
import WorkoutsList from "../Pages/WorkoutsList";
import Exercises from "../Pages/Exercises";
import ExerciseDetails from "../Pages/ExerciseDetails";
import Reports from "../Pages/Reports";
import CreateWorkout from "../Pages/CreateWorkout";
import WorkoutDetails from "../Pages/WorkoutDetails";
import EditWorkout from "../Pages/EditWorkout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/auth",
            element: <Auth />,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/workoutlist",
            element: <WorkoutsList />,
          },
        ],
      },
      {
        path: "/exercises/:category/:musclegroup/:name",
        element: <Exercises />,
      },
       {
        path: "/create-workout",
        element: <CreateWorkout />,
      },
       {
        path: "/edit-workout/:id",
        element: <EditWorkout />,
      },
      {
        path: "/workout-details/:id",
        element: <WorkoutDetails />,
      },
      {
        path: "/exercise-details/:id/:name",
        element: <ExerciseDetails />,
      },
      //after this we can add more routes for products, cart, about, etc.
      {
        path:"/reports",
        element:<Reports />
      }
    ],
  },
]);
export default router;
