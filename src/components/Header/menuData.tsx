import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Examples",
    path: "/examples",
    newTab: false,
  },
  {
    id: 3,
    title: "Projects",
    path: "",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "MML Language",
        path: "/docs",
        newTab: false,
      },
      {
        id: 32,
        title: "3D Web Experience",
        path: "/3d-web-experience",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Docs",
    path: "/docs",
    newTab: false,
  },
  {
    id: 5,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
];
export default menuData;
