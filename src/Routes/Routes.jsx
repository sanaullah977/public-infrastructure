import { createBrowserRouter } from "react-router";
import Home from "../Layouts/Home/Home";
import AddIssues from "../Layouts/AddIssues/AddIssues";
import RootLayouts from "../Pages/RootsLayouts/RootLayouts";
import AllIssues from "../Layouts/AllIssues/AllIssues";
import AuthProvider from "../Context/AuthProvider";
import LogIn from "../Pages/Auth/LogIn";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import IssueDetails from "../Layouts/AllIssues/IssueDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyIssue from "../Component/MyIssues/MyIssue";
import PrivateRouter from "./PrivateRouter";
import Profile from "../Component/Dashboard/Common/Profile";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AdminStatistics from "../Component/Dashboard/Sidebar/Statistics/AdminStatistics";
import ManageUsers from "../Component/Dashboard/Admin/ManageUsers";
import StaffeRequests from "../Component/Dashboard/Admin/StaffeRequests";
// import Payment from "../Component/Payment/Payment";
import PaymentHistory from "../Component/Payment/PaymentHistory";
import PaymentSuccess from "../Component/Payment/PaymentSuccess";
import MyPayment from "../Component/Payment/MyPayment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch(
            `https://public-infrastructure-system-server.vercel.app/issues`,
          ),
      },
      {
        path: "allissues",
        Component: AllIssues,
        loader: () =>
          fetch(
            `https://public-infrastructure-system-server.vercel.app/issues`,
          ),
      },
      {
        path: "addissues",
        element: (
          <PrivateRouter>
            <AddIssues />
          </PrivateRouter>
        ),
      },
      {
        path: "issuedetails/:id",
        element: (
          <PrivateRouter>
            <IssueDetails />
          </PrivateRouter>
        ),
      },

      {
        path: "my-payment",
        element:(
          <PrivateRouter>
            <MyPayment/>
          </PrivateRouter>
        ),
      //  loader: () =>
      //     fetch(
      //       `https://public-infrastructure-system-server.vercel.app/payment`,
      //     ),
      },

      {
        path: "myissue",
        element: (
          <PrivateRouter>
            <MyIssue />
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <DashboardLayout />
          </PrivateRouter>
        ),
        children: [
          {
            index: true,
            element: <AdminStatistics />,
          },
          {
            path: "profile",
            element: (
              <PrivateRouter>
                <Profile />
              </PrivateRouter>
            ),
          },

          {
            path: "payment-history",
            Component: PaymentHistory,
            loader: () =>
              fetch(
                `https://public-infrastructure-system-server.vercel.app/payment`,
              ),
          },

          {
            path: "manage-users",
            Component: ManageUsers,
          },
          {
            path: "staffe-requests",
            Component: StaffeRequests,
          },
          
        ],
      },

      {
        path: "/payment",
        Component: PaymentSuccess,
      },

      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
