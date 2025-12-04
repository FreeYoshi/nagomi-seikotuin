# 🚀 デプロイ手順書

## 📋 事前準備

### 1. Supabase本番環境の準備
```sql
-- 本番用Supabaseプロジェクトで以下のSQLを実行

-- 1. テーブル作成
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    datetime TIMESTAMP NOT NULL,
    course TEXT NOT NULL,
    email TEXT,
    is_new_customer BOOLEAN DEFAULT true,
    referral_source TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE schedule_overrides (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    status TEXT NOT NULL, -- 'open' or 'closed'
    time TIME,
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. RLS（Row Level Security）の有効化
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_overrides ENABLE ROW LEVEL SECURITY;

-- 3. 基本的なRLSポリシー
CREATE POLICY "Allow public read access" ON reservations FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access" ON reservations FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin read" ON admin_users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read schedules" ON schedule_overrides FOR SELECT USING (true);
CREATE POLICY "Allow admin manage schedules" ON schedule_overrides FOR ALL USING (auth.role() = 'authenticated');

-- 4. 管理者ユーザー作成（パスワードはハッシュ化済み）
INSERT INTO admin_users (username, password) VALUES ('admin', '$2a$10$example_hashed_password');
```

### 2. GitHubリポジトリの準備
```bash
# 1. ローカルでGitリポジトリを初期化
git init
git add .
git commit -m "Initial commit: 和整骨院予約システム"

# 2. GitHubでリポジトリを作成後
git remote add origin https://github.com/your-username/nagomi-seikotsu.git
git branch -M main
git push -u origin main
```

## 🌐 Netlifyでのデプロイ

### 1. Netlifyアカウント作成・連携
1. [Netlify](https://www.netlify.com/)でアカウント作成
2. 「New site from Git」をクリック
3. GitHubを選択・認証
4. リポジトリを選択

### 2. ビルド設定
- **Build command**: 空欄（静的サイトのため）
- **Publish directory**: `.`（ルートディレクトリ）
- **Deploy** をクリック

### 3. 環境変数の設定
Netlifyダッシュボードで:
1. Site settings → Environment variables
2. 以下を追加:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   EMAILJS_PUBLIC_KEY=your_emailjs_key
   ```

### 4. カスタムドメインの設定（オプション）
1. Domain settings → Add custom domain
2. DNS設定でNetlifyを指向
3. HTTPS自動有効化

## ✅ デプロイ後の確認事項

### 1. 機能テスト
- [ ] 予約フォームの動作確認
- [ ] 管理者ログイン
- [ ] スケジュール設定
- [ ] メール通知

### 2. セキュリティ確認
- [ ] HTTPS通信の確保
- [ ] Supabase RLSの動作確認
- [ ] 管理者認証の動作確認

### 3. パフォーマンス確認
- [ ] ページ読み込み速度
- [ ] モバイル対応
- [ ] SEO設定

## 🔧 トラブルシューティング

### よくある問題

1. **Supabase接続エラー**
   - 環境変数の設定確認
   - CORSの設定確認

2. **管理者ログインできない**
   - パスワードハッシュの確認
   - RLSポリシーの確認

3. **メール送信失敗**
   - EmailJS設定の確認
   - API制限の確認

## 📱 運用開始後

### 定期メンテナンス
- 予約データのバックアップ
- システムログの確認
- パフォーマンス監視

### 機能追加時
```bash
# 開発環境で変更後
git add .
git commit -m "新機能: XXX追加"
git push origin main
# → Netlifyが自動デプロイ
```