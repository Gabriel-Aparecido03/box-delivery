import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { AuthLayout } from "../components/layout/auth-layout";
import { LoginAsDeliveryman } from "../pages/login-as-deliveryman";
import { DeliverymansControl } from "../pages/deliverymans-control";
import { RecipientsControl } from "../pages/recipients-control";
import { PackagesControl } from "../pages/packages-control";
import { AppLayout } from "../components/layout/app-layout";
import { MyPackages } from "../pages/my-packages";
import { NearOfMe } from "../pages/near-of-me";
import { DeliverymanLayout } from "../components/layout/deliveryman-layout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/deliveryman',
        element: <LoginAsDeliveryman />
      }
    ]
  },
  {
    path: '/dashboard/control',
    element: <AuthLayout />,
    children: [
      {
        path: '/dashboard/control/deliverymans',
        element: <DeliverymansControl />
      },
      {
        path: '/dashboard/control/recipients',
        element: <RecipientsControl />
      },
      {
        path: '/dashboard/control/packages',
        element: <PackagesControl />
      }
    ]
  },
  {
    path: '/dashboard/deliveryman',
    element: <DeliverymanLayout />,
    children: [
      {
        path: '/dashboard/deliveryman/my-packages',
        element: <MyPackages />
      },
      {
        path: '/dashboard/deliveryman/near-of-me',
        element: <NearOfMe />
      }
    ]
  },
])