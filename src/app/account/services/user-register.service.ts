import {HttpClient, HttpResponse} from '@angular/common/http';
import {IUserProfile} from '../model/user.profile.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../app.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUser} from '../model/user.model';
import {createRequestOption} from '../../util/request-util';
import {ILogin} from '../model/login.model';
import {IUserActivation} from '../../@pages/layouts/simplywhite/user-activation/user-activation.model';


type EntityResponseType = HttpResponse<IUser>;
type EntityTwoResponseType = HttpResponse<ILogin>;
type EntityArrayResponseType = HttpResponse<IUser[]>;

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'account/register/';
  public resourceUrl2 = SERVER_API_URL + 'account/updatepass/';

  constructor(protected http: HttpClient) {}

  create(notification: IUser): Observable<EntityResponseType> {
    return this.http
      .post<IUser>(this.resourceUrl, notification, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  activate(notification: IUserActivation, id: number): Observable<EntityResponseType> {
    return this.http
        .patch<IUserActivation>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(notification: IUser, id: number): Observable<EntityResponseType> {
    return this.http
      .patch<IUser>(`${this.resourceUrl}${id}/`, notification, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updatePassword(notification: ILogin): Observable<EntityResponseType> {
    return this.http
        .patch<ILogin>(this.resourceUrl2, notification, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUser>(`${this.resourceUrl}${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' })
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
