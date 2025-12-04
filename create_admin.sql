-- 管理者アカウント作成用SQL
-- Supabaseの「SQL Editor」で実行してください

-- Step 1: admin_usersテーブルを作成（存在しない場合）
CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: 既存データを削除してクリーンな状態にする
DELETE FROM admin_users WHERE id = 'admin_k7m9p2x4q8';

-- Step 3: 管理者アカウントを作成
INSERT INTO admin_users (id, password_hash, created_at, updated_at) 
VALUES ('admin_k7m9p2x4q8', 'R8mX9nK2pL7vW4sZ', NOW(), NOW());

-- Step 4: 作成確認
SELECT id, password_hash, created_at FROM admin_users WHERE id = 'admin_k7m9p2x4q8';

-- 確認用クエリ
SELECT * FROM admin_users;