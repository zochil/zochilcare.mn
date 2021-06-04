import Head from "next/head";
import { useState, useEffect } from "react";
import Axios from "axios";
import Grid from "../../components/Campaign/Grid";
import { useSWRInfinite } from "swr";
import Skeleton from "react-loading-skeleton";
import getConfig from "next/config";
import Link from "next/link";
import CategoryMenu from "../../components/CategoryMenu";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();
const fetcher = (url) => fetch(url).then((res) => res.json());

function index({ categories, campaigns }) {
 

  return (
    <div>
      <Head>
        <title>Dusal</title>
      </Head>
      <div>
        <div className="w-full h-40 bg-gradient-to-bl from-blue-100 via-blue-500 to-blue-300">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold text-white transition duration-500 transform hover:scale-110">
              Хамтдаа сайн сайхан ирээдүйг бий болгоё
            </h1>
          </div>
        </div>
        <div className="container flex items-center gap-5 px-2 mx-auto mt-8 text-gray-800 justify-items-start">
          <Link href="/campaigns">
            <a className="text-base font-semibold text-blue-600 border-b-2 border-blue-600">Бүгд</a>
          </Link>
          {categories.map((category) => (
            <CategoryMenu category={category} />
          ))}
        </div>
        <div className="grid flex-wrap grid-cols-1 gap-5 px-2 pb-5 mx-auto mt-8 lg:container sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
         

          {campaigns.map((campaign, key) => (
            <Grid campaign={campaign} key={key} />
          ))}
         
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const categoryUrl = await fetch(`${API_URL}/categories/list`);
  const { categories: categories } = await categoryUrl.json();

  const campaignsUrl = await fetch(`${API_URL}/campaigns/list`);
  const { campaigns: campaigns } = await campaignsUrl.json();
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  
  return {
    props: {
      categories,
      campaigns
    },
  };
}

export default index;
