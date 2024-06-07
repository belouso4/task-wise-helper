import jsonDB from "../../../jsonDB.js";
import { CURRENCY_SYMBOLS } from "../../utils/consts.js";
import Currency from "../../services/currency/index.js";

export const getCurrency = async (ctx, base = undefined, number = 1) => {
    let currencies = await (new Currency().fetch())

    base ??= await jsonDB.getData("/cerrencyBase");
    ctx.session.baseCurrency = base
    ctx.session.numberCurrency = number

    const newBaseValue = currencies.rates[base]

    currencies.base = base;

    for (const [key, value] of Object.entries(currencies.rates)) {
        currencies.rates[key] = formatNumber(value / newBaseValue * number);
    }

    return {
        currencies,
        base: base + ' ' + CURRENCY_SYMBOLS[base]
    }
}

export function formatNumber(num) {
    let str = num.toString();
    let [integerPart, decimalPart] = str.split('.');

    if (integerPart.length >= 5) {
        return Number(integerPart);
    } else if (decimalPart) {
        let firstNonZeroIndex = str.search(/[1-9]/);
        return Number(str.substring(firstNonZeroIndex + 6, -1));
    } else {
        return num;
    }
}