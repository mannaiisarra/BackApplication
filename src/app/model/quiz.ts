import { Etape } from "./etape";
export interface Quiz {
  title: string;
    id: number;
    description: string;
    numberOfQuestions: string;
    maxMarks: string;
    active: string;
     etape?:Etape[];
  }
  