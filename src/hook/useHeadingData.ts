import { useState, useEffect } from "react";
import { PostHeaderLink } from "../components/PostHeaderLink";
import { slugify } from "../utils/string";

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<PostHeaderLink[]>([]);

  useEffect(() => {
    document
      .querySelector("#content")
      ?.querySelectorAll("h1,h2")
      .forEach((elem, id) => {
        //@ts-ignore
        const newId = slugify(elem.outerText);
        elem.setAttribute("id", newId);

        //@ts-ignore
        elem.style.paddingTop = "30px";
      });

    // A bit kooky stuff, just ts-ignore and move on
    const headingElements = Array.from(
      //@ts-ignore
      document.querySelector("#content")?.querySelectorAll("h1,h2")
      //@ts-ignore
    ).reduce((acc, heading) => {
      //@ts-ignore
      const { nodeName, innerText } = heading;
      switch (nodeName) {
        case "H1":
          return [
            ...acc,
            { id: slugify(innerText), text: innerText, children: [] },
          ];
        case "H2":
          const newAcc = [...acc];
          //@ts-ignore
          newAcc[newAcc.length - 1].children.push({
            id: slugify(innerText),
            text: innerText,
            children: [],
          });
          return newAcc;
      }
    }, []);
    //@ts-ignore
    setNestedHeadings(headingElements);
  }, []);

  return { nestedHeadings };
};

export default useHeadingsData;
