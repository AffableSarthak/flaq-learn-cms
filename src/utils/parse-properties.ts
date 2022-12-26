import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type BlogPages = {
  title: string;
  pageId: string;
  icon: string;
  category: string;
  url: string;
  published_on: string;
  coverImage: string;

  socialImages: string;
};

const getPageId = (url: string): string => {
  const urlParts = url.split("-");
  return urlParts[urlParts.length - 1];
};

export const getBlogUrl = (slug: string) => {
  const pageId = slug.split("-")[slug.split("-").length - 1];
  const url = slug.split(`-${pageId}`)[0];
  return url.toLowerCase();
};

// Parse the notion database response to get the blog pages data.
export const parseProperties = (
  database: QueryDatabaseResponse
): BlogPages[] => {
  return database.results.map((row: any) => {
    const title =
      row.properties.Article?.title[0].plain_text ?? "fallback title";
    const pageId = getPageId(row.url);
    const url = row.url.replace("https://www.notion.so/", "");
    const icon = row.icon?.emoji ?? null;
    const category = row.properties.Category.select.name;
    const published_on =
      row.properties["Published On"].date?.start ||
      new Date().toISOString().slice(0, 10);

    const coverImage =
      row.properties["Cover Image"]?.rich_text[0]?.plain_text || null;
    const socialImages =
      row.properties["Social Image"]?.rich_text[0]?.plain_text || null;
    return {
      title,
      pageId,
      icon,
      category,
      url,
      published_on,
      coverImage,
      socialImages,
    };
  });
};

export interface BlogRoutesType {
  url: string;
  pageId: string;
}

export const getBlogRoutes = (database: QueryDatabaseResponse) => {
  const blogRoutes: BlogRoutesType[] = [];
  database.results.map((row: any) => {
    const pageId = getPageId(row.url);
    const url = row.url.replace("https://www.notion.so/", "");
    const routeName = getBlogUrl(url);
    const routeData = {
      url: routeName,
      pageId,
    };

    blogRoutes.push(routeData);
  });
  return blogRoutes;
};

const category_utils = (inpCategory: string) => {
  const priority = parseInt(inpCategory.split(" ").slice(-1).join(" "));
  if (isNaN(priority)) {
    return inpCategory;
  }
  return inpCategory.split(" ").slice(0, -1).join(" ");
};

export const getAllCategories = (database: QueryDatabaseResponse) => {
  const category = new Set(
    database.results.map((row: any) => {
      const category = row.properties["Category"].select.name || null;
      return category;
    })
  );

  return Array.from(category).map((category) => {
    return {
      category: category_utils(category),
      priority: parseInt(category.split(" ").slice(-1).join(" ")) || "",
      slug: category_utils(category).split(" ").join("-"),
    };
  });
};
