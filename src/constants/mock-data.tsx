import {Subject} from "../types"
export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description: "Foundational concepts in programming, algorithms, and problem-solving using modern computing tools.",
    createdAt: new Date().toISOString(),
},
  {
    id: 2,
    code: "MATH220",
    name: "Discrete Mathematics",
    department: "Mathematics",
    description: "Covers logic, sets, combinatorics, graph theory, and formal proof techniques used in computing and engineering.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "ENG205",
    name: "Engineering Graphics and Design",
    department: "Engineering",
    description: "Introduces technical drawing, design principles, and visual communication for engineering projects.",
    createdAt: new Date().toISOString(),
  },
];