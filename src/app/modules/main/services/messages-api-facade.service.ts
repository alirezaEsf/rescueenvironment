import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConnectionService } from '../../../../shared/repositories/connection.service';


@Injectable({
    providedIn: 'root',
})
export class MessagesApiFacadeService {
    constructor(
        private connectionService: ConnectionService,
    ) {
    }

    detailReportLog(requestlogid: number): Observable<any> {

        return this.connectionService.getConnection('requestlog/report/detail?' +
            (requestlogid ? 'requestlogid=' + requestlogid : '') +
            '', 'detailReportLog')

    }

}

