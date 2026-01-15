import { createBrowserRouter } from "react-router";
import Home from "../Layouts/Home/Home";

import AddIssues from "../Layouts/AddIssues/AddIssues";

import RootLayouts from "../Pages/RootsLayouts/RootLayouts";
import AllIssues from "../Layouts/AllIssues/AllIssues";
import AuthProvider from "../Context/AuthProvider";
import LogIn from "../Pages/Auth/LogIn";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayouts,
    children:[
      {
        index:true,
        Component:Home,
      },

      {
        path:'addissues',
        Component:AddIssues,     
      },

      {
        path:'/allissues',
        Component:AllIssues
      },

    ]
  },

 
  {
    
    path:'/',
    Component:AuthLayout,
    children:[
      {
        
        path:'login',
        Component:LogIn,
      },

      {
        path:'register',
        Component:Register,
      }
    ]

  }

  

  
    
  

  
]);