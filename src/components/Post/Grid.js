import Link from "next/link";
import React from "react";
import moment from "moment";
import numeral from "numeral";

function grid({ post }) {

  return (
    <div key={post.id} className="w-full bg-gray-100 campaign-item">
      <Link href={`/posts/${post.id}`}>
        <a className="overlay">
          <img
            className="object-cover w-full h-64"
            src={post.image}
            alt={post.title}
          />
        </a>
      </Link>

      <div className="px-5 py-5">
        <h3 className="truncate">
          <Link href={`/posts/${post.id}`}>
            <a className="text-lg font-bold text-gray-900">{post.title}</a>
          </Link>
        </h3>
        <div className="mt-2 text-sm font-semibold text-gray-500">
          <p className="h-16 truncate whitespace-normal"> {post.summary}</p>
        </div>
        <div className="mt-4">
          <div className="flex gap-5 text-xs leading-5 text-gray-700">
            <div className="font-bold">
              {moment(post.created_at)
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
