import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';
import VéhiculePage from './pages/VéhiculePage';
import EditUser from './pages/EditUser';
import AddCollaborateur from './pages/AddCollaborateur';
import AddVehicule from './pages/AddVehicule';
import Collaborateur from './pages/Collaborateur';
import EditCollab from './pages/EditCollab';
import EditVehicule from './pages/EditVehicule';

import PrivateRouter from './components/Private/PrivateRouter';
import ForceRedirect from './components/ForceRedirect/ForceRedirect';
import { setUser } from './redux/actions/authActions';
import store from './redux/store';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import AffectationPage from './pages/affectation';
import ArchivedVéhiculePage from './pages/ArchivedVéhiculePage ';
import InfractionsPage from './pages/InfractionsPage';
import AddInfraction from './pages/AddInfraction';
import EditInfraction from './pages/EditInfraction';
import ArchivedInfractionPage from './pages/ArchivedInfractionPage';

import ArchivedAffectationPage from './pages/ArchivedAffectationPage';

// ----------------------------------------------------------------------

if (localStorage.jwt) {
  const decode = jwt_decode(localStorage.jwt);
  store.dispatch(setUser(decode));
}

export default function Router() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
  };
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <PrivateRouter user={user}>
          {' '}
          <DashboardLayout />
        </PrivateRouter>
      ),
      children: [
        {
          element: (
            <PrivateRouter user={user}>
              <Navigate to="/dashboard/app" />
            </PrivateRouter>
          ),
          index: true,
        },
        {
          path: 'app',
          element: (
            <PrivateRouter user={user}>
              <DashboardAppPage />
            </PrivateRouter>
          ),
        },
        {
          path: 'user',
          element: (
            <PrivateRouter user={user}>
              <UserPage />
            </PrivateRouter>
          ),
        },
        {
          path: 'user/:id',
          element: (
            <PrivateRouter user={user}>
              <EditUser />
            </PrivateRouter>
          ),
        }, // Ajoutez une nouvelle route pour EditUser
        {
          path: 'vehicule',
          element: (
            <PrivateRouter user={user}>
              <VéhiculePage />
            </PrivateRouter>
          ),
        } /* <ProductsPage /> */,
        {
          path: 'collaborateur',
          element: (
            <PrivateRouter user={user}>
              <Collaborateur />
            </PrivateRouter>
          ),
        } /* <BlogPage /> */,
        {
          path: 'addCollaborateur',
          element: (
            <PrivateRouter user={user}>
              <AddCollaborateur />
            </PrivateRouter>
          ),
        },
        {
          path: 'collab/:id',
          element: (
            <PrivateRouter user={user}>
              <EditCollab />
            </PrivateRouter>
          ),
        },
        {
          path: 'addvehicule',
          element: (
            <PrivateRouter user={user}>
              <AddVehicule />
            </PrivateRouter>
          ),
        },
        {
          path: 'addinfraction',
          element: (
            <PrivateRouter user={user}>
              <AddInfraction />
            </PrivateRouter>
          ),
        },

        {
          path: 'editvehicule/:id',
          element: (
            <PrivateRouter user={user}>
              <EditVehicule />
            </PrivateRouter>
          ),
        },
        {
          path: 'editInfractions/:id',
          element: (
            <PrivateRouter user={user}>
              <EditInfraction />
            </PrivateRouter>
          ),
        },
        {
          path: 'archived-vehicule',
          element: (
            <PrivateRouter user={user}>
              <ArchivedVéhiculePage />
            </PrivateRouter>
          ),
        },
        {
          path: 'archivedInfractions',
          element: (
            <PrivateRouter user={user}>
              <ArchivedInfractionPage />
            </PrivateRouter>
          ),
        },
        {
          path: 'Infractions',
          element: (
            <PrivateRouter user={user}>
              <InfractionsPage />
            </PrivateRouter>
          ),
        },
        {
          path: 'affectation',
          element: (
            <PrivateRouter user={user}>
              <AffectationPage />
            </PrivateRouter>
          ),
        },
        {
          path: 'archived-affectation',
          element: (
            <PrivateRouter user={user}>
              <ArchivedAffectationPage />
            </PrivateRouter>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: (
        <ForceRedirect user={user}>
          <LoginPage />,
        </ForceRedirect>
      ),
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
