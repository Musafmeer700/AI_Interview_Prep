import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/redux/store.js';
import { router } from '@/app/router/index.jsx';

export function AppProviders() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

