-- 現在のadmin_usersテーブルの状況を確認するSQL
-- Supabaseの「SQL Editor」で実行してください

-- 1. テーブルの存在確認
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'admin_users'
);

-- 2. テーブル構造確認
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;

-- 3. 既存データ確認
SELECT id, password_hash, created_at 
FROM admin_users;

-- 4. 管理者アカウントが存在するか確認
SELECT COUNT(*) as admin_count, 
       CASE 
           WHEN COUNT(*) > 0 THEN 'アカウント存在' 
           ELSE 'アカウント不存在' 
       END as status
FROM admin_users 
WHERE id = 'admin_k7m9p2x4q8';