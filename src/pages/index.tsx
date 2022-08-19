import ArticleList from "@/components/ArticleList";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { getAllIssues } from "../utils/github";
import getAllPosts, { githubPost } from "../utils/post";
import { trpc } from "../utils/trpc";

type HomeProps = {
  posts: githubPost[];
};

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <Head>
        <title>{process.env.WEBSITE_NAME}</title>
        <meta
          property="og:title"
          content={process.env.WEBSITE_NAME}
          key="title"
        />
        <meta
          property="og:name"
          content={process.env.WEBSITE_NAME}
          key="name"
        />
        <meta
          property="og:description"
          content={process.env.WEBSITE_DESCRIPTION}
          key="description"
        />
      </Head>
      <Header />
      <ArticleList posts={posts} limit={2} />
    </>
  );
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
