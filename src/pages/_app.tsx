import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';


import type { AppProps } from 'next/app';
import { SSRProvider } from '@react-aria/ssr';
import { Provider } from 'react-redux';
// import { NextUIProvider } from '@nextui-org/react';
import { store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);
  return (
    <SSRProvider>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          {/* <NextUIProvider> */}
          <Component {...pageProps} />
          {/* </NextUIProvider> */}
        </PersistGate>
      </Provider>

    </SSRProvider>
  );
}

export default MyApp
