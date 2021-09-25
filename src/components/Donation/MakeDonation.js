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
  const { user, item, donationResult, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();
const [loading, setloading] = useState(false)
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      amount: router.query.amount,
      campaign_id: item.id,
      payment_method: "qpay",
      phone: "",
      message: "",
    },
    onSubmit: async (values) => {
      try {
        setloading(true)
        const res = await Axios.post("/donations/make-donation", {
          ...values,
        });
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
        <form
          className="max-w-xl m-4 bg-white rounded shadow-xl p-7"
          onSubmit={formik.handleSubmit}
        >
          <p className="mb-5 font-bold text-gray-800">Хандивлагч</p>
          <div className className="flex flex-wrap gap-4 ">
            <input
              className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded"
              id="full_name"
              name="full_name"
              type="text"
              required
              placeholder="Бүтэн нэр"
              onChange={formik.handleChange}
              value={formik.values.full_name}
            />

            <input
              className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded"
              id="phone"
              name="phone"
              type="phone"
              required
              placeholder="Утасны дугаар"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
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
                <h2 className="font-semibold">
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
         
          <button
            className="w-full px-4 py-1 font-light tracking-wider text-white bg-green-700 rounded"
            type="submit"
          >
            {loading ? <p>Уншиж байна...</p> :  "Хандив өгөх ❤️" }
          </button>
          <div className="mt-5 text-xs">
          Сайн үйлс дэлгэрэх болтугай
          </div>
        </form>
      </div>
    </div>
  );
}

export default MakeDonationComponent;
