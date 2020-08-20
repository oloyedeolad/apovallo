import {HttpClient, HttpResponse} from '@angular/common/http';
import {IBasicProfile} from '../basic-profile/basic-profile.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../../app.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../../../../util/request-util';
import {IPaymentRequest, ITransaction} from './transanction.model';
import {IExchangeRate} from './country.model';

type EntityResponseType = HttpResponse<IExchangeRate>;
type EntityResponseTypePay = HttpResponse<string>;
type EntityArrayResponseType = HttpResponse<IExchangeRate[]>;

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
    public resourceUrl = SERVER_API_URL + 'finance/exchangerate/all/';
    public resourceUrl2 = SERVER_API_URL + 'finance/paymentintent/';

    constructor(protected http: HttpClient) {}

    /*create(notification: ITransaction): Observable<EntityResponseType> {
        return this.http
            .post<ITransaction>(this.resourceUrl, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    createIntent(payRequest: IPaymentRequest): Observable<EntityResponseTypePay> {
        return  this.http
            .post<string>(this.resourceUrl2, payRequest, {observe: 'response'})
            .pipe(map((res: EntityResponseTypePay) => this.convertPayFromServer(res)));
    }*/

   /* update(notification: ITransaction, id: number): Observable<EntityResponseType> {
        return this.http
            .patch<ITransaction>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransaction>(`${this.resourceUrl}${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }*/

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExchangeRate[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

  /*  delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByUserId(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransaction>(`${this.resourceUrl}${id}/patient/`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findTotalBasedStatus(status: string): Observable<EntityArrayResponseType> {
        return this.http
            .get<ITransaction[]>(`${this.resourceUrl}${status}`, {  observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }*/

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

