export interface IUserActivation {
    id?: number;
    user?: number;
    activation_key?: number;
}

export class UserActivation implements IUserActivation {
    constructor(
        public id?: number,
        public user?: number,
        public activation_key?: number
    ) {
    }
}
