import moment from "moment";
import jsonDB from "../../../jsonDB.js";
import { CURRENCY_SYMBOLS } from "../../utils/consts.js";
import * as APICurrency from "../../services/currency/api.js"

class Currencybeacon {
    constructor() {
        this.url = 'https://api.currencybeacon.com/v1/latest';
        this._params = {
            api_key: 'gFjbF5uj2Objyumu2HK0kni7NttIo37C',
        };
    }

    set params(newParams) {
        this._params = { ...this._params, ...newParams };
    }
}


class Currency extends Currencybeacon {
    constructor(params = {}) {
        super()
        this.init(params);
    }

    async init(params) {
        this.params = {
            symbols: Object.keys(CURRENCY_SYMBOLS).join(','),
            ...this._params,
            ...params
        };
    }

    async fetch() {
        let currencies, base
        try {
            [currencies, base] = await Promise.all([
                jsonDB.getData("/cerrency"),
                jsonDB.getData("/cerrencyBase")
            ])
        } catch (error) { }

        if (!currencies || moment(currencies.date).date() < moment().date() || base !== currencies.base) {
            currencies = await APICurrency.currency(this.url, { base, ...this._params })
            await jsonDB.push("/cerrency", currencies);
        }

        return JSON.parse(JSON.stringify(currencies));
    }
}

export default Currency