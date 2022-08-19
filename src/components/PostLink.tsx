import Link from "next/link";
import React from "react";
import { githubPostTitle } from "../utils/github";
import { slugify } from "../utils/string";
import dayjs from "dayjs";

type PostLinkProps = {
  post: githubPostTitle;
};

const PostLink = ({ post }: PostLinkProps) => {
  return (
    <Link href={`blog/${slugify(post.title)}`}>
      <div className=" py-3 pl-5">
        <p className="cursor-pointer hover:underline">
          {post.title} | {dayjs(post.createdAt).format("DD-MM-YYYY")}
        </p>
        <div className="ml-2 flex-shrink-0 flex"></div>
      </div>
    </Link>
  );
};

export default PostLink;
