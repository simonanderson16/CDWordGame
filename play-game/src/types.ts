export interface Game {
  id: string;
  dates: {
    from: string;
    to: string;
  };
  requiredLetter: string;
  availableLetters: string[];
  answers: string[];
  plays: number;
}
