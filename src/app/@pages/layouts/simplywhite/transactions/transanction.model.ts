import {IBank} from '../create-bank/bank.model';

export interface ITransaction {
    id?: number;
    user?: string;
    amount?: number;
    amount_recieved?: number;
    pay_ref?: string;
    created?: Date;
    currency?: string;
    customer?: string;
    description?: string;
    metadata?: IMetaData;
    txn_status?: string;
    transfer_status?: string;
    to_name?: string;
    to_email?: string;
    to_phone?: string;
    to_bank?: number;
    to_country?: string;
    from_country?: string;
    rate?: number;
    total?: number;
    beneficiary?: number;
    to_account_number?: string;
}

export class Transanction implements ITransaction {
    constructor(
        public id?: number,
        public amount?: number,
        public amount_recieved?: number,
        public pay_ref?: string,
        public created?: Date,
        public currency?: string,
        public customer?: string,
        public txn_status?: string,
        public transfer_status?: string,
        public description?: string,
        public metadata?: IMetaData,
        public to_name?: string,
        public to_email?: string,
        public to_phone?: string,
        public to_bank?: number,
        public to_country?: string,
        public from_country?: string,
        public rate?: number,
        public total?: number,
        public user?: string,
        public beneficiary?: number,
        public to_account_number?: string,
    ) {
    }
}


export interface IMetaData {
    OrderId?: string;
    Phone?: string;
    InvoiceId?: string;
    IP?: string;
}

export class MetaData implements IMetaData {
    constructor(
       public OrderId: string,
       public Phone: string,
       public InvoiceId: string,
       public IP: string,
    ) {
    }
}

export interface IPaymentRequest {
    amount: number;
    currency: string;
}

export class PaymentRequest implements IPaymentRequest {
    constructor(
        public amount: number,
        public currency: string
    ) {
    }
}


export interface ITransactionRead {
    id?: number;
    user?: string;
    amount?: number;
    amount_recieved?: number;
    pay_ref?: string;
    created?: Date;
    currency?: string;
    customer?: string;
    description?: string;
    metadata?: IMetaData;
    txn_status?: string;
    transfer_status?: string;
    to_name?: string;
    to_email?: string;
    to_phone?: string;
    to_bank?: IBank;
    to_country?: string;
    from_country?: string;
    rate?: number;
    total?: number;
    beneficiary?: number;
    to_account_number?: string;
}

export class TransanctionRead implements ITransactionRead {
    constructor(
        public id?: number,
        public amount?: number,
        public amount_recieved?: number,
        public pay_ref?: string,
        public created?: Date,
        public currency?: string,
        public customer?: string,
        public txn_status?: string,
        public transfer_status?: string,
        public description?: string,
        public metadata?: IMetaData,
        public to_name?: string,
        public to_email?: string,
        public to_phone?: string,
        public to_bank?: IBank,
        public to_country?: string,
        public from_country?: string,
        public rate?: number,
        public total?: number,
        public user?: string,
        public beneficiary?: number,
        public to_account_number?: string,
    ) {
    }
}
