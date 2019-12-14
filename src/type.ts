export type TPosition = "first" | "second" | "third";

export type THikeWord = {
  word: string | null;
  kana: string | null;
};

export type THikeObject = {
  [key in TPosition]: THikeWord;
};

export type TIdentifierType = {
  name: string;
};
