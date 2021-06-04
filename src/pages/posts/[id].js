import React from "react";
import axios from "axios";
import Head from "next/head";

function id({ post }) {
  
  return (
    <div>
      <Head>
        <title>Мэдээ мэдээлэл</title>
      </Head>
      <div className="container mx-auto">
          <h2 className="py-4 font-bold text-center">{post.title}</h2>
          <img src={post.image}  className="object-cover w-full"/>
          <div className="py-5" dangerouslySetInnerHTML={{ __html: post.body}} />
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const id = ctx.params.id;
  // Call an external API endpoint to get post.
  // You can use any data fetching library
  const postUrl = await axios.get(`/posts/detail/${id}`);
  const { post: post } = await postUrl.data;

  // By returning { props: post }, the Blog component
  // will receive `post` as a prop at build time
  return {
    props: {
      post,
    },
  };
}
export default id;
