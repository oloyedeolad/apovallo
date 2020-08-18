import {HttpClient, HttpResponse} from '@angular/common/http';
import {IBasicProfile} from './basic-profile.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../../app.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../../../../util/request-util';


type EntityResponseType = HttpResponse<IBasicProfile>;
type EntityArrayResponseType = HttpResponse<IBasicProfile[]>;

@Injectable({ providedIn: 'root' })
export class BasicProfileService {
    public resourceUrl = SERVER_API_URL + 'account/profile/';

    constructor(protected http: HttpClient) {}

    create(notification: IBasicProfile): Observable<EntityResponseType> {
        return this.http
            .post<IBasicProfile>(this.resourceUrl, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(notification: IBasicProfile, id: number): Observable<EntityResponseType> {
        return this.http
            .patch<IBasicProfile>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBasicProfile>(`${this.resourceUrl}${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBasicProfile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByPatientId(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBasicProfile>(`${this.resourceUrl}${id}/patient/`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        return res;
    }
}

