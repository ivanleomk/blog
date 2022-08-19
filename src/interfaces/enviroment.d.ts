declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_ACCESS_TOKEN: string;
      GITHUB_USERNAME: string;
      GITHUB_REPO_NAME: string;
      CACHE_FOLDER: string;
      POST_CACHE_FILE: string;
      AUTHOR_CACHE_FILE: string;
      WEBSITE_NAME: string;
      WEBSITE_DESCRIPTION: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
