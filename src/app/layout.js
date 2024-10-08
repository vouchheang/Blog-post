'use client'; // <-- Important
import { Provider } from 'react-redux';
import store from '../redux/store';
import "@/app/globals.css"
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
