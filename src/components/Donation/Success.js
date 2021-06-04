import React, { useEffect, useState } from "react";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import withSizes from "react-sizes";
import * as storage from "../../../src/lib/storage";
import QRCode from "qrcode.react";
import Skeleton from "react-loading-skeleton";
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
function Success({ isMobile,donationResult }) {
  const [Result, setResult] = useState();
  const {  loading } = useAuthState();

  
  console.log(donationResult);
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
    <div>
      <div className="my-20 leading-loose">
    
          <div className="max-w-xl p-10 m-4 bg-white rounded shadow-xl ">
            <p className="font-semibold text-center text-gray-800">
              {" "}
              Баярлалаа. Та шилжүүлэг ээ хийнэ үү.
            </p>
            <div className className="flex">
              <h2 className="w-full text-base font-semibold">
                {donationResult.invoice === "pending" && (
                  <ul className="list-group">
                    {donationResult.invoice.provider === "qpay" && (
                      <li className="list-group-item">
                        {isMobile &&
                          "Та өөрийн ашигладаг банкны аппликэйшний зурагтай товч дээр дарж төлбөрөө төлнө үү."}
                        {!isMobile &&
                          "Та өөрийн ашигладаг банкны аппликэйшний QPay гэсэн хэсэг рүү орж зүүн талын QR кодыг уншуулан төлбөрөө төлнө үү."}
                      </li>
                    )}{" "}
                  </ul>
                )}
              </h2>
            </div>
            <div className="mt-4">
              <ul className="list-group woocommerce-order-overview woocommerce-thankyou-order-details order_details">
                {!isMobile && (
                  <li className="woocommerce-order-overview__order list-group-item">
                    <div className="px-24">
                      <QRCode size={200} value={donationResult.invoice.qrcode} />
                    </div>
                  </li>
                )}
                {isMobile && (
                  <ul className="flex flex-wrap order-deeplinks list-group">
                    {(donationResult.invoice.deeplinks || [])
                      .filter((deeplink) => DEEP_LINKS_MAP[deeplink.name])
                      .map((deeplink) => (
                        <li className="list-group-item">
                          <a href={deeplink.link}>
                            <img
                              alt={deeplink.name}
                              src={`/images/banks/${
                                DEEP_LINKS_MAP[deeplink.name]
                              }.jpg`}
                            />
                          </a>
                        </li>
                      ))}
                  </ul>
                )}
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}

export default withSizes(({ width }) => ({
  isMobile: width < 998,
}))(Success);
