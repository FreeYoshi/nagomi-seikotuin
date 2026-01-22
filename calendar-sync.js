// 汎用カレンダー連携モジュール
// Google Apps ScriptなどのWebhookエンドポイントに予約内容を送信することを想定
(function(global) {
    const DEFAULT_TIMEOUT = 10000; // 10秒タイムアウト

    function getConfig() {
        return global.AppConfig?.calendarIntegration || {};
    }

    function buildHeaders(config) {
        const headers = { 'Content-Type': 'application/json' };
        if (config.authToken) {
            headers['Authorization'] = `Bearer ${config.authToken}`;
        }
        if (config.additionalHeaders && typeof config.additionalHeaders === 'object') {
            Object.entries(config.additionalHeaders).forEach(([key, value]) => {
                if (typeof value === 'string' && value.trim()) {
                    headers[key] = value;
                }
            });
        }
        return headers;
    }

    function normalizeReservationPayload(reservation) {
        if (!reservation || !reservation.datetime) {
            throw new Error('予約データが不足しています');
        }

        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Tokyo';
        return {
            id: reservation.id || reservation.reservationId,
            name: reservation.name,
            phone: reservation.phone,
            email: reservation.email,
            course: reservation.course,
            datetime: reservation.datetime,
            durationMinutes: reservation.durationMinutes || 30,
            notes: reservation.notes || '',
            isNewCustomer: reservation.is_new_customer ?? reservation.isNewCustomer ?? null,
            referralSource: reservation.referral_source || reservation.referralSource || null,
            timezone: tz
        };
    }

    async function postWithTimeout(url, options, timeout = DEFAULT_TIMEOUT) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timer);
            return response;
        } catch (error) {
            clearTimeout(timer);
            throw error;
        }
    }

    async function syncCalendar(action, reservation) {
        const config = getConfig();
        if (!config.enabled || !config.endpoint) {
            return { skipped: true, reason: 'calendar integration disabled' };
        }

        const payload = {
            action,
            reservation: normalizeReservationPayload(reservation)
        };

        try {
            const response = await postWithTimeout(config.endpoint, {
                method: 'POST',
                headers: buildHeaders(config),
                body: JSON.stringify(payload)
            }, config.timeout || DEFAULT_TIMEOUT);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP ${response.status}: ${text}`);
            }

            let data = null;
            try {
                data = await response.json();
            } catch (_) {
                data = { success: true };
            }
            return data;
        } catch (error) {
            console.error('[CalendarSync] カレンダー連携に失敗しました:', error);
            return { error };
        }
    }

    global.CalendarSync = {
        sync: syncCalendar
    };
})(window);
