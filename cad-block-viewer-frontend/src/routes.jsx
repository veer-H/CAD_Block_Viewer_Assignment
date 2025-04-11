import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlocksPage from './pages/BlocksPage';
import BlockDetailPage from './pages/BlockDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/files/:fileId/blocks',
        element: <BlocksPage />
      },
      {
        path: '/blocks/:id',
        element: <BlockDetailPage />
      }
    ]
  }
]);