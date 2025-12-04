# 和整骨院 予約システム

完全予約制の整骨院向けWebアプリケーション

## 機能

- 顧客予約システム（日時・コース選択）
- 管理者ダッシュボード（予約管理・スケジュール設定）
- 営業時間の柔軟な設定（日曜営業・時間範囲設定）
- 顧客分析（新規・リピーター・流入経路）
- メール通知機能

## デプロイ方法

### 1. Netlify（推奨・無料）

最も簡単で無料のデプロイ方法：

```bash
# 1. Netlifyにアカウント作成（GitHub連携推奨）
# 2. プロジェクトをGitHubにプッシュ
# 3. Netlifyで「New site from Git」を選択
# 4. GitHubリポジトリを選択
# 5. 自動デプロイ完了
```

**環境変数設定**：
- Netlifyダッシュボード → Site settings → Environment variables
- 必要に応じて本番用のSupabase URL/KEYを設定

### 2. Vercel（無料）

```bash
# 1. Vercelアカウント作成
# 2. プロジェクトをGitHubにプッシュ
# 3. Vercelで「Import Project」
# 4. GitHubリポジトリを選択
# 5. 自動デプロイ完了
```

### 3. GitHub Pages（無料・最もシンプル）

```bash
# 1. GitHubリポジトリ作成
# 2. ファイルをプッシュ
# 3. Settings → Pages → Source: Deploy from branch
# 4. Branch: main を選択
# 5. https://username.github.io/repositoryname でアクセス可能
```

## 本番環境の準備

### Supabase設定

現在のSupabase設定は開発用のため、本番用に以下を確認：

1. **RLS（Row Level Security）の有効化**
2. **本番用データベースの作成**
3. **適切なアクセス制限の設定**

### EmailJS設定

現在のEmailJS設定も本番用に確認が必要：

1. **本番用テンプレートの作成**
2. **送信制限の確認**
3. **エラーハンドリングの強化**

## 推奨デプロイフロー

1. **Netlify**を選択（無料・高機能・簡単）
2. 本番用Supabaseプロジェクト作成
3. 環境変数で本番用設定に切り替え
4. カスタムドメイン設定（必要に応じて）

## セキュリティ考慮事項

- Supabase RLSポリシーの適切な設定
- 管理者認証の強化
- HTTPS通信の確保（Netlifyは自動）
- 定期的なバックアップ

## メンテナンス

- 予約データの定期バックアップ
- ログの監視
- パフォーマンスの最適化