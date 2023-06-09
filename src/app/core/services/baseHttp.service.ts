import {
    HttpClient,
    HttpErrorResponse,
    HttpEventType,
    HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export abstract class BaseHttp {

    currentUrl: string = environment.url;

    constructor(private http: HttpClient) {
        this.currentUrl = environment.url;
    }

    donation<T>(url: string, body: any): Observable<T> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http
            .post<T>(url, JSON.stringify(body), { headers: header })
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    permission<T>(url: string): Observable<T> {
        let bearer: any = localStorage.getItem('userToken');
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': bearer
        });
        return this.http.get<T>(url, { headers: header }).pipe(
            map((response) => response),
            catchError(this.handleError)
        );
    }


    get<T>(url: string): Observable<T> {
        let bearer: any = localStorage.getItem('userToken');
        const header = new HttpHeaders({
            'Content-Type': 'application/json;charset=utf-8',
            'token': bearer
        });

        return this.http.get<T>(url, { headers: header }).pipe(
            map((response) => response),
            catchError(this.handleError)
        );
    }

    post<T>(url: string, body: any): Observable<T> {
        let bearer: any = localStorage.getItem('userToken');
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': bearer
        });
        return this.http
            .post<T>(url, JSON.stringify(body), { headers: header })
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    postDonate<T>(url: string, body: any): Observable<T> {
        // let bearer: any = localStorage.getItem('userToken');
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http
            .post<T>(this.currentUrl + url, JSON.stringify(body), { headers: header })
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    deleteAPI<T>(url: string): Observable<T> {
        // let bearer: any = localStorage.getItem('userToken');
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'token': bearer
        });
        return this.http.delete<T>(url, { headers: header }).pipe(
            map((response) => response),
            catchError(this.handleError)
        );
    }

    postImg<T>(url: string, body: any): Observable<T> {
        let bearer: any = localStorage.getItem('userToken');
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': bearer
        });
        return this.http
            .post<T>(url, body, { headers: header })
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    login<T>(url: string, body: any): Observable<T> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .post<T>(this.currentUrl + url, JSON.stringify(body), { headers: header })
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }
    getRole<T>(url: string): Observable<T> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.get<T>(this.currentUrl + url, { headers: header }).pipe(
            map((response) => response),
            catchError(this.handleError)
        );
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        // console.log(error, 'handleError');
        if (error.error instanceof Error) {
            // Get client-side error
            console.log(error.error, 'client-side error');
            errorMessage = error.error.message;

            console.log(errorMessage)
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status} \n statusText: ${error.statusText} \n Message: ${error.message}`;

            console.log(errorMessage);
        }
        // this.openSnackBar(error,'error')
        return throwError(error);
    }

    getHeroes(): Observable<any> {
        return this.http.get<any>("ad")
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.MyAppHttp<any>('getHeroes', []))
            );
    }

    MyAppHttp<T>(arg0: string, arg1: never[]): (err: any, caught: Observable<ArrayBuffer>) => import("rxjs").ObservableInput < any > {
        throw new Error('Method not implemented.');
    }

    log(arg0: string): void {
        throw new Error('Method not implemented.');
    }

    logout<T>(url: string): Observable<T> {
        let bearer: any = localStorage.getItem('userToken');
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': bearer
        });
        this.currentUrl = environment.url;
        return this.http.get<T>(this.currentUrl + url, { headers: header }).pipe(
            map((response) => response),
            catchError(this.handleError)
        );
    }

}