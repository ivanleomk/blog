export const getPostLinkWithSlug = (
  slug: string,
  absolute: boolean = false
) => {
  return `${absolute ? process.env.BASE_URL : ""}/articles/${slug}`;
};
