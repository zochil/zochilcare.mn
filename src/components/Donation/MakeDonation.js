import range from "lodash/range";
import Router from "next/router";
import classNames from "classnames";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import withSizes from "react-sizes";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as storage from "../../../src/lib/storage";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import Axios from "axios";
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
function MakeDonationComponent({ isMobile }) {
  const { user, item, donationResult,authenticated,loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      amount: router.query.amount,
      campaign_id: item.id,
      payment_method: "",
      phone: user.user.phone,
      message: "",
    },
    onSubmit: async (values) => {
      try {
        const accessToken = await storage.getItem("access_token");
        const res = await Axios.post(
          "/donations/make-donation",
          {
            ...values,
          },
          {
            headers: {
              "access-token": accessToken,
            },
          }
        );
        storage.setItem("donation_result", JSON.stringify(res.data));
        dispatch("DONATE_COMPLETE", res.data);
        router.push("/success");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <div className="leading-loose">
          {authenticated && <form
          className="max-w-xl p-10 m-4 bg-white rounded shadow-xl"
          onSubmit={formik.handleSubmit}
        >
          <p className="font-medium text-gray-800">Хандивлагч</p>
          <div className className="flex">
            <h2 className="w-full text-base font-semibold">
              {(user && user.user.first_name) || <Skeleton />}
            </h2>
            <span className="font-semibold">
              {" "}
              {(user && user.user.phone) || <Skeleton />}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex">
              {(item && (
                <img
                  className="object-cover w-16 h-16 rounded"
                  src={item.image}
                />
              )) || <Skeleton />}
              <div className="pl-2">
                <h2 className="font-semibold truncate">
                  {(item && item.title) || <Skeleton />}
                </h2>

                <div className="block text-sm text-gray-600 ">
                  Хандивлах дүн:{" "}
                  <span className="font-semibold text-green-600">
                    {router.query.amount}₮
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-600 " htmlFor="message">
              Захиа
            </label>
            <textarea
              rows={4}
              className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded"
              id="message"
              name="message"
              type="text"
              required
              placeholder="Сэтгэгдэлээ үлдээнэ үү"
              onChange={formik.handleChange}
              value={formik.values.message}
            />
          </div>
          <p className="mt-4 font-medium text-gray-800">Төлбөрийн хэрэгсэл</p>
          <ul className="flex flex-wrap">
            {Object.keys(PM_MAP).map((method) => (
              <li className="list-none">
                <input
                  type="radio"
                  className="input-radio"
                  onChange={formik.handleChange}
                  name="payment_method"
                  checked={formik.values.payment_method === PM_MAP[method]}
                  value={PM_MAP[method]}
                />

                <label className="pl-2">{PM_MAP[method]} </label>
                <div className="payment_box payment_method_bacs">
                  <img
                    className=""
                    src={`/images/banks/${PM_MAP[method]}.jpg`}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              className="px-4 py-1 font-light tracking-wider text-white bg-gray-900 rounded"
              type="submit"
            >
              {loading && <p>loading</p> } Хандив өгөх
            </button>
          </div>
        </form> }
        
      </div>
    </div>
  );
}

export default MakeDonationComponent;
