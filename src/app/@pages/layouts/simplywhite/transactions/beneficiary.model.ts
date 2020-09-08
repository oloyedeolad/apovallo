import {IBank} from '../create-bank/bank.model';

export interface IBeneficiary {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    bank?: number;
    account?: string;
    user?: number;
}

export class Beneficiary implements IBeneficiary {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phone?: string,
        public bank?: number,
        public account?: string,
        public user?: number
    ) {
    }
}


export interface IReadBeneficiary {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    bank?: IBank;
    account?: string;
    user?: number;
}

export class ReadBeneficiary implements IReadBeneficiary {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phone?: string,
        public bank?: IBank,
        public account?: string,
        public user?: number
    ) {
    }
}
