import Head from "next/head";
import withSizes from "react-sizes";
import Skeleton from "react-loading-skeleton";
import { useAuthState } from "../context/auth";
import MainLayout from "../components/MainLayout";
import MakeDonationComponent from "../components/Donation/MakeDonation";

function MakeDonation() {
  const { loading } = useAuthState();
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

const MakeDonationWithSizes = withSizes(({ width }) => ({
  isMobile: width < 998,
}))(MakeDonation);

MakeDonationWithSizes.Layout = MainLayout;

export default MakeDonationWithSizes;
