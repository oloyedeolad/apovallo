import {HttpClient, HttpResponse} from '@angular/common/http';
import {IPaymentRequest, ITransaction} from '../transactions/transanction.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../../app.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../../../../util/request-util';
import {IBank, IReadBank} from './bank.model';

type EntityResponseType = HttpResponse<IBank>;
type EntityResponseTypePay = HttpResponse<IReadBank[]>;
type EntityArrayResponseType = HttpResponse<IBank[]>;

@Injectable({ providedIn: 'root' })
export class BankService {
    public resourceUrl = SERVER_API_URL + 'finance/bank/';
    public resourceUrl2 = SERVER_API_URL + 'finance/paymentintent/';

    constructor(protected http: HttpClient) {}

    create(notification: IBank): Observable<EntityResponseType> {
        return this.http
            .post<IBank>(this.resourceUrl, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    /*createIntent(payRequest: IBank): Observable<EntityResponseTypePay> {
        return  this.http
            .post<IBank>(this.resourceUrl2, payRequest, {observe: 'response'})
            .pipe(map((res: EntityResponseTypePay) => this.convertPayFromServer(res)));
    }*/

    update(notification: IBank, id: number): Observable<EntityResponseType> {
        return this.http
            .patch<IBank>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBank>(`${this.resourceUrl}${id}/`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityResponseTypePay> {
        const options = createRequestOption(req);
        return this.http
            .get<IReadBank[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityResponseTypePay) => res));
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByCountryId(id: number): Observable<EntityArrayResponseType> {
        return this.http
            .get<IBank[]>(`${this.resourceUrl}country/${id}/`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    findByStatus(status: string, user: string): Observable<EntityArrayResponseType> {
        return this.http
            .get<IBank[]>(`${this.resourceUrl}${status}/${user}/`, {  observe: 'response' })
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

