import { BlogPages } from "../../../src/utils/parse-properties";

export interface MenuListProps {
  category: string;
  blogs: BlogPages[];
  priority: number;
  slug: string;
}

export const category_utils = (inpCategory: string) => {
  const priority = parseInt(inpCategory.split(" ").slice(-1).join(" "));
  if (isNaN(priority)) {
    return inpCategory;
  }
  return inpCategory.split(" ").slice(0, -1).join(" ");
};

const groupByToMap = <T, Q>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => Q
) =>
  array.reduce((map, value, index, array) => {
    const key = predicate(value, index, array);
    map.get(key)?.push(value) ?? map.set(key, [value]);
    return map;
  }, new Map<Q, T[]>());

const blogsToCategoryMap = (blogData: BlogPages[]) => {
  const menu = groupByToMap(blogData, (v) => v.category);

  const menuList: MenuListProps[] = [];

  menu.forEach((value, key) => {
    // sort the blogs by published_on date and priority
    menuList.push({
      priority: parseInt(key.split(" ").slice(-1).join(" ")) || 5000,
      category: category_utils(key),
      slug: category_utils(key).split(" ").join("-").toLowerCase(),
      blogs: value.sort(function (a, b) {
        var dateA = new Date(a.published_on).getTime();
        var dateB = new Date(b.published_on).getTime();
        return dateA > dateB ? 1 : -1;
      }),
    });
  });

  // sort the menuList by priority
  menuList.sort(function (a, b) {
    return a.priority > b.priority ? 1 : -1;
  });
  return menuList;
};

export default blogsToCategoryMap;
