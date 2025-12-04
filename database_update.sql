-- 和整骨院予約システム：新規顧客情報とリファラー情報の追加

-- 既存の予約テーブルに新しいカラムを追加
ALTER TABLE reservations 
ADD COLUMN email VARCHAR(255),
ADD COLUMN is_new_customer BOOLEAN DEFAULT true,
ADD COLUMN referral_source VARCHAR(50);

-- リファラーソースの値にコメント（参考）
-- 'instagram' - Instagram
-- 'line' - LINE 
-- 'google_search' - グーグル検索
-- 'yahoo_search' - ヤフー検索  
-- 'referral' - 知人の紹介
-- 'flyer' - チラシ・看板
-- 'other' - その他

-- 既存データの初期値設定（必要に応じて実行）
-- UPDATE reservations 
-- SET is_new_customer = true, 
--     referral_source = 'other' 
-- WHERE is_new_customer IS NULL;

-- インデックス追加（パフォーマンス向上のため）
CREATE INDEX IF NOT EXISTS idx_reservations_is_new_customer ON reservations(is_new_customer);
CREATE INDEX IF NOT EXISTS idx_reservations_referral_source ON reservations(referral_source);