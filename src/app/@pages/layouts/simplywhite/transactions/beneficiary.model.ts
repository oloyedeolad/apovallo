export interface IBeneficiary {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    bank_name?: string;
    account?: string;
    user?: number;
}

export class Beneficiary implements IBeneficiary {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phone?: string,
        public bank_name?: string,
        public account?: string,
        public user?: number
    ) {
    }
}
