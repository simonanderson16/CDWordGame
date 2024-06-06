export interface Game {
  id: string;
  dates: {
    from: string;
    to: string;
  };
  credits: {
    puzzle: string;
    words: string;
  };
  levels: {
    Wa: number;
    Wahoo: number;
    Wahoowa: number;
    WahooWOW: number;
    Average: number;
  }
  requiredLetter: string;
  availableLetters: string[];
  answers: string[];
  plays: number;
}
