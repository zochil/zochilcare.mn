import "../styles/globals.css";
import 'react-tabs/style/react-tabs.css';
import Axios from "axios";
import { AuthProvider } from "../context/auth";
import getConfig from "next/config";
import MainLayout from "../components/MainLayout";
import Router from "next/router";
import NProgress from "nprogress";

const {  publicRuntimeConfig: { API_URL }, } = getConfig();

Axios.defaults.baseURL = API_URL;

Router.events.on("routeChangeStart", (url) => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());


function App({ Component, pageProps }) {

  return (
    <AuthProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
