# haiku-core

babel-plugin と eslint-plugin を使って俳句を見つけるときの共通処理をまとめた関数。ソースコードの AST ノードを受け取り、俳句が含まれているかを判定します。俳句があった場合はその俳句を値として返します。

これは [クソアプリ Advent Calendar 2019](https://qiita.com/advent-calendar/2019/kuso-app)の 19 日目の記事である、[ビルド時に俳句を読めるプラグイン](https://qiita.com/sadnessOjisan/98619eaaef1da8d6545a) のために開発されたものです。

## 導入

```zsh
$ yarn add haiku-core
```

```ts
const hike = require("haiku-core");
const data = hike(node);
if (data) {
  console.log(`俳句を検知しました. => ${data}`);
}
```

## 開発

モジュールインストール

```zsh
$ yarn install
```

公開前にドライラン

```zsh
$ tar -tf $(npm pack)
```

npm に公開

```zsh
$ npm publish
```
