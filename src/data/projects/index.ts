import { chemEq } from "./chemEq";
import { rankingVideoCompiler } from "./rankingVideoCompiler";
import { webMining } from "./webMining";
import { fishGame } from "./fishGame";
import { rhythmPlus } from "./rhythmPlus";
import { crispCar } from "./crispCar";
import { enigmaMachine } from "./enigmaMachine";
import { productIntelligence } from "./productIntelligence";

export type { Project, ProjectLink, ProjectStatus } from "./types";

export const projects = [
  rankingVideoCompiler,
  enigmaMachine,
  crispCar,
  chemEq,
  webMining,
  fishGame,
  rhythmPlus,
  productIntelligence,
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];
