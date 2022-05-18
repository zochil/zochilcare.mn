import "../styles/globals.css";
import 'react-tabs/style/react-tabs.css';

import axios from "axios";
import Router from "next/router";
import NProgress from "nprogress";
import getConfig from "next/config";
import { AuthProvider } from "../context/auth";

const {  publicRuntimeConfig: { API_URL }, } = getConfig();
axios.defaults.baseURL = API_URL;

Router.events.on("routeChangeStart", (url) => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const Noop = ({ children }) => <div>{children}</div>;

function App({ Component, pageProps }) {
  const MainLayout = Component.Layout || Noop;
  return (
    <AuthProvider>
      <MainLayout pageProps={pageProps} >
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
