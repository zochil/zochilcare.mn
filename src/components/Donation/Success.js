import React, { useEffect, useState } from "react";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import withSizes from "react-sizes";
import * as storage from "../../../src/lib/storage";
import QRCode from "qrcode.react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import getConfig from "next/config";
import { useRouter } from "next/router";
const {
  publicRuntimeConfig: { API_URL },
} = getConfig();
function Success({ isMobile,donationResult }) {
  const [Result, setResult] = useState();
  const {  loading } = useAuthState();

  const [invoiceNo, setinvoiceNo] = useState();

  const router = useRouter()

  useEffect(() => {
    const intervalId = setInterval(async() => {  //assign interval to a variable to clear it.
      
      const result = await storage.getItem("donation_result");
      
      setinvoiceNo(JSON.parse(result))
      if (invoiceNo){
        const verifyUrl = await axios.get(`${API_URL}/invoices/webhook/qpay?invoiceid=${invoiceNo.invoice.invoiceno}`);
        const verifiedData = await verifyUrl.data;
        
        setResult(verifiedData)
      }
      

    }, 3000)

    return () => clearInterval(intervalId); //This is important

  }, [invoiceNo])

  
  if(Result && Result.success === true){
    router.push("/")
  }

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
  // console.log(campaign.deeplink);
  return (
    <div>
      <div className="my-20 leading-loose">
    
          <div className="max-w-xl p-10 m-4 bg-white rounded shadow-xl ">
            <p className="font-semibold text-center text-gray-800">
              {" "}
              {isMobile &&
                          "Та өөрийн ашигладаг банкны аппликэйшний зурагтай товч дээр дарж төлбөрөө төлнө үү."}
                        {!isMobile &&
                          "Та өөрийн ашигладаг банкны аппликэйшний QPay гэсэн хэсэг рүү орж зүүн талын QR кодыг уншуулан төлбөрөө төлнө үү."}
             
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
                  <ul className="flex grid flex-wrap grid-cols-3 gap-5 order-deeplinks list-group">
                    {(donationResult.invoice.deeplinks || [])
                      .map((deeplink) => (
                        <li className="list-group-item">
                          <a href={deeplink.link}>
                            <img
                              alt={deeplink.name}
                              src={deeplink.logo}
                              className="w-full rounded-2xl"
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
