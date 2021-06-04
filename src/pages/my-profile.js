import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSWRInfinite } from "swr";
import Skeleton from "react-loading-skeleton";
import getConfig from "next/config";
import { useAuthDispatch, useAuthState } from "../context/auth";
import * as storage from "../lib/storage";
import { useRouter } from "next/router";
import DonationList from "../components/Donation/DonationList";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function MyProfile() {
  const [donations, setDonations] = useState();
  const [isLoading, setIsLoading] = useState(false);



  const router = useRouter();
  const { authenticated, loading, user } = useAuthState();
  const dispatch = useAuthDispatch();

 
  if (authenticated && user) {
    useEffect(async () => {
      const accessToken = await storage.getItem("access_token");
      setIsLoading(true);
      const result = await axios(`${API_URL}/donations/my-donations`, {
        headers: {
          "access-token": accessToken,
        },
      }).catch((error) => {
        console.log(error);
      });
      setDonations(result.data.donations);
      setIsLoading(false);
    }, []);
  }

  if (isLoading)
    return (
      <div className="container mx-auto">
        {Array(2)
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
      </div>
    );

  return (
    <div>
      <Head>
        <title>Dusal</title>
      </Head>
      {authenticated && (
        <div className="container py-10 mx-auto">
          <div className="flex justify-center pb-10">
            <img
              src={user.avatar ? user.avatar : null}
              className="object-cover w-40 h-40 rounded-full"
              alt="username"
            />
            <div className="ml-10">
              <div className="flex items-center">
                <h2 className="block text-3xl font-light leading-relaxed text-gray-700">
                  {user.first_name}
                </h2>

                {user.is_verified && (
                  <button className="flex items-center px-2 py-1 ml-3 text-sm text-green-600 bg-transparent border border-green-600 rounded-full outline-none hover:bg-green-600 hover:text-white focus:outline-none">
                    <span className="block">Идэвхитэй</span>
                    <svg
                      className="block w-5 h-5 pl-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                )}
                <a
                  className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
              </div>
              <ul className="flex items-center justify-content-around">
                <li>
                  <span className="flex block text-base">
                    <span className="mr-2 font-bold">
                      {user.donation_count}
                    </span>{" "}
                    Хандив
                  </span>
                </li>

                <li>
                  <span className="flex block ml-5 text-base cursor-pointer">
                    <span className="mr-2 font-bold">
                      {user.petition_count}{" "}
                    </span>{" "}
                    Уриалга
                  </span>
                </li>
                <li>
                  <span className="flex block ml-5 text-base cursor-pointer">
                    <span className="mr-2 font-bold">{user.phone} </span>
                  </span>
                </li>
              </ul>
              <br />
              <div className>
                <span className="text-base">{user.full_name}</span>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300" />
          <article className="grid grid-cols-2 gap-5 mt-5">
            {donations &&
              donations.map((donation, key) => (
                <DonationList donation={donation} key={key} />
              ))}
          </article>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
