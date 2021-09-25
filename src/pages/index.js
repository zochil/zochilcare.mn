import axios from "axios";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import pick from "lodash/pick";
import moment from "moment";
import numeral from "numeral";
import Router from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DonationList from "../components/Donation/DonationList";
import { useAuthDispatch, useAuthState } from "../context/auth";
import Breadcrumb from "../components/Breadcrumb";
import * as storage from "../lib/storage";
import getConfig from "next/config";
const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function Campaign({ campaign, donations, key }) {
  const [amount, setAmount] = useState("");
  const [invoiceNo, setinvoiceNo] = useState();
  

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  function onAddToItem() {
    const item = pick(campaign, ["id", "title", "image"]);
    storage.setItem("item", item, true);
    dispatch("DONATE", item);
    console.log(Router);
    if (!amount  ) {
      
      window.alert("Хандивлах дүн оруулна уу.");
    } else {
      
      Router.push({ pathname: "/make-donation", query: { amount: amount } });
    }
  }
 
  useEffect(() => {
    const intervalId = setInterval(async() => {  //assign interval to a variable to clear it.
      
      const result = await storage.getItem("donation_result");
      
      setinvoiceNo(JSON.parse(result))
      if (invoiceNo){
        const verifyUrl = await axios.get(`${API_URL}/invoices/webhook/qpay?invoiceid=${invoiceNo.invoice.invoiceno}`);
        // const verified = await verifyUrl.data;
        
        console.log(verifyUrl);
      }
      

    }, 5000)

    return () => clearInterval(intervalId); //This is important

  }, [invoiceNo])
  

  return (
    <div>
      <Head>
        <title>{campaign.title}</title>
        <meta name="description" content={campaign.title} />
        <meta property="og:title" content={campaign.title} />

        <meta property="og:site_name" content={campaign.name} />
        <meta property="og:url" content={`https://lilthuge.zochilcare.mn`} />
        <meta property="og:image" content={campaign.image} />
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=638416653249264&autoLogAppEvents=1"
          nonce="ezsUtt38"
        />
      </Head>
      <div className="container mx-auto">
        <div className="flex mb-5 md:hidden">
          <img className="w-full" src={campaign.image} />
        </div>
        <div className="flex flex-wrap px-3 md:px-0" key={key}>
          <div className="hidden md:block md:w-1/2 md:pr-5">
            <img className="w-full" src={campaign.image} />
          </div>

          <div className="md:w-1/2 md:pl-5">
            <div className="flex justify-between ">
              <h3 className="mb-4 text-2xl font-bold">{campaign.title}</h3>
              <div
                className="fb-share-button "
                data-href="https://lilthuge.zochilcare.mn"
                data-layout="button_count"
                data-size="large"
              >
                <a
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flilthuge.zochilcare.mn%2F&amp;src=sdkpreparse"
                  class="fb-xfbml-parse-ignore"
                >
                  Share
                </a>
              </div>
            </div>

            <div className="text-sm font-semibold text-gray-500">
              <p className="h-16 truncate whitespace-normal">
                {campaign.summary}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <div className="flex gap-1 process-pledged">

                </div>
                <div className="process-funded">
                  <span className="font-bold text-gray-800">
                    {Math.ceil((campaign.raised * 100) / campaign.goal)}%
                  </span>{" "}
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                  <div
                    style={{
                      width: `${(campaign.raised * 100) / campaign.goal}%`,
                      backgroundColor: "#7647ea",
                    }}
                    className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap"
                  ></div>
                </div>
              </div>
              <div className="flex justify-between gap-5 mt-5 leading-5 text-gray-500">
                <div className="process-funded">
                  <span
                    className="font-bold text-gray-800"
                    style={{
                      color: "#7647ea",
                    }}
                  >
                    {numeral(campaign.raised).format("0,0")}
                  </span>{" "}
                  цугларсан
                </div>
                <div className="process-pledged">
                  <span className="font-bold text-gray-800">
                    {" "}
                    {numeral(campaign.goal).format("0,0")}₮
                  </span>{" "}
                  зорилт
                </div>
              </div>
              <div className="mt-10">
                <p className="mb-2 font-bold">
                  Хандивлах дүн сонгох:{" "}
                  <span className="text-blue-600">
                    {" "}
                    {numeral(amount).format("0,0")}₮
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAmount(5000)}
                    className="donation-button"
                  >
                    <bdi>
                      5,000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(10000)}
                    className="donation-button"
                  >
                    <bdi>
                      10,000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(20000)}
                    className="donation-button"
                  >
                    <bdi>
                      20,000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(50000)}
                    className="donation-button"
                  >
                    <bdi>
                      50,000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(100000)}
                    className="donation-button"
                  >
                    <bdi>
                      100,000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(200000)}
                    className="donation-button"
                  >
                    <bdi>
                      200,000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <input
                    type="number"
                    placeholder="Өөр дүн оруулах"
                    name="amount"
                    className="donation-button"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  <button
                    onClick={() => onAddToItem()}
                    className="flex items-center justify-center w-full px-6 py-3 text-lg leading-5 text-center text-white rounded shadow md:w-48 button"
                    style={{
                      backgroundColor: "#7647ea",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-1 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div> Хандив өгөх </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-3 mt-5 md:px-0">
          <Tabs>
            <TabList className="font-bold">
              <Tab>Танилцуулга</Tab>
            </TabList>

            <TabPanel>
              <div className="flex w-full pt-5 text-gray-600">
                <div
                  dangerouslySetInnerHTML={{ __html: campaign.description }}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      )
    </div>
  );
}
export async function getServerSideProps(ctx) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const campaignUrl = await axios.get(`/campaigns/detail/50`);
  const { campaign: campaign } = await campaignUrl.data;

  const donationUrl = await axios.get(`/donations/list?campaign_id=50`);
  const { donations: donations } = await donationUrl.data;
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      campaign,
      donations,
    },
  };
}

export default Campaign;
