import type { IconType } from "react-icons";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";

export type SocialLink = {
  label: string;
  href: string;
  icon?: IconType;
  external: boolean;
  displayText?: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/bmshin02",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bmshin02/",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:bmshin02@gmail.com",
    external: false,
    displayText: "bmshin02@gmail.com",
  },
  {
    label: "Resume",
    href: "/BrandonShinResume_2026.pdf",
    icon: FaFileAlt,
    external: true,
    displayText: "Resume",
  },
];
