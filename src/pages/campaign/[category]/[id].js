import axios from "axios";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import pick from "lodash/pick";
import moment from "moment";
import numeral from "numeral";
import Router from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DonationList from "../../../components/Donation/DonationList";
import { useAuthDispatch, useAuthState } from "../../../context/auth";
import Breadcrumb from "../../../components/Breadcrumb";
import * as storage from "../../../lib/storage";

function Campaign({ campaign, donations,key }) {
  const [amount, setAmount] = useState(0);

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();
  
  function onAddToItem() {
    const item = pick(campaign, ["id", "title", "image"]);
    storage.setItem("item", item,true);
    dispatch("DONATE", item);
    !authenticated ? Router.push("/login") : Router.push({ pathname: '/make-donation',query: { amount:amount }});
  }
  return (
    <div>
      <Head>
        <title>{campaign.title}</title>
      </Head>
      <div className="container mx-auto">
        <Breadcrumb
          title={campaign.name}
          items={[
            { title: "Бүгд", url: "/campaigns" },
            // { title: (category || {}).name, url: `/campaign/${(category || {}).id}` },
          ]}
        />
        <div className="flex" key={key}>
          <div className="md:w-1/2 md:pr-5">
            <img src={campaign.image} />
          </div>
          <div className="md:w-1/2 md:pl-5">
            <Link href={`/campaigns/${campaign.category_id}`}>
              <a className="block mb-2 text-sm">{campaign.category_name}</a>
            </Link>
            <h3 className="mb-4 text-2xl font-bold">{campaign.title}</h3>
            <div className="text-sm font-semibold text-gray-500">
              <p className="h-16 truncate whitespace-normal">
                {" "}
                {campaign.summary}
              </p>
            </div>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                  <div
                    style={{
                      width: `${(campaign.raised * 100) / campaign.goal}%`,
                    }}
                    className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"
                  ></div>
                </div>
              </div>
              <div className="flex gap-5 text-sm leading-5 text-gray-500">
                <div className="process-pledged">
                  <span className="font-bold text-gray-800">
                    {campaign.donation_count}
                  </span>{" "}
                  xандив
                </div>
                <div className="process-pledged">
                  <span className="font-bold text-gray-800">
                    {" "}
                    {numeral(campaign.goal).format("0,0")}₮
                  </span>{" "}
                  зорилт
                </div>
                <div className="process-funded">
                  <span className="font-bold text-gray-800">
                    {numeral((campaign.raised * 100) / campaign.goal).format(
                      "0,0"
                    )}
                    %
                  </span>{" "}
                  цугларсан
                </div>
                <div className="font-bold text-gray-800">
                  {moment(campaign.created_at)
                    .locale("mn")
                    .startOf("day")
                    .fromNow()}
                </div>
              </div>
              <div className="mt-10">
                <p className="mb-2 font-bold">
                  Хандивлах дүн сонгох:{" "}
                  <span className="text-blue-600">{amount}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAmount(1000)}
                    className="donation-button"
                  >
                    <bdi>
                      1000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(5000)}
                    className="donation-button"
                  >
                    <bdi>
                      5000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(10000)}
                    className="donation-button"
                  >
                    <bdi>
                      10000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(20000)}
                    className="donation-button"
                  >
                    <bdi>
                      20000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(50000)}
                    className="donation-button"
                  >
                    <bdi>
                      50000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(100000)}
                    className="donation-button"
                  >
                    <bdi>
                      100000
                      <span>₮</span>
                    </bdi>
                  </button>
                  <button
                    onClick={() => setAmount(200000)}
                    className="donation-button"
                  >
                    <bdi>
                      200000
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
                  />{" "}
                  <button 
                  onClick={()=> onAddToItem()}
                  className="px-6 py-3 text-lg leading-5 rounded shadow blue button">
                    Хандив өгөх
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-5">
          <Tabs
           
          >
            <TabList className="font-bold">
              <Tab>Танилцуулга</Tab>
              <Tab>Хандивлагч</Tab>
            </TabList>

            <TabPanel>
              <div className="flex w-full pt-5 text-gray-600">
                <div
                  dangerouslySetInnerHTML={{ __html: campaign.description }}
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-gray-600 w-fll ">
                {donations.map((donation,key) => (
                  <DonationList donation={donation} key={key} />
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const id = ctx.params.id;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const campaignUrl = await axios.get(`/campaigns/detail/${id}`);
  const { campaign: campaign } = await campaignUrl.data;

  const donationUrl = await axios.get(`/donations/list?campaign_id=${id}`);
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
