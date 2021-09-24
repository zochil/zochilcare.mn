import { useAuthDispatch, useAuthState } from "../context/auth";
import withSizes from "react-sizes";
import MakeDonationComponent from "../components/Donation/MakeDonation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginComponent from "../components/Login";
import Skeleton from "react-loading-skeleton";
import Head from "next/head";

function MakeDonation() {
  const { loading, authenticated } = useAuthState();
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen mx-auto bg-gray-100">
        <div className="flex items-center justify-center w-full mx-auto leading-loose">
          <div className="w-1/4 p-10 m-4 bg-white rounded shadow-xl">
            <div style={{ width: "100%" }}>
              <Skeleton count={8} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Donate</title>
      </Head>
    <div className="flex items-center justify-center mx-auto bg-gray-100 ">
     
      <MakeDonationComponent />
      
    </div>
    </>
  );
}

export default withSizes(({ width }) => ({
  isMobile: width < 998,
}))(MakeDonation);
