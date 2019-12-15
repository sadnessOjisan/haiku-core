import { THikeObject, TIdentifierType, TPosition } from "./type";

const countWord = require("js-word-count-for-haiku").default;
const data: { [key: string]: string } = require("js-word-kana").default;

const HIKE_OBJECT: THikeObject = {
  first: {
    word: null,
    kana: null
  },
  second: {
    word: null,
    kana: null
  },
  third: {
    word: null,
    kana: null
  }
};

/**
 * 俳句の中間結果
 * firstが5文字、secondが7文字, thirdが7文字になるように操作を加えていく
 */
const resetHikeObj = () => {
  HIKE_OBJECT.first = {
    word: null,
    kana: null
  };
  HIKE_OBJECT.second = {
    word: null,
    kana: null
  };
  HIKE_OBJECT.third = {
    word: null,
    kana: null
  };
};

/**
 *
 * @param {string} kana nullable wordのkanaが入力される
 */
const countHikeWord = (kana: string | null) => {
  if (!kana || typeof kana !== "string") {
    return 0;
  }
  return countWord(kana);
};

/**
 * 俳句の中間結果であるHIKE_OBJECTに完成した句を挿入する関数
 * @param {string} word
 * @param {first | second | third} position
 */
const setWord = (word: string, kana: string, position: TPosition) => {
  switch (position) {
    case "first":
      if (HIKE_OBJECT.first.word && HIKE_OBJECT.first.kana) {
        HIKE_OBJECT.first = {
          word: HIKE_OBJECT.first.word + word,
          kana: HIKE_OBJECT.first.kana + kana
        };
      } else {
        HIKE_OBJECT.first = {
          word,
          kana
        };
      }
      return;
    case "second":
      if (HIKE_OBJECT.second.word && HIKE_OBJECT.second.kana) {
        HIKE_OBJECT.second = {
          word: HIKE_OBJECT.second.word + word,
          kana: HIKE_OBJECT.second.kana + kana
        };
      } else {
        HIKE_OBJECT.second = {
          word,
          kana
        };
      }
      return;
    case "third":
      if (HIKE_OBJECT.third.word && HIKE_OBJECT.third.kana) {
        HIKE_OBJECT.third = {
          word: HIKE_OBJECT.third.word + word,
          kana: HIKE_OBJECT.third.kana + kana
        };
      } else {
        HIKE_OBJECT.third = {
          word,
          kana
        };
      }
      return;
    default:
      return;
  }
};

/** 俳句を出力する関数 */
const resultHike = (HIKE_OBJECT: THikeObject) => {
  const { first, second, third } = HIKE_OBJECT;
  return `${first.word} ${second.word} ${third.word}`;
};

/**
 * main関数. 検知した俳句をconsoleに出力する.
 */
const main = (node: TIdentifierType) => {
  const { name } = node;
  const kana = data[name];
  if (!kana) {
    // 単語辞書から該当する言葉を見つけられなかったとき
    resetHikeObj();
  } else {
    if (countHikeWord(HIKE_OBJECT.first.kana) !== 5) {
      // 1句目が5文字じゃないときは1句目を操作
      if (countHikeWord(HIKE_OBJECT.first.kana) + countHikeWord(kana) === 5) {
        // すでに入力された1句目といま入力されたものの合計が5になったかどうかをチェック
        setWord(name, kana, "first");
        return;
      } else {
        setWord(name, kana, "first");
        if (countHikeWord(HIKE_OBJECT.first.kana) > 5) {
          resetHikeObj();
        }
        return;
      }
    }
    if (countHikeWord(HIKE_OBJECT.second.kana) !== 7) {
      //    2句目が7文字じゃないときは2句目を操作
      if (countHikeWord(HIKE_OBJECT.second.kana) + countHikeWord(kana) === 7) {
        // すでに入力された1句目といま入力されたものの合計が5になったかどうかをチェック
        setWord(name, kana, "second");
        return;
      } else {
        setWord(name, kana, "second");
        if (countHikeWord(HIKE_OBJECT.second.kana) > 7) {
          resetHikeObj();
        }
        return;
      }
    }

    if (countHikeWord(HIKE_OBJECT.third.kana) !== 5) {
      //   3句目が5文字じゃないときは3句目を操作
      if (countHikeWord(HIKE_OBJECT.third.kana) + countHikeWord(kana) === 5) {
        // すでに入力された1句目といま入力されたものの合計が5になったかどうかをチェック
        //   注意: このブロックはreturnしない
        setWord(name, kana, "third");
      } else {
        setWord(name, kana, "third");
        if (countHikeWord(HIKE_OBJECT.third.kana) > 5) {
          resetHikeObj();
        }
        return;
      }
    }
    // 575が達成された時の処理
    const data = resultHike(HIKE_OBJECT);
    resetHikeObj();
    if (data) {
      return data;
    }
  }
};

export default main;
