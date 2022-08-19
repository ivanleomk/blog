import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

const getIssues = async (
  index: number,
  count: number,
  cursor: string | null
) => {
  const { repository } = await graphqlWithAuth(`
  { 
    repository(owner: "${process.env.GITHUB_USERNAME}", name: "${
    process.env.GITHUB_REPO_NAME
  }") {
    issues(first:${count}${index > 0 ? `,after:"${cursor}"` : ""}) {
      edges {
        node {
            number
            title
            createdAt
            body
            labels(first: 3) {
                nodes{
                    name
                }
            }
        }
      cursor    
      }
    
    }
  
  }
}`);

  const issues = repository.issues.edges.map((item: any) => {
    return {
      ...item,
    };
  });

  const newCursor = issues[issues.length - 1].cursor;

  return [issues, newCursor];
};

export const getAllIssues = async () => {
  const STEP = 2;
  //@ts-ignore
  let allIssues = [];

  const { repository: totalCountPayload } = await graphqlWithAuth(`
  query { 
    repository(owner: "${process.env.GITHUB_USERNAME}", name: "${process.env.GITHUB_REPO_NAME}") {
        issues{
          totalCount
        }
      }
  }
    `);

  const totalCount = totalCountPayload.issues.totalCount;
  let cursor = null;

  for (let i = 0; i < totalCount; i += STEP) {
    //@ts-ignore
    let [issues, newCursor] = await getIssues(i, STEP, cursor);
    cursor = newCursor;
    //@ts-ignore
    allIssues = [...allIssues, ...issues];
  }

  //@ts-ignore
  return allIssues.map((item) => item.node);
};
