import React from "react";

export type PostHeaderLink = {
  text: string;
  id: string;
  children: PostHeaderLink[];
};

type PostHeaderLinkProps = {
  links: PostHeaderLink[];
  activeId: string | undefined;
};

const PostHeaderLink = ({ links, activeId }: PostHeaderLinkProps) => {
  return (
    <>
      {links &&
        links.map(({ id, children, text }, index) => {
          return (
            <li className="mt-5" key={id}>
              <a
                className={id === activeId ? "text-blue-600" : ""}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  //@ts-ignore
                  document.querySelector(`#${id}`).scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {text}
              </a>
              <ul className="pl-10">
                {children.map((child, index) => {
                  return (
                    <PostHeaderLink
                      links={[child]}
                      activeId={activeId}
                      key={index}
                    />
                  );
                })}
              </ul>
            </li>
          );
        })}
    </>
  );
};

export default PostHeaderLink;
