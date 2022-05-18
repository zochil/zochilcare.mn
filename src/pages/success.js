import axios from "axios";
import React,{useState,useEffect} from "react";
import withSizes from "react-sizes";
import { useAuthState } from "../context/auth";
import MainLayout from "../components/MainLayout";
import SuccessComponent from "../components/Donation/Success";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
const PM_MAP = {
  qpay: "qpay",
  // lend: "LendMN",
  // candy: "CandyPay",
  // socialpay: "socialpay",
  // mostmoney: "Most Money",
  // khan: "Хаан банк",
  // golomt: "Голомт банк",
  // state: "Төрийн банк",
  // tdb: "ХХБ",
  // xac: "Хас Банк",
  // ubcity: "Улаанбаатар хотын банк",
  // capitron: "Капитрон банк",
  // arig: "Ариг банк",
};

const DEEP_LINKS_MAP = {
  "Khan bank": "khan",
  "State bank": "state",
  "Trade and Development bank": "tdb",
  "Xac bank": "xac",
  "Most money": "mostmoney",
  "Ulaanbaatar city bank": "ubcity",
  "Capitron bank": "capitron",
  "Candy Pay": "candy",
};

function Success({ isMobile }) {
  const { loading } = useAuthState();
  const [Result, setResult] = useState()
  useEffect(() => {
    const result = typeof window !== 'undefined' ? localStorage.getItem('zochil_donation_result') : null
    setResult(JSON.parse(result))
  }, [])
  
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
    <div className="flex items-center justify-center mx-auto bg-gray-100 ">
      {Result && <SuccessComponent donationResult={Result} />}
    </div>
  );
}

const SuccessWithSizes = withSizes(({ width }) => ({
  isMobile: width < 998,
}))(Success);

SuccessWithSizes.Layout = MainLayout;

export async function getServerSideProps(ctx) {
  try {
    const domain = ctx.req.headers.host;
    const { data: campaign } = await axios.get(`/campaigns/by-domain/${domain}`);

    return {
      props: { campaign: campaign?.campaign || {} },
    };
  } catch(err) {
    console.error(err);
    console.log("RESPONSE: ",err.response?.data);
  }

  return {
    props: { campaign: {} },
  };
}


export default SuccessWithSizes;
