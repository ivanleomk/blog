import React from "react";

type PostContentProps = {
  title: string;
  createdAt: string;
  content: string;
};

const PostContent = ({ title, createdAt, content }: PostContentProps) => {
  return (
    <div className="col-span-4 flex items-center justify-center flex-col">
      <p className="mb-5 text-sm xltext-2xl font-extrabold">{title}</p>
      <p className="mb-5 text-md  ">Published at {createdAt}</p>
      <hr className="h-4 w-40" />
      <div className="prose-sm max-w-md xl:prose-lg ">
        <div id="content">
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostContent;
