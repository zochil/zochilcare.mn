import React from 'react'
import axios from "axios"
import Head from "next/head"
import Grid from "../../components/Post/Grid"
function index({posts}) {
    return (
        <div>
        <Head>
          <title>Мэдээ мэдээлэл</title>
        </Head>
        <div>
          <div className="w-full h-40 bg-gradient-to-bl from-blue-100 via-blue-500 to-blue-300">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-2xl font-bold text-white transition duration-500 transform hover:scale-110">
              Мэдээ мэдээлэл
              </h1>
            </div>
          </div>
          <div className="grid flex-wrap grid-cols-1 gap-5 px-2 pb-5 mx-auto mt-8 lg:container sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
           
  
            {posts.map((post, key) => (
              <Grid post={post} key={key} />
            ))}
           
          </div>
        </div>
      </div>
    )
}
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const postUrl = await axios.get(`/posts/list`);
    const { posts: posts } = await postUrl.data;
  
    // Pass post data to the page via props
    return { props: { posts } }
  }
export default index
