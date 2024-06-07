export const repeat = {
    'every minute': 60 * 1000,
    'every 5 minutes': 5 * 60 * 1000,
    'every hour': 60 * 60 * 1000,
    'every day': 60 * 60 * 24 * 1000,
    'every 2.5 months': 60 * 60 * 24 * 30 * 2.5 * 1000,
}

export const addTime = {
    'week': ['неделя', 7 * 60 * 60 * 24 * 1000],
    'month': ['месяц', 60 * 60 * 24 * 30 * 1000],
    '2 months': ['2 месяца', 60 * 60 * 24 * 30 * 2 * 1000],
    '2.5 months': ['2.5 месяца', 60 * 60 * 24 * 30 * 2.5 * 1000],
    '3 months': ['3 месяца', 60 * 60 * 24 * 30 * 3 * 1000],
}

export const CURRENCY_SYMBOLS = {
    USD: '🇺🇸',
    VND: '🇻🇳',
    THB: '🇹🇭',
    RUB: '🇷🇺',
    TRY: '🇹🇷',
    MYR: '🇲🇾',
}

export const LIST_OF_ADMINS = process.env.LIST_OF_ADMINS
    .split(',')
    .map(str => parseInt(str, 10))