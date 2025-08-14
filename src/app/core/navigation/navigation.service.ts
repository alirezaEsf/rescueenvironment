import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject, tap } from 'rxjs';
import {AppSettings} from "../../AppSetting";
import {ConnectionService} from "../../../shared/repositories/connection.service";

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);
    constructor(private connectionService: ConnectionService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        if (!AppSettings.ServerSideNavigation){
            return this._httpClient.get<Navigation>('api/common/navigation').pipe(
                tap((navigation) => {
                    console.log(navigation);
                    this._navigation.next(navigation);
                })
            );
        }else {
            return this.connectionService.getConnection('getmenuitems', '').pipe(
                tap((navigation) => {
                    console.log(navigation);
                    this._navigation.next(navigation);
                })
            );
        }
    }

}
