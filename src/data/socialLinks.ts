import type { IconType } from "react-icons";
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";

export type SocialLink = {
  label: string;
  href: string;
  icon?: IconType;
  external: boolean;
  displayText?: string;
  /* Typed into the hero terminal when the button is hovered. */
  command?: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/bmshin02",
    icon: FaGithub,
    external: true,
    command: "curl github.com/bmshin02",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bmshin02/",
    icon: FaLinkedin,
    external: true,
    command: "curl linkedin.com/in/bmshin02",
  },
  {
    label: "Email",
    href: "mailto:bmshin02@gmail.com",
    icon: FaEnvelope,
    external: false,
    displayText: "bmshin02@gmail.com",
    command: "mail bmshin02@gmail.com",
  },
  {
    label: "Resume",
    href: "/BrandonShin_Resume.pdf",
    icon: FaFileAlt,
    external: true,
    displayText: "Resume",
    command: "curl -O BrandonShin_Resume.pdf",
  },
];
