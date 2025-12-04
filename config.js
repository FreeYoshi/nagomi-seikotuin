// 本番環境用の設定ファイル
// Netlifyの環境変数から値を取得してwindowオブジェクトに設定

(function() {
    // Netlifyの環境変数は build時に置換されるため、
    // 実際の本番環境では直接値を設定する必要があります
    
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // 本番環境の場合、ここに実際の値を設定
        // window.SUPABASE_URL = 'YOUR_PRODUCTION_SUPABASE_URL';
        // window.SUPABASE_KEY = 'YOUR_PRODUCTION_SUPABASE_ANON_KEY';
        // window.EMAILJS_PUBLIC_KEY = 'YOUR_PRODUCTION_EMAILJS_PUBLIC_KEY';
        
        console.log('本番環境で実行中');
    } else {
        console.log('開発環境で実行中');
    }
})();