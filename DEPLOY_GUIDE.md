# 和整骨院 Netlifyデプロイガイド

## 📋 デプロイ前の準備

### 1. 必要なファイル確認
- ✅ index.html (メインページ)
- ✅ admin.html (管理画面)
- ✅ config/env.js (環境変数設定)
- ✅ config/config.js (設定管理)
- ✅ netlify.toml (Netlify設定)
- ✅ images/ フォルダ (画像ファイル)

### 2. 環境変数の準備
Netlifyの管理画面で以下の環境変数を設定してください：

```
SUPABASE_URL=https://oybjnhtyogxiwvsldxhj.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（実際のキー）
EMAILJS_PUBLIC_KEY=KyHtLCaZ6C6XEpcv0
EMAILJS_SERVICE_ID=service_ppi835a
EMAILJS_TEMPLATE_ID=template_jcdlzq6
CONTACT_PHONE=0985-73-9884
CONTACT_INSTAGRAM=https://www.instagram.com/nagomi0510seikotuin/
CONTACT_LINE=https://line.me/R/ti/p/@osy8134l
CONTACT_INSTAGRAM_HANDLE=@nagomi0510seikotuin
```

## 🚀 Netlifyデプロイ手順

### 方法1: GitHubと連携（推奨）

1. **GitHubリポジトリ作成**
   ```bash
   # プロジェクトフォルダで実行
   git init
   git add .
   git commit -m "Initial commit"
   
   # GitHubでリポジトリ作成後
   git remote add origin https://github.com/あなたのユーザー名/和整骨院.git
   git branch -M main
   git push -u origin main
   ```

2. **Netlify連携**
   - https://netlify.com にアクセス
   - 「New site from Git」をクリック
   - GitHubを選択してリポジトリを連携
   - 自動的にnetlify.tomlが読み込まれる

3. **環境変数設定**
   - Site settings → Environment variables
   - 上記の環境変数を全て追加

### 方法2: ドラッグ&ドロップデプロイ

1. **ファイル準備**
   - プロジェクトフォルダ全体をZIPに圧縮
   - または、フォルダをそのまま使用

2. **Netlify手動デプロイ**
   - https://netlify.com にアクセス
   - 「Deploy manually」を選択
   - フォルダをドラッグ&ドロップ

3. **環境変数設定**
   - デプロイ後、Site settings → Environment variables
   - 必要な環境変数を追加

## ⚙️ デプロイ後の設定

### 1. ドメイン設定
- Site settings → Domain management
- カスタムドメインを設定（オプション）

### 2. SSL証明書
- 自動的に Let's Encrypt SSL が設定される

### 3. フォーム設定（予約フォーム）
- Site settings → Forms
- スパム対策を有効化

### 4. 動作確認
- [ ] トップページの表示
- [ ] 予約フォームの動作
- [ ] 管理画面のログイン
- [ ] カレンダーの表示
- [ ] メール送信機能

## 🔧 トラブルシューティング

### よくある問題と解決方法

1. **環境変数が読み込まれない**
   - Netlify管理画面で環境変数が正しく設定されているか確認
   - サイトを再デプロイ

2. **画像が表示されない**
   - images/フォルダがアップロードされているか確認
   - ファイルパスが正しいか確認

3. **管理画面にアクセスできない**
   - /admin.html のパスでアクセス
   - Supabaseの接続を確認

4. **メール送信が失敗する**
   - EmailJSの設定を確認
   - 環境変数の値を確認

## 📞 サポート

デプロイでお困りの場合：
1. Netlifyのログを確認
2. ブラウザの開発者ツールでエラーを確認  
3. 環境変数の設定を再確認

## 🔄 更新手順

### GitHubと連携している場合
```bash
# ファイルを修正後
git add .
git commit -m "更新内容の説明"
git push
# 自動的にNetlifyでデプロイされる
```

### 手動デプロイの場合
- 修正したファイルを再度ドラッグ&ドロップ