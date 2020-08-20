export interface ICountry {
    id: number;
    name: string;
    currency: string;
}

export class Country implements ICountry {
    constructor(
        public id: number,
        public name: string,
        public currency: string
    ) {
    }
}

export interface IExchangeRate {
    source_country: ICountry;
    destination_country: ICountry;
    id: number;
    rate: number;
} {
}

export class ExchangeRate implements IExchangeRate {
    constructor(
        public source_country: ICountry,
        public destination_country: ICountry,
        public id: number,
        public rate: number
    ) {
    }
}
