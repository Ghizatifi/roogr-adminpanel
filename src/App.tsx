import { useEffect, useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import Guard from './components/guards/Guards';
import Users from './pages/users/users';
import Advertiser from './pages/users/advertiser';
import Customer from './pages/users/Customer';
import SignIn from './pages/Authentication/SignIn';
import LoginLayout from './layout/LoginLayout';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import arTranslation from './../src/locales/ar/translation.json';
import enTranslation from './../src/locales/en/translation.json';
import { useSelector } from 'react-redux';
import { selectLanguage } from './store/slices/language';
import Ads from './pages/advertisements/advertisements';
import Products from './pages/products/products';
import PrdDetials from './pages/products/PrdDetials';
import Profile from './pages/users/Profile';
import CategorySubscription from './pages/category_subscription/CategorySubscription';
import Admins from './pages/admins/Admins';
import Unauthorized from './pages/unauthorized/Unauthorized';
import ProtectedRoute from './components/guards/ProtectedRoute';
import MainSettings from './pages/settings/MainSettings';
import { store } from './store/store';
import ProductsMain from './pages/products/ProductsMain';
import ProductsSubscription from './pages/products/ProductsSubscription';
import MainCategories from './pages/categories/MainCategories';
import SubscriptionsCat from './pages/categories/SubscriptionsCat';
import CategoriesMap from './pages/categories/CategoriesMap';
import Charts from './pages/home/home';
import Home from './pages/home';
import verifaction_requestByStatus from './pages/verifaction_request/verifaction_requestByStatus';
import ChatReport from './pages/Reports/ChatReport';
import ProductReport from './pages/Reports/ProductReport';
import Inquiries from './pages/contactUs/Inquiries';
import Issues from './pages/contactUs/Issues';
import Suggestions from './pages/contactUs/Suggestions';
import BanUserList from './pages/BankList/BanUserList';
import BanProdList from './pages/BankList/BanProdList';
import BanChatsList from './pages/BankList/BanChatsList';
import UserChats from './pages/chats/UserChats';
import SingleChat from './pages/chats/SingleChat';
import Notfound from './pages/notfound/Notfound';
import ErrorElement from './pages/errorElement/ErrorElement';
import LogoutGuards from './components/guards/LogoutGuards';
import AddAdmin from './pages/admins/AddAdmin';
import activeUsers from './pages/users/activeCustomers';
import unactiveUsers from './pages/users/unactiveCustomers';
import lazyUsers from './pages/users/lazyCustomers';
import activeCustomers from './pages/users/activeCustomers';
import unactiveCustomers from './pages/users/unactiveCustomers';
import lazyCustomers from './pages/users/lazyCustomers';
import activeAdvertiser from './pages/users/activeAdvertiser';
import unactiveAdvertiser from './pages/users/unactiveAdvertiser';
import lazyAdvertiser from './pages/users/lazyAdvertiser';
const storedPermissions: any = store.getState().permissions.permissions;
const router = createHashRouter([
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      {
        path: '/auth/login',
        element: (
          <LogoutGuards>
            <SignIn />
          </LogoutGuards>
        ),
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <Guard>
        <DefaultLayout />
      </Guard>
    ),
    children: [
      {
        index: true,
        element: (
          <Guard>
            <ProtectedRoute
              component={Home}
              hasPermission={storedPermissions[1]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'charts',
        element: (
          <Guard>
            <ProtectedRoute
              component={Charts}
              hasPermission={storedPermissions[7]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'users',
        element: (
          <Guard>
            <ProtectedRoute
              component={Users}
              hasPermission={storedPermissions[7]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'profile/:id',
        element: (
          <Guard>
            <Profile />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'users/customer',
        element: (
          <Guard>
            <ProtectedRoute
              component={Customer}
              hasPermission={storedPermissions[9]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'activeCustomers',
        element: (
          <Guard>
            <ProtectedRoute
              component={activeCustomers}
              hasPermission={storedPermissions[8]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'unactiveCustomers',
        element: (
          <Guard>
            <ProtectedRoute
              component={unactiveCustomers}
              hasPermission={storedPermissions[9]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'lazyCustomers',
        element: (
          <Guard>
            <ProtectedRoute
              component={lazyCustomers}
              hasPermission={storedPermissions[9]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },

      {
        path: 'activeAdvertiser',
        element: (
          <Guard>
            <ProtectedRoute
              component={activeAdvertiser}
              hasPermission={storedPermissions[8]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'unactiveAdvertiser',
        element: (
          <Guard>
            <ProtectedRoute
              component={unactiveAdvertiser}
              hasPermission={storedPermissions[9]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'lazyAdvertiser',
        element: (
          <Guard>
            <ProtectedRoute
              component={lazyAdvertiser}
              hasPermission={storedPermissions[9]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'users/advertiser',
        element: (
          <Guard>
            <ProtectedRoute
              component={Advertiser}
              hasPermission={storedPermissions[9]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'ads',
        element: (
          <Guard>
            <ProtectedRoute
              component={Ads}
              hasPermission={storedPermissions[4]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: '/part/subscription',
        element: (
          <Guard>
            <ProtectedRoute
              component={CategorySubscription}
              hasPermission={storedPermissions[13]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: '/confirm/subscription',
        element: (
          <Guard>
            <ProtectedRoute
              component={verifaction_requestByStatus}
              hasPermission={storedPermissions[13]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'products',
        element: (
          <Guard>
            <ProtectedRoute
              component={Products}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'products/main',
        element: (
          <Guard>
            <ProtectedRoute
              component={ProductsMain}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'products/subscriptions',
        element: (
          <Guard>
            <ProtectedRoute
              component={ProductsSubscription}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'products',
        element: (
          <Guard>
            <Products />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        // Make the path relative, as it's nested under 'products'
        path: '/products/:id',
        element: (
          <Guard>
            <PrdDetials />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'admins',
        element: (
          <Guard>
            <ProtectedRoute
              component={Admins}
              hasPermission={storedPermissions[2]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'admins/edit-admin/:adminId',
        element: (
          <Guard>
            <ProtectedRoute
              component={AddAdmin}
              hasPermission={storedPermissions[2]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'settings',
        element: (
          <Guard>
            <ProtectedRoute
              component={MainSettings}
              hasPermission={storedPermissions[3]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'categories/main',
        element: (
          <Guard>
            <ProtectedRoute
              component={MainCategories}
              hasPermission={storedPermissions[10]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'categories/subscriptions',
        element: (
          <Guard>
            <ProtectedRoute
              component={SubscriptionsCat}
              hasPermission={storedPermissions[11]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'categories/map',
        element: (
          <Guard>
            <ProtectedRoute
              component={CategoriesMap}
              hasPermission={storedPermissions[12]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'contact-us/inquiries',
        element: (
          <Guard>
            <ProtectedRoute
              component={Inquiries}
              hasPermission={storedPermissions[15]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'contact-us/issues',
        element: (
          <Guard>
            <ProtectedRoute
              component={Issues}
              hasPermission={storedPermissions[16]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'contact-us/suggestions',
        element: (
          <Guard>
            <ProtectedRoute
              component={Suggestions}
              hasPermission={storedPermissions[17]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports',
        element: (
          <Guard>
            <ProtectedRoute
              component={Products}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports/product',
        element: (
          <Guard>
            <ProtectedRoute
              component={ProductReport}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports/chat',
        element: (
          <Guard>
            <ProtectedRoute
              component={ChatReport}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports/chat/search/:rc_search',
        element: (
          <Guard>
            <ProtectedRoute
              component={ChatReport}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports/chats/:userId',
        element: (
          <Guard>
            <ProtectedRoute
              component={UserChats}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports/chat/:chatId',
        element: (
          <Guard>
            <ProtectedRoute
              component={SingleChat}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'Ban/users',
        element: (
          <Guard>
            <ProtectedRoute
              component={BanUserList}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'Ban/chats',
        element: (
          <Guard>
            <ProtectedRoute
              component={BanChatsList}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'Ban/products',
        element: (
          <Guard>
            <ProtectedRoute
              component={BanProdList}
              hasPermission={storedPermissions[5]}
            />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },

      {
        path: 'unauthorized',
        element: (
          <Guard>
            <Unauthorized />
          </Guard>
        ),
        errorElement: <ErrorElement />,
      },
    ],
  },
  { path: '*', element: <Notfound /> },
]);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const language = useSelector(selectLanguage);
  i18next.init({
    interpolation: { escapeValue: false },
    lng: language,
    resources: {
      ar: { translation: arTranslation },
      en: { translation: enTranslation },
    },
  });
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <I18nextProvider i18n={i18next}>
      <div
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="bg-primaryBG-light dark:bg-primaryBG-dark text-text-light dark:text-text-dark"
      >
        <RouterProvider router={router} />
      </div>
    </I18nextProvider>
  );
};

export default App;
