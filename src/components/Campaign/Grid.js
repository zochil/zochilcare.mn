import Link from "next/link";
import React from "react";
import moment from "moment";
import numeral from "numeral";

function grid({ campaign }) {
  return (
    <div className="w-full bg-gray-100 campaign-item">
      <Link href={`/campaign/${campaign.category_id}/${campaign.id}`}>
        <a className="overlay">
          <img
            className="object-cover w-full h-64"
            src={campaign.image}
            alt={campaign.title}
          />
        </a>
      </Link>

      <div className="px-5 py-5">
        <Link href={`/campaign/${campaign.category_id}/${campaign.category_id}`}>
          <a href="#" className="mb-2 text-xs font-semibold text-gray-500">
            Book
          </a>
        </Link>
        <h3 className="truncate">
          <Link href={`/campaign/${campaign.category_id}/${campaign.id}`}>
            <a className="text-lg font-bold text-gray-900">{campaign.title}</a>
          </Link>
        </h3>
        <div className="mt-2 text-sm font-semibold text-gray-500">
          <p className="h-16 truncate whitespace-normal"> {campaign.summary}</p>
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
          <div className="flex gap-5 text-xs leading-5 text-gray-700">
            <div className="process-pledged">
              <span className="font-bold">
                {" "}
                {numeral(campaign.goal).format("0,0")}₮
              </span>{" "}
              зорилт
            </div>
            <div className="process-funded">
              <span className="font-bold">
                {numeral((campaign.raised * 100) / campaign.goal).format("0,0")}
                %
              </span>{" "}
              цугларсан
            </div>
            <div className="font-bold">
              {moment(campaign.created_at)
                .locale("mn")
                .startOf("day")
                .fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default grid;
