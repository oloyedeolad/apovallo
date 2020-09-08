
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IBasicProfile} from '../basic-profile/basic-profile.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../../app.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../../../../util/request-util';
import {IPaymentRequest, ITransaction} from './transanction.model';
import {IBeneficiary, IReadBeneficiary} from './beneficiary.model';

type EntityResponseType = HttpResponse<IBeneficiary>;
type EntityResponseTypePay = HttpResponse<IReadBeneficiary>;
type EntityResponseTypeArray = HttpResponse<IReadBeneficiary[]>;
type EntityArrayResponseType = HttpResponse<IBeneficiary[]>;

@Injectable({ providedIn: 'root' })
export class BeneficiaryService {
    public resourceUrl = SERVER_API_URL + 'account/beneficiary/';
    public resourceUrl2 = SERVER_API_URL + 'finance/paymentintent/';

    constructor(protected http: HttpClient) {}

    create(notification: IBeneficiary): Observable<EntityResponseType> {
        return this.http
            .post<IBeneficiary>(this.resourceUrl, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

  /*  createIntent(payRequest: IPaymentRequest): Observable<EntityResponseTypePay> {
        return  this.http
            .post<string>(this.resourceUrl2, payRequest, {observe: 'response'})
            .pipe(map((res: EntityResponseTypePay) => this.convertPayFromServer(res)));
    }*/

    update(notification: IBeneficiary, id: number): Observable<EntityResponseType> {
        return this.http
            .patch<IBeneficiary>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseTypePay> {
        return this.http
            .get<IReadBeneficiary>(`${this.resourceUrl}${id}/`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypePay) => res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBeneficiary[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByUserId(id: number): Observable<EntityResponseTypeArray> {
        return this.http
            .get<IReadBeneficiary[]>(`${this.resourceUrl}${id}/my`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeArray) => res));
    }

    findByStatus(status: string, user: string): Observable<EntityArrayResponseType> {
        return this.http
            .get<IBeneficiary[]>(`${this.resourceUrl}${status}/${user}/`, {  observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        return res;
    }
    protected convertPayFromServer(res: EntityResponseTypePay): EntityResponseTypePay {
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        return res;
    }
}

