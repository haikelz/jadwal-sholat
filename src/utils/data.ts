import {
  MdBook,
  MdHomeFilled,
  MdOutlineAccessTime,
  MdToday,
} from "react-icons/md";

export const navbarList = [
  { href: "/", path: "/", title: "Home", icon: MdHomeFilled },
  {
    href: "/jadwal-sholat",
    path: "/jadwal-sholat",
    title: "Sholat",
    icon: MdOutlineAccessTime,
  },
  {
    href: "/puasa-sunnah",
    path: "/puasa-sunnah",
    title: "Puasa",
    icon: MdToday,
  },
  { href: "/quran", path: "/quran", title: "Qur'an", icon: MdBook },
];
