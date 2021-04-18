import React from 'react'
import QRCode from "qrcode.react";
import withSizes from "react-sizes";
import { useAuthDispatch, useAuthState } from "../context/auth";
import LoginComponent from "../components/Login"
import SuccessComponent from "../components/Donation/Success"
import Skeleton from "react-loading-skeleton";
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

function Success({isMobile}) {

  const { user, item, donationResult,authenticated, loading } = useAuthState();
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
  
      {!!authenticated && <SuccessComponent />}
      {!authenticated && <LoginComponent/>}
    </div>
    )
}

export default withSizes(({ width }) => ({
  isMobile: width < 998,
}))(Success);
