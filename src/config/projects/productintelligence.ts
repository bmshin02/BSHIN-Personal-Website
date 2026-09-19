import type { Project } from "./projecttypes";

export const productintelligence: Project = {
  id: "product-sentiment-analyzer",
  slug: "product-sentiment-analyzer",

  title: "Product Sentiment Analyzer",

  shortDescription:
    "A full-stack product research platform that transforms Reddit discussions into structured insights about customer opinions, recurring complaints, and product trends.",

  description:
    "Product Sentiment Analyzer is a full-stack application designed to help users understand what people are saying about products online. " +
    "Currently, the platform processes discussion data, cleans and analyzes the text on Reddit, and presents recurring words and phrases through an accessible dashboard. " +
    "The project is being developed incrementally, with planned capabilities including sentiment analysis, topic extraction, semantic search, product comparison, and AI-generated summaries.",

  image: "/images/projects/productintelligence/cover.png",

  imageAlt:
    "Product Sentiment Analyzer dashboard displaying insights from Reddit product discussions",

  gallery: ["/images/projects/productintelligence/pic1.png"],

  category: "Web App",

  date: "Aug. 2026 – Present",

  status: "in-progress",

  technologies: [
    "React",
    "TypeScript",
    "FastAPI",
    "Python",
    "Natural Language Processing",
    "REST API",
    "Pytest",
    "Vercel",
    "Render",
  ],

  featured: true,

  role: "I designed and developed the full-stack application, including the React dashboard, FastAPI backend, text-processing pipeline, REST API integration, automated tests, and cloud deployment. I am also responsible for planning and implementing the project's incremental NLP and AI feature roadmap.",

  problem:
    "Reddit contains detailed and candid product discussions, but useful information is spread across large numbers of posts and comments. " +
    "Manually reviewing these conversations makes it difficult to identify repeated complaints, commonly discussed features, and broader customer sentiment. " +
    "Users need a faster way to transform unstructured discussions into organized and understandable product insights.",

  solution:
    "I built a full-stack analysis platform that converts Reddit product discussions into structured insights. " +
    "The Python processing pipeline cleans and tokenizes discussion text, removes common stop words, generates n-grams, and calculates word and phrase frequencies. " +
    "A FastAPI backend exposes the analysis through REST endpoints, while a React and TypeScript dashboard presents the results in a format that is easier to explore. " +
    "The system is structured to support future sentiment analysis, topic extraction, embeddings, semantic search, and AI-assisted summaries.",

  features: [
    "Text-cleaning pipeline for normalizing Reddit posts and comments",
    "Tokenization and stop-word removal for reducing irrelevant text",
    "Word-frequency analysis for identifying commonly discussed terms",
    "N-gram extraction for discovering recurring phrases and product concerns",
    "FastAPI REST endpoints for delivering processed product insights",
    "React and TypeScript dashboard for presenting analysis results",
    "Automated backend tests built with Pytest",
    "Frontend deployment on Vercel and backend deployment on Render",
    "Incremental roadmap for sentiment analysis, topic extraction, semantic search, and AI-generated summaries",
  ],

  challenges: [
    "Transforming noisy, unstructured social media discussions into consistent data for analysis",
    "Separating reusable text-processing logic into modular and testable services",
    "Designing API responses that can support both current analytics and future AI features",
    "Connecting a separately deployed React frontend and FastAPI backend",
    "Configuring cross-origin requests between the Vercel frontend and Render backend",
    "Creating an incremental development roadmap that adds NLP and AI functionality without making the initial system overly complex",
  ],

  results: [
    "Built and deployed a working full-stack product intelligence application",
    "Implemented a reusable text-processing pipeline for extracting frequent words and phrases",
    "Connected a React and TypeScript frontend to a Python FastAPI backend through REST APIs",
    "Added automated tests to validate text cleaning and analysis behavior",
    "Established a scalable foundation for sentiment analysis, topic extraction, embeddings, and retrieval-augmented generation",
    "Strengthened my experience with full-stack development, natural language processing, testing, and cloud deployment",
  ],

  links: [
    {
      label: "Source Code",
      url: "https://github.com/bmshin02/Product-Sentiment-Analyzer",
    },
    {
      label: "Live Demo",
      url: "https://product-sentiment-analyzer-amber.vercel.app/",
    },
  ],
};
