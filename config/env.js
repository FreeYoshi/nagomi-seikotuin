// 環境変数をwindowオブジェクトに設定するスクリプト
// 本番環境ではホスティングプラットフォームの環境変数設定機能を使用

// ローカル開発用の環境変数設定
console.log('🔧 env.js 読み込み開始');

// 環境変数の設定（開発環境ではローカル設定、本番環境では外部から注入）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // 開発環境 - 実際のSupabase接続情報を設定
    window.SUPABASE_URL = window.SUPABASE_URL || 'https://oybjnhtyogxiwvsldxhj.supabase.co';
    window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YmpuaHR5b2d4aXd2c2xkeGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0Nzk3MDQsImV4cCI6MjA4MDA1NTcwNH0.6IwN-RWr3imbRotjb3CG4OYYssP50CBUuIFE-xndjd4';
    
    // ✅ EmailJS configuration (use values from .env.example or your EmailJS account)
    window.EMAILJS_PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || 'KyHtLCaZ6C6XEpcv0';
    window.EMAILJS_SERVICE_ID = window.EMAILJS_SERVICE_ID || 'service_ppi835a';
    window.EMAILJS_TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || 'template_jcdlzq6';
    
    console.log('✅ [開発環境] 環境変数をローカル設定から読み込みました');
    console.log('🔑 設定確認:', {
        urlSet: !!window.SUPABASE_URL,
        keySet: !!window.SUPABASE_ANON_KEY,
        emailJsSet: !!window.EMAILJS_PUBLIC_KEY
    });
} else {
    // 本番環境 - 実際のSupabase接続情報を設定
    window.SUPABASE_URL = window.SUPABASE_URL || 'https://oybjnhtyogxiwvsldxhj.supabase.co';
    window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YmpuaHR5b2d4aXd2c2xkeGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0Nzk3MDQsImV4cCI6MjA4MDA1NTcwNH0.6IwN-RWr3imbRotjb3CG4OYYssP50CBUuIFE-xndjd4';

    // EmailJS設定
    window.EMAILJS_PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || 'KyHtLCaZ6C6XEpcv0';
    window.EMAILJS_SERVICE_ID = window.EMAILJS_SERVICE_ID || 'service_ppi835a';
    window.EMAILJS_TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || 'template_jcdlzq6';

    console.log('✅ [本番環境] 環境変数を設定しました');
    console.log('🔑 設定確認:', {
        urlSet: !!window.SUPABASE_URL,
        keySet: !!window.SUPABASE_ANON_KEY,
        emailJsSet: !!window.EMAILJS_PUBLIC_KEY
    });
}

console.log('✅ env.js 読み込み完了');

// 本番環境では、ホスティングプラットフォームで以下の環境変数を設定：
// SUPABASE_URL
// SUPABASE_ANON_KEY  
// EMAILJS_PUBLIC_KEY
// EMAILJS_SERVICE_ID
// EMAILJS_TEMPLATE_ID