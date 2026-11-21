import { chemEq } from "./chemEq";
import { rankingVideoCompiler } from "./rankingVideoCompiler";
import { webMining } from "./webMining";
import { fishGame } from "./fishGame";
import { rhythmPlus } from "./rhythmPlus";
import { crispCar } from "./crispCar";
import { cypherCode } from "./cypherCode";
import { productIntelligence } from "./productIntelligence";
import { talentBridge } from "./talentBridge";
import { signLingo } from "./signLingo";
import { fastPath } from "./fastPath";
import { thriftLens } from "./thriftLens";
import { portfolioWebsite } from "./portfolioWebsite";

export type { Project, ProjectLink, ProjectStatus } from "./types";

export const projects = [
  signLingo,
  fastPath,
  thriftLens,
  talentBridge,
  productIntelligence,
  portfolioWebsite,
  rankingVideoCompiler,
  fishGame,
  webMining,
  cypherCode,
  crispCar,
  chemEq,
  rhythmPlus,
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];
