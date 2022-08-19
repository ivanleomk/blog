import { authors } from "@/constants/authors";
import fs from "fs";
import path from "path";
import { getAllIssues } from "./github";
import { slugify } from "./string";
import matter from "gray-matter";

export type githubAuthor = {
  name: string;
  image: string;
};

export type githubPost = {
  body: string;
  createdAt: string;
  labels: string[];
  slug: string;
  title: string;
  author: githubAuthor;
  attributes: {
    // Out of these attributes, we have two possible types, strings and string arrays. We want to support both
    [key: string]: string | string[];
  } | null;
};

const POST_CACHE_FILE = path.join(
  __dirname,
  "../",
  process.env.CACHE_FOLDER,
  process.env.POST_CACHE_FILE
);
const CACHE_FOLDER = path.join(__dirname, "../", process.env.CACHE_FOLDER);
const EXCLUDED_LABELS = ["published", "draft"];

if (!fs.existsSync(CACHE_FOLDER)) {
  fs.mkdirSync(CACHE_FOLDER);
}

export default async function getAllPosts(): Promise<githubPost[]> {
  let cachedData;

  try {
    cachedData = fs.readFileSync(POST_CACHE_FILE, "utf8");
    cachedData = JSON.parse(cachedData) as githubPost[];
  } catch (err) {
    cachedData = await getAllIssues();
    cachedData = cachedData.map((item) => {
      console.log(item);
      return {
        ...item,
        slug: slugify(item.title),
        //@ts-ignore
        labels: item.labels.nodes
          //@ts-ignore
          .map((label) => {
            return label.name;
          })
          //@ts-ignore
          .filter((label) => {
            return !EXCLUDED_LABELS.includes(label);
          }),
        author: getAuthor(),
        attributes: matter(item.body).data,
      };
    });
    fs.writeFileSync(POST_CACHE_FILE, JSON.stringify(cachedData), "utf8");
  }

  return cachedData;
}

export const getAllPostSlugs = async () => {
  const posts = await getAllPosts();
  return posts.map((post) => {
    return post.slug;
  });
};

const getAuthor = () => {
  const allAuthors = getAllAuthors();
  const randomIndex = Math.floor(Math.random() * allAuthors.length);
  const randomKey = allAuthors[randomIndex] as string;
  //@ts-ignore
  const chosenAuthor = authors[randomKey];
  return chosenAuthor;
};

export const getPost = async (slug: string) => {
  const posts = await getAllPosts();
  const result = posts.find((post) => {
    return post.slug === slug;
  });
  if (!result) {
    throw new Error("Invalid Post Slug");
  }

  return result;
};

export const getTagPosts = async (tag: string) => {
  const posts = await getAllPosts();
  return posts.filter((post) => {
    return post.labels.includes(tag);
  });
};

export const getAllAuthors = () => {
  const author_list = [...Object.keys(authors)];
  return author_list;
};
