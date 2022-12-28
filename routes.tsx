import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "components/Loadable";

// sample page routing
const HomePage = Loadable(lazy(() => import("views/pages/user/HomePage")));
const UsersPage = Loadable(lazy(() => import("views/pages/user/UsersPage")));
const OrdersPage = Loadable(lazy(() => import("views/pages/user/OrdersPage")));
const ServicesPage = Loadable(
  lazy(() => import("views/pages/user/ServicesPage"))
);
const InvoicePage = Loadable(
  lazy(() => import("views/pages/user/InvoicesPage"))
);
const SalesPage = Loadable(lazy(() => import("views/pages/user/SalesPage")));
const DraftsPage = Loadable(lazy(() => import("views/pages/user/DraftsPage")));
const StoragesPage = Loadable(
  lazy(() => import("views/pages/user/StoragesPage"))
);
const VendingSessionsPage = Loadable(
  lazy(() => import("views/pages/user/VendingSession"))
);
const MarketingPage = Loadable(
  lazy(() => import("views/pages/user/MarketingPage"))
);
const VouchersPage = Loadable(
  lazy(() => import("views/pages/user/VouchersPage"))
);
const SupplyingRoutesPage = Loadable(
  lazy(() => import("views/pages/user/SupplyingRoutesPage/index"))
);
const ProfilePage = Loadable(
  lazy(() => import("views/pages/user/ProfilePage"))
);
const CreateProductsPage = Loadable(
  lazy(() => import("views/pages/user/CreateProductsPage"))
);

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "store/slices/auth";
import SettingsTab from "components/settingsTab";
export const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectLoggedUser);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <ProtectedRoute>
      <SettingsTab />
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/users",
      element: <UsersPage />,
    },
    {
      path: "/orders",
      element: <OrdersPage />,
    },
    {
      path: "/services_page",
      element: <ServicesPage />,
    },
    {
      path: "/invoice",
      element: <InvoicePage />,
    },
    {
      path: "/dashboard-wh",
      element: <SalesPage />,
    },
    {
      path: "/storages",
      element: <StoragesPage />,
    },
    {
      path: "/drafts",
      element: <DraftsPage />,
    },
    {
      path: "/vending/sessions",
      element: <VendingSessionsPage />,
    },
    {
      path: "/marketing",
      element: <MarketingPage />,
    },
    {
      path: "/vouchers",
      element: <VouchersPage />,
    },
    {
      path: "/create-products",
      element: <CreateProductsPage />,
    },
    {
      path: "/supplying_routes",
      element: <SupplyingRoutesPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ],
};

export default MainRoutes;
