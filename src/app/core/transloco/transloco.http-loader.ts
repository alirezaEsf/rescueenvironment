import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private _httpClient = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get translation
     *
     * @param lang
     */
    getTranslation(lang: string): Observable<Translation> {
        return this._httpClient.get<Translation>(`${environment.apiBaseUrl}assets/i18n/${lang}.json`);
    }
}
