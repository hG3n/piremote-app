import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {BaseHandlerService} from './base-handler.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../Message';
import {DbRequest} from './db_request';

@Injectable({
    providedIn: 'root'
})
export class DbService extends BaseHandlerService {

    private base_url: string;
    private route: string = '/db';

    constructor(http: HttpClient) {
        super(http);


        this.base_url = 'http://' + environment.host_ip + ':' + environment.host_port;
    }

    /**
     *
     */
    public getAvailableReceivers(): Observable<any> {
        let p = new HttpParams();
        p = p.set('fct', 'get_available_switchables');

        return super.get(this.base_url + this.route, p);
    }

    /**
     *
     * @param obj_id
     * @param alias
     */
    public setReceiverAlias(obj_id: number, alias: string): Observable<any> {

        const message: DbRequest = {
            function: 'set_receiver_alias',
            element_id: obj_id,
            field: 'alias',
            value: alias
        };

        return super.post(this.base_url + this.route, JSON.stringify(message));
    }
}
