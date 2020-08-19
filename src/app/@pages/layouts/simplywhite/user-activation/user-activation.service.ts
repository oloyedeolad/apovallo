import {HttpClient, HttpResponse} from '@angular/common/http';
import {IUser} from '../../../../account/model/user.model';
import {ILogin} from '../../../../account/model/login.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../../app.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUserActivation} from './user-activation.model';
import {createRequestOption} from '../../../../util/request-util';


type EntityResponseType = HttpResponse<IUserActivation>;
type EntityTwoResponseType = HttpResponse<IUserActivation>;
type EntityArrayResponseType = HttpResponse<IUserActivation>;

@Injectable({ providedIn: 'root' })
export class UserActivationService {
    public resourceUrl = SERVER_API_URL + 'account/activate/';

    constructor(protected http: HttpClient) {}

    create(notification: IUserActivation): Observable<EntityResponseType> {
        return this.http
            .post<IUser>(this.resourceUrl, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    activate(notification: IUserActivation): Observable<EntityResponseType> {
        return this.http
            .post<IUserActivation>(this.resourceUrl, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(notification: IUserActivation, id: number): Observable<EntityResponseType> {
        return this.http
            .patch<IUserActivation>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    updatePassword(notification: IUserActivation, id: number): Observable<EntityResponseType> {
        return this.http
            .patch<IUserActivation>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IUserActivation>(`${this.resourceUrl}${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUserActivation>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        return res;
    }
}
