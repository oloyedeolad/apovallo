export interface IBank {
    id?: number;
    country?: number;
    name?: string;
    code?: string;
}

export class Bank implements IBank {
    constructor(
        public id?: number,
        public country?: number,
        name?: string,
        code?: string
    ) {
    }
}

export interface IReadBank {
    id?: number;
    country?: IBank;
    name?: string;
    code?: string;
}

export class BankRead implements IReadBank {
    constructor(
        public id?: number,
        public country?: IBank,
        name?: string,
        code?: string
    ) {
    }
}
