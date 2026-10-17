export type EducationItem = {
  school: string;
  degree: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  coursework: string[];
  status?: string;
};

export const education: EducationItem[] = [
  {
    school: "University of California, Irvine",
    degree: "Master of Software Engineering",
    date: "2026 – Expected 2027",
    location: "Irvine, California",
    status: "Current Student",
    description:
      "Graduate program focused on professional software development, team-based engineering, software architecture, testing, and large-scale application development.",
    highlights: [
      "Recipient of a $20,000 student fellowship.",
      "Participating in a studio-based curriculum centered on collaborative software development.",
      "Preparing for a Summer 2027 internship involving the design and delivery of a production-level software system.",
    ],
    coursework: ["Software Engineering", "AI"],
  },
  {
    school: "University of California, Riverside",
    degree: "Bachelor of Science in Computer Science",
    date: "Graduated 2025",
    location: "Riverside, California",
    description:
      "Completed a computer science degree with experience in software engineering, algorithms, databases, computer vision, web development, and interactive application development.",
    highlights: [
      "Developed educational augmented and virtual reality applications through the XCITE Center.",
      "Completed an autonomous vehicle senior project using OpenCV.",
      "Built projects involving web development, game development, and computer vision.",
    ],
    coursework: [
      "Data Structures",
      "Databases",
      "Data Analysis",
      "AI",
      "NLP",
      "Machine Learning",
      "Operating Systems",
      "Cyber Security",
      "Embedded Systems",
      "Software Engineering",
    ],
  },
];
