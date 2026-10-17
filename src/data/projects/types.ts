export type ProjectStatus = "completed" | "in-progress";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;

  shortDescription: string;
  description: string;

  image: string;
  imageAlt: string;
  gallery: string[];

  category: string;
  date: string;
  status: ProjectStatus;

  technologies: string[];
  featured: boolean;

  role: string;
  problem: string;
  solution: string;

  features: string[];
  challenges: string[];
  results: string[];

  youtubeUrl?: string;
  links: ProjectLink[];
};
