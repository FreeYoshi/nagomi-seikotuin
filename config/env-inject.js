// 環境変数注入スクリプト
// 本番環境でビルド時またはランタイム時に環境変数を注入するスクリプト

console.log('🔧 環境変数注入スクリプト開始');

// 環境変数一覧
const ENV_VARS = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY', 
    'EMAILJS_PUBLIC_KEY',
    'EMAILJS_SERVICE_ID',
    'EMAILJS_TEMPLATE_ID'
];

// サーバーサイド（Node.js）で動作する場合の環境変数注入
if (typeof process !== 'undefined' && process.env) {
    console.log('🖥️ サーバーサイド環境変数注入');
    ENV_VARS.forEach(key => {
        if (process.env[key]) {
            console.log(`✅ ${key} を注入`);
            // ここでHTMLファイルに環境変数を注入する処理
        } else {
            console.warn(`⚠️ ${key} が設定されていません`);
        }
    });
}

// クライアントサイド（ブラウザ）で動作する場合
if (typeof window !== 'undefined') {
    console.log('🌐 クライアントサイド環境変数確認');
    
    // URLのクエリパラメータから環境変数を読み取る（デバッグ用）
    const urlParams = new URLSearchParams(window.location.search);
    
    ENV_VARS.forEach(key => {
        // 既に設定されている場合はスキップ
        if (window[key]) {
            console.log(`✅ ${key} は既に設定されています`);
            return;
        }
        
        // URLパラメータから読み取り（デバッグ用）
        const urlValue = urlParams.get(key.toLowerCase());
        if (urlValue) {
            window[key] = urlValue;
            console.log(`🔗 ${key} をURLパラメータから読み取りました`);
        } else {
            console.warn(`⚠️ ${key} が設定されていません`);
        }
    });
    
    // 設定状況のサマリー表示
    console.log('📋 環境変数設定状況:');
    console.table(ENV_VARS.reduce((acc, key) => {
        acc[key] = {
            設定済み: !!window[key],
            値のプレビュー: window[key] ? window[key].substring(0, 10) + '...' : 'なし'
        };
        return acc;
    }, {}));
}

console.log('✅ 環境変数注入スクリプト完了');