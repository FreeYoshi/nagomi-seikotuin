// 環境設定ファイル
// 本番環境では環境変数から取得、開発環境では直接指定

console.log('🔧 config.js 読み込み開始');

window.AppConfig = {
    // 環境判定
    isDevelopment: () => {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    },
    
    // 環境変数取得（ローカル：.envファイル、本番：Supabase環境変数）
    getEnv: (key, defaultValue = '') => {
        // ブラウザ環境では process.env は使用できないため、
        // window オブジェクトから環境変数を取得
        return window[key] || defaultValue;
    },
    
    /* セキュリティ上の理由によりコメントアウト
    // Supabase設定（開発・本番で同じキー）
    getSupabaseConfig: () => {
        return {
            url: window.AppConfig.getEnv('SUPABASE_URL', 'https://oybjnhtyogxiwvsldxhj.supabase.co'),
            key: window.AppConfig.getEnv('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YmpuaHR5b2d4aXd2c2xkeGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0Nzk3MDQsImV4cCI6MjA4MDA1NTcwNH0.6IwN-RWr3imbRotjb3CG4OYYssP50CBUuIFE-xndjd4')
        };
    },
    */
    
    /* セキュリティ上の理由によりコメントアウト
    // EmailJS設定
    getEmailJSConfig: () => {
        return {
            publicKey: window.AppConfig.getEnv('EMAILJS_PUBLIC_KEY', 'Bjgie8FTLGEHn3yFv'),
            serviceId: window.AppConfig.getEnv('EMAILJS_SERVICE_ID', 'service_fsef42p'),
            templateId: window.AppConfig.getEnv('EMAILJS_TEMPLATE_ID', 'template_4w72csd')
        };
    },
    */
    
    /* セキュリティ上の理由によりコメントアウト
    // テーブル名
    tables: {
        reservations: 'reservations',
        adminUsers: 'admin_users',
        scheduleOverrides: 'schedule_overrides'
    },
    */
    
    // 営業時間設定
    businessHours: {
        weekdays: {
            start: 9,
            end: 18,
            interval: 30 // 30分間隔
        },
        saturday: {
            start: 9,
            end: 12,
            interval: 30
        },
        closedDays: [0], // 日曜日 (0=日曜, 6=土曜)
        specialClosedDays: [], // 祝日など
        lastBookingOffset: 30 // 終了時間の何分前まで予約可能か
    },
    
    // コース設定
    courses: [
        {
            id: '30min',
            name: '30分コース',
            duration: 30,
            price: 2000,
            description: '軽度の症状・メンテナンス'
        },
        {
            id: '60min',
            name: '1時間コース',
            duration: 60,
            price: 4000,
            description: 'しっかり治療・初回推奨'
        }
    ],
    
    // 連絡先情報
    contact: {
        phone: '0985-73-9884',
        instagram: 'https://www.instagram.com/nagomi0510seikotuin/',
        line: 'https://line.me/R/ti/p/@osy8134l?oat_content=qr#~',
        instagramHandle: '@nagomi0510seikotuin'
    },
    
    // デバッグ設定
    debug: {
        enabled: window.AppConfig?.isDevelopment() || false,
        logLevel: 'info' // 'debug', 'info', 'warn', 'error'
    }
};

// ロギング関数
window.AppLogger = {
    debug: (message, data) => {
        if (window.AppConfig.debug.enabled && window.AppConfig.debug.logLevel === 'debug') {
            console.debug(`[DEBUG] ${message}`, data || '');
        }
    },
    info: (message, data) => {
        if (window.AppConfig.debug.enabled) {
            console.log(`[INFO] ${message}`, data || '');
        }
    },
    warn: (message, data) => {
        console.warn(`[WARN] ${message}`, data || '');
    },
    error: (message, data) => {
        console.error(`[ERROR] ${message}`, data || '');
    }
};

console.log('✅ config.js 読み込み完了');
console.log('🔍 AppConfig確認:', {
    configExists: !!window.AppConfig,
    loggerExists: !!window.AppLogger,
    methodsAvailable: Object.keys(window.AppConfig || {})
});