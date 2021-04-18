import Head from "next/head";
import { useState, useEffect } from "react";
import Axios from "axios";
import Grid from "../components/Campaign/Grid";
import { useSWRInfinite } from "swr";
import Skeleton from "react-loading-skeleton";
import getConfig from "next/config";
import Link from "next/link";
import CategoryMenu from "../components/CategoryMenu";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();
const fetcher = (url) => fetch(url).then((res) => res.json());

function Home({ categories }) {
  const [observedPost, setObservedPost] = useState("");

  const [campaigns, setCampaigns] = useState([]);

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite(
    (index) => `${API_URL}/campaigns/list?page=${index + 1}`,
    (...args) => {
      return fetcher(...args).then((res) => {
        return res.campaigns;
      });
    }
  );

  const isInitialLoading = !data && !error;
  const posts = data ? [].concat(...data) : [];

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Reached bottom of post");
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return (
    <div>
      <Head>
        <title>Crowdfund</title>
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
            <a className="text-base font-semibold text-gray-800 ">
              Бүгд
            </a>
          </Link>
          {categories.map((category) => (
           <CategoryMenu category={category}/>
          ))}
        </div>
        <div className="grid flex-wrap grid-cols-1 gap-5 px-2 pb-5 mx-auto mt-8 lg:container sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          {isInitialLoading && (
            <>
              {Array(8)
                .fill()
                .map((item, index) => (
                  <div key={index}>
                    <Skeleton height={180} />
                    <p className="card-channel">
                      <Skeleton width={`60%`} />
                    </p>
                    <div className="card-metrics">
                      <Skeleton width={`40%`} />
                    </div>
                  </div>
                ))}
            </>
          )}

          {posts.map((campaign, key) => (
            <Grid campaign={campaign} key={key} />
          ))}
          {isValidating && posts.length > 0 && (
            <p className="text-lg text-center">Loading More..</p>
          )}
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${API_URL}/categories/list`);
  const { categories: categories } = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      categories,
    },
  };
}

export default Home;
