import { useEffect, useState, lazy, Suspense, type ReactNode } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import Guard from './components/guards/Guards';
import LoginLayout from './layout/LoginLayout';
import LandingLayout from './layout/LandingLayout';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { useSelector } from 'react-redux';
import { selectLanguage } from './store/slices/language';
import ProtectedRoute from './components/guards/ProtectedRoute';
import LogoutGuards from './components/guards/LogoutGuards';

// Lazy-loaded pages
const Users = lazy(() => import('./pages/users/users'));
const Advertiser = lazy(() => import('./pages/users/advertiser'));
const Customer = lazy(() => import('./pages/users/Customer'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const LandingHome = lazy(() => import('./pages/landing/LandingHome'));
const AboutUs = lazy(() => import('./pages/landing/AboutUs'));
const HowToDeleteAccount = lazy(() => import('./pages/landing/HowToDeleteAccount'));
const PrivacyPolicy = lazy(() => import('./pages/landing/PrivacyPolicy'));
const Ads = lazy(() => import('./pages/advertisements/advertisements'));
const Products = lazy(() => import('./pages/products/products'));
const PrdDetials = lazy(() => import('./pages/products/PrdDetials'));
const Profile = lazy(() => import('./pages/users/Profile'));
const CategorySubscription = lazy(() => import('./pages/category_subscription/CategorySubscription'));
const Admins = lazy(() => import('./pages/admins/Admins'));
const Unauthorized = lazy(() => import('./pages/unauthorized/Unauthorized'));
const MainSettings = lazy(() => import('./pages/settings/MainSettings'));
const ProductsMain = lazy(() => import('./pages/products/ProductsMain'));
const ProductsSubscription = lazy(() => import('./pages/products/ProductsSubscription'));
const MainCategories = lazy(() => import('./pages/categories/MainCategories'));
const SubscriptionsCat = lazy(() => import('./pages/categories/SubscriptionsCat'));
const CategoriesMap = lazy(() => import('./pages/categories/CategoriesMap'));
const Charts = lazy(() => import('./pages/home/home'));
const Home = lazy(() => import('./pages/home'));
const verifaction_requestByStatus = lazy(() => import('./pages/verifaction_request/verifaction_requestByStatus'));
const ChatReport = lazy(() => import('./pages/Reports/ChatReport'));
const ProductReport = lazy(() => import('./pages/Reports/ProductReport'));
const Inquiries = lazy(() => import('./pages/contactUs/Inquiries'));
const Issues = lazy(() => import('./pages/contactUs/Issues'));
const Suggestions = lazy(() => import('./pages/contactUs/Suggestions'));
const BanUserList = lazy(() => import('./pages/BankList/BanUserList'));
const BanProdList = lazy(() => import('./pages/BankList/BanProdList'));
const BanChatsList = lazy(() => import('./pages/BankList/BanChatsList'));
const UserChats = lazy(() => import('./pages/chats/UserChats'));
const SingleChat = lazy(() => import('./pages/chats/SingleChat'));
const Notfound = lazy(() => import('./pages/notfound/Notfound'));
const ErrorElement = lazy(() => import('./pages/errorElement/ErrorElement'));
const AddAdmin = lazy(() => import('./pages/admins/AddAdmin'));
const AdminProfile = lazy(() => import('./pages/admins/AdminProfile'));
const activeCustomers = lazy(() => import('./pages/users/activeCustomers'));
const unactiveCustomers = lazy(() => import('./pages/users/unactiveCustomers'));
const lazyCustomers = lazy(() => import('./pages/users/lazyCustomers'));
const activeAdvertiser = lazy(() => import('./pages/users/activeAdvertiser'));
const unactiveAdvertiser = lazy(() => import('./pages/users/unactiveAdvertiser'));
const lazyAdvertiser = lazy(() => import('./pages/users/lazyAdvertiser'));

const RouteSuspense = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

const router = createHashRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      { index: true, element: <RouteSuspense><LandingHome /></RouteSuspense> },
      { path: 'about-us', element: <RouteSuspense><AboutUs /></RouteSuspense> },
      { path: 'how-to-delete-account', element: <RouteSuspense><HowToDeleteAccount /></RouteSuspense> },
      { path: 'privacy-policy', element: <RouteSuspense><PrivacyPolicy /></RouteSuspense> },
    ],
  },
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      {
        path: 'auth/login',
        element: (
          <RouteSuspense>
            <LogoutGuards>
              <SignIn />
            </LogoutGuards>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
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
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Home}
                permissionIndex={1}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'charts',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Charts}
                permissionIndex={7}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'users',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Users}
                permissionIndex={7}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'profile/:id',
        element: (
          <RouteSuspense>
            <Guard>
              <Profile />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'users/customer',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Customer}
                permissionIndex={9}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'activeCustomers',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={activeCustomers}
                permissionIndex={8}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'unactiveCustomers',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={unactiveCustomers}
                permissionIndex={9}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'lazyCustomers',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={lazyCustomers}
                permissionIndex={9}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'activeAdvertiser',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={activeAdvertiser}
                permissionIndex={8}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'unactiveAdvertiser',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={unactiveAdvertiser}
                permissionIndex={9}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'lazyAdvertiser',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={lazyAdvertiser}
                permissionIndex={9}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'users/advertiser',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Advertiser}
                permissionIndex={9}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'ads',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Ads}
                permissionIndex={4}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: '/part/subscription',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={CategorySubscription}
                permissionIndex={13}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: '/confirm/subscription',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={verifaction_requestByStatus}
                permissionIndex={13}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'products',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Products}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'products/main',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={ProductsMain}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'products/subscriptions',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={ProductsSubscription}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: '/products/:id',
        element: (
          <RouteSuspense>
            <Guard>
              <PrdDetials />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'admins',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Admins}
                permissionIndex={2}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'admins/profile/:adminId',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={AdminProfile}
                permissionIndex={2}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'admins/edit-admin/:adminId',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={AddAdmin}
                permissionIndex={2}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'settings',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={MainSettings}
                permissionIndex={3}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'categories/main',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={MainCategories}
                permissionIndex={10}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'categories/subscriptions',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={SubscriptionsCat}
                permissionIndex={11}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'categories/map',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={CategoriesMap}
                permissionIndex={12}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'contact-us/inquiries',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Inquiries}
                permissionIndex={15}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'contact-us/issues',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Issues}
                permissionIndex={16}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'contact-us/suggestions',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Suggestions}
                permissionIndex={17}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'reports',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={Products}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'reports/product',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={ProductReport}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'reports/chat',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={ChatReport}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'reports/chat/search/:rc_search',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={ChatReport}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'reports/chats/:userId',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={UserChats}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'reports/chat/:chatId',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={SingleChat}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'Ban/users',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={BanUserList}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'Ban/chats',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={BanChatsList}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'Ban/products',
        element: (
          <RouteSuspense>
            <Guard>
              <ProtectedRoute
                component={BanProdList}
                permissionIndex={5}
              />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
      {
        path: 'unauthorized',
        element: (
          <RouteSuspense>
            <Guard>
              <Unauthorized />
            </Guard>
          </RouteSuspense>
        ),
        errorElement: <RouteSuspense><ErrorElement /></RouteSuspense>,
      },
    ],
  },
  { path: '*', element: <RouteSuspense><Notfound /></RouteSuspense> },
]);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const language = useSelector(selectLanguage);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return loading ? (
    <Loader />
  ) : (
    <I18nextProvider i18n={i18n}>
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
