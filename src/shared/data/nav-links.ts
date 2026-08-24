import { ROUTES } from "@/shared/constants";
import type { NavItem } from "../types";

export const navLinks: NavItem[] = [
  {
    id: "about",
    label: "About",
    href: ROUTES.ABOUT,
  },
  {
    id: "heritage",
    label: "Heritage",
    href: ROUTES.HERITAGE,
  },
  {
    id: "leadership",
    label: "Leadership",
    href: ROUTES.LEADERSHIP,
  },
  {
    id: "brands",
    label: "Brands",
    href: ROUTES.BRANDS,
  },
  {
    id: "careers",
    label: "Careers",
    href: ROUTES.CAREERS,
  },
  {
    id: "esg",
    label: "ESG",
    href: ROUTES.ESG,
  },
  {
    id: "newsroom",
    label: "Newsroom",
    href: ROUTES.NEWSROOM,
  },
  {
    id: "contact",
    label: "Contact",
    href: ROUTES.CONTACT,
  },
];
