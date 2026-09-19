import { ChemEQ } from "./ChemEQ";
import { rankingVideoCompiler } from "./rankingvideocompiler";
import { Webmining } from "./Webmining";
import { fishgame } from "./fishgame";
import { rhythmplus } from "./RhythmPlus";
import { AutonomousCar } from "./CrispCar";
import { EnigmaMachine } from "./enigmamachine";
import { productintelligence } from "./productintelligence";

export type { Project, ProjectLink, ProjectStatus } from "./projecttypes";

export const projects = [
  rankingVideoCompiler,
  EnigmaMachine,
  AutonomousCar,
  ChemEQ,
  Webmining,
  fishgame,
  rhythmplus,
  productintelligence,
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];
