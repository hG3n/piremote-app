import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseHandlerService {

    constructor(private http: HttpClient) {
    }

    /**
     * Sends get request to given url
     * @param {string} url
     * @return {Observable<any>}
     */
    public get(url: string, params: HttpParams): Observable<any> {
        // return this.http.get(url, {params: params});
        return this.http.get(url, {params});
    }

    /**
     * Sends post request to given url with specified data
     * @param {string} url
     * @param body
     * @return {Observable<any>}
     */
    public post(url: string, params: any): Observable<any> {
        return this.http.post(url, params.toString());
    }
}
