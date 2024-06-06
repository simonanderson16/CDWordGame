export interface Game {
  id: string;
  dates: {
    from: string;
    to: string;
  };
  credits: Credits;
  levels: Levels;
  requiredLetter: string;
  availableLetters: string[];
  answers: string[];
  plays: number;
}

export interface Levels {
  Wa: number | string;
  Wahoo: number | string;
  Wahoowa: number | string;
  WahooWOW: number | string;
  Average: number | string;
}

export interface Credits {
  puzzle: string;
  words: string;
}
