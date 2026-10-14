# よりみちイベントサイト サンプル

イベントLPの情報構成を参考にしつつ、画像・文章・配色・コードを新規作成した静的サイトです。元サイトのコードや画像は使用していません。

## ファイル構成

- `index.html` トップページ
- `creator.html` 出店者詳細ページ共通テンプレート
- `styles.css` 全ページ共通スタイル
- `app.js` トップページ表示・カテゴリー絞り込み
- `creator.js` URLの `id` に対応する出店者詳細表示
- `data.json` イベント・出店者データ
- `assets/images/` ダミー画像

## 起動方法

`fetch()` でJSONを読み込むため、ファイルを直接ダブルクリックせずローカルサーバーを利用してください。

```bash
python3 -m http.server 8000
```

ブラウザーで `http://localhost:8000/` を開きます。

## 出店者の追加

`data.json` の `creators` 配列に以下の形式でオブジェクトを追加します。

```json
{
  "id": "unique-id",
  "category": "creator",
  "role": "役職・ジャンル",
  "name": "表示名",
  "nameEn": "English Name",
  "tagline": "短いキャッチコピー",
  "summary": "一覧・詳細ページ冒頭の説明",
  "story": "活動背景やストーリー",
  "activity": "当日の出店内容",
  "reservation": true,
  "image": "assets/images/sample.svg",
  "accent": "#ef7e63",
  "socialLabel": "Instagram",
  "socialUrl": "#"
}
```

- `category` は `creator` または `food`
- `id` は重複不可
- 削除するときは対象オブジェクトを配列から削除
- 詳細ページは `creator.html?id=unique-id` で自動表示

## 注意

Google Fontsを読み込んでいます。完全オフラインで使う場合はフォントをローカル配置し、HTMLとCSSの参照先を変更してください。
