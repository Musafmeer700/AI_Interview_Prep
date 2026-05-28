import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/redux/store.js';
import { router } from '@/app/router/index.jsx';
import { ToastProvider } from '@/app/providers/ToastProvider.jsx';

export function AppProviders() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Provider>
  );
}
