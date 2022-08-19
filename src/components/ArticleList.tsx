import { githubPost } from "@/utils/post";
import React from "react";
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  posts: githubPost[];
  limit: null | number;
};

const ArticleList = ({ posts, limit }: ArticleListProps) => {
  return (
    <div className="relative  pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w- mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
          {posts &&
            posts
              .slice(0, limit ? limit : posts.length)
              .map((post) => <ArticleCard key={post.slug} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
