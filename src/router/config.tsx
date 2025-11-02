
import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/page';
import AboutPage from '../pages/about/page';
import ContactPage from '../pages/contact/page';
import SystemPage from '../pages/system/page';
import ShopPage from '../pages/shop/page';
import ImpressumPage from '../pages/impressum/page';
import DatenschutzPage from '../pages/datenschutz/page';
import NotFoundPage from '../pages/NotFound';
import WarenkorbPage from '../pages/warenkorb/page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/ueber-uns',
    element: <AboutPage />,
  },
  {
    path: '/kontakt',
    element: <ContactPage />,
  },
  {
    path: '/system',
    element: <SystemPage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/impressum',
    element: <ImpressumPage />,
  },
  {
    path: '/datenschutz',
    element: <DatenschutzPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/warenkorb',
    element: <WarenkorbPage />
  }
];

export default routes;
