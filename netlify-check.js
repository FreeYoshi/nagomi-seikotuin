// Netlifyで自動的に設定される環境変数をチェック
console.log('🚀 Netlify環境変数チェック');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DEPLOY_URL:', process.env.DEPLOY_URL);
console.log('DEPLOY_PRIME_URL:', process.env.DEPLOY_PRIME_URL);

// カスタム環境変数の存在確認
const requiredEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_KEY', 
    'EMAILJS_PUBLIC_KEY',
    'CONTACT_PHONE'
];

console.log('📋 必要な環境変数チェック:');
requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    console.log(`${varName}: ${value ? '✅ 設定済み' : '❌ 未設定'}`);
});

// 本番環境での設定確認
if (typeof window !== 'undefined') {
    window.checkNetlifyEnvironment = function() {
        console.log('🌐 ブラウザ環境での設定確認');
        console.log('現在のURL:', window.location.href);
        console.log('AppConfigの存在:', !!window.AppConfig);
        
        if (window.AppConfig) {
            try {
                const supabaseConfig = window.AppConfig.getSupabaseConfig();
                console.log('Supabase設定:', {
                    urlExists: !!supabaseConfig.url,
                    keyExists: !!supabaseConfig.key
                });
            } catch (error) {
                console.error('設定取得エラー:', error);
            }
        }
    };
}