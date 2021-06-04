import React from "react";
import moment from "moment";
import classNames from "classnames";

function DonationList({ donation,key }) {
  const { full_name, amount, created_at, message, status } = donation;

  return (
    <div key={key} className="flex flex-wrap items-center justify-between px-4 py-2 mt-5 text-sm bg-white rounded-lg shadow cursor-pointer dark:bg-gray-600">

      <div className="flex items-center justify-between">
  
        <img
          className="object-cover w-12 h-12 rounded-full"
          src="/images/user-placeholder.png"
          alt=""
        />
        <div className="flex flex-col ml-4 text-gray-600 capitalize dark:text-gray-400">
          <span className="mt-2 text-black dark:text-gray-200">
            {full_name}
          </span>
        </div>
        <div className="flex flex-col ml-12 text-gray-600 capitalize dark:text-gray-400">
          <span className="mt-2 font-bold text-black dark:text-gray-200">
            {amount}
            <span>₮</span>
          </span>
        </div>
      </div>
      <div className="flex items-center pl-4">
        {/* Rigt side */}
        <div className="flex flex-col mr-16 text-gray-600 capitalize dark:text-gray-400">
          <span className="mt-2 text-black dark:text-gray-200">{message}</span>
        </div>
        <div className="flex flex-col mr-16 text-gray-600 capitalize dark:text-gray-400">
        <span
                      className={classNames("mt-2", {
                        " text-red-500 rounded ":
                          status === "pending",
                        "text-green-500 rounded ":
                          status === "verified",
                        "text-yellow-500 rounded":
                          status === "cancelled",
                      })}
                    >
                      {status === "pending" && "Баталгаажаагүй"}
                      {status === "verified" && "Амжилттай"}
                      {status === "cancelled" && "цуцлагдсөн"}
                    </span>
        </div>
        <div className="flex flex-col mr-8 text-gray-600 capitalize dark:text-gray-400">
          <span className="mt-2 text-green-500 dark:text-green-200">
            
            { moment(created_at).format('YYYY-MM-DD HH:mm') }
          </span>
        </div>
      </div>
    </div>
  );
}

export default DonationList;
