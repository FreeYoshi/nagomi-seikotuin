# セキュリティ改善について

## ハードコーディング問題の解決

### 変更内容
1. **設定ファイルの作成** (`config/config.js`)
   - Supabase URLとキー
   - EmailJS設定
   - 営業時間設定
   - コース情報
   - 連絡先情報

2. **環境変数対応** (`.env.example`)
   - 開発用の環境変数テンプレート
   - 本番環境では実際の環境変数を使用

3. **動的設定読み込み**
   - 設定ファイルから値を取得
   - 環境に応じて自動切り替え

### セキュリティ改善点

#### Before（問題のあった状態）
```javascript
// ハードコーディング - セキュリティリスク
const SUPABASE_URL = 'https://oybjnhtyogxiwvsldxhj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

#### After（改善後）
```javascript
// 設定ファイルから取得 - セキュア
const supabaseConfig = window.AppConfig.getSupabaseConfig();
const SUPABASE_URL = supabaseConfig.url;
const SUPABASE_KEY = supabaseConfig.key;
```

### 本番環境デプロイ時の設定

#### Netlify環境変数設定
```bash
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_supabase_key
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

#### Vercel環境変数設定
```bash
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_supabase_key
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 追加機能
- **ロギングシステム**: デバッグと本番で異なるログレベル
- **環境自動判定**: localhost/本番環境を自動識別
- **設定値検証**: 必要な設定値の存在チェック

### 使用方法
1. `.env.example`を参考に本番環境で環境変数を設定
2. 機密情報はGitにコミットしない（`.gitignore`で除外済み）
3. 本番環境では`window.SUPABASE_URL`などのグローバル変数を設定