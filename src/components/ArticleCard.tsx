import { githubPost } from "@/utils/post";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPostLinkWithSlug } from "@/utils/post_client";

type ArticleCardProps = {
  post: githubPost;
};

const FallbackURLs = [
  "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
  "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
];

const generateRandomFallbackURL = () => {
  return FallbackURLs[Math.floor(Math.random() * FallbackURLs.length)];
};

const ArticleCard = ({ post }: ArticleCardProps) => {
  const { title, labels, author, attributes, slug } = post;

  return (
    <Link href={`articles/${slug}`}>
      <div key={title} className="flex flex-col rounded-lg ">
        <div className="flex-shrink-0">
          <img
            className="rounded-lg w-full object-cover"
            src={
              attributes?.imageURL
                ? attributes.imageURL
                : generateRandomFallbackURL()
            }
            alt="Image URL"
          />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              {labels.map((item) => {
                return (
                  <span key={item} className="hover:outline">
                    {item}
                  </span>
                );
              })}
            </p>

            <div href={post.href} className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
              <p className="mt-3 text-base text-gray-500">{post.description}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <Image
              className="rounded-full h-10 w-10"
              src={author.image}
              alt="Author Image"
              height={30}
              width={30}
            />
            <span className="mx-4 text-md">{author.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
