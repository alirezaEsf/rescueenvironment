import {Component} from '@angular/core';

import { AddCommaPipe } from '../../../shared/pipes/add-comma.pipe';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ApiGatewayService } from '../../services/api-gateway.service';


@Component({
    standalone: true,
    template: ` <div class="grid grid-cols-12">
        <div class="col-span-12" dir="ltr">
            <b style="color: #233B7C">API_NAME</b>:<br /><label class="normal-label"> {{
                API_NAME
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">API_TITLE</b>:<br /><label class="normal-label"> {{
                API_TITLE
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">ENDPOINT_URL</b>:<br /><label class="normal-label"> {{
                ENDPOINT_URL
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">MODULE_NAME</b>:<br /><label class="normal-label"> {{
                MODULE_NAME
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">PARTY_NAME</b>:<br /><label class="normal-label"> {{
                PARTY_NAME
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">REQUEST_BODY</b>:<br /><label class="normal-label"> {{
                REQUEST_BODY
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">REQUEST_URL</b>:<br /><label class="normal-label"> {{
                REQUEST_URL
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">RESPONSE</b>:<br /><label class="normal-label"> {{
                RESPONSE
            }}</label>
            <br />
            <hr />
            <br />
            <b style="color: #233B7C">FEE_AMOUNT</b>:<br /><label class="normal-label"> {{
                FEEAMOUNT | addCommaSeparator
            }}</label>
            <br />
        </div>
    </div>`,
    imports: [AddCommaPipe],
})
export class DetailList {
    API_NAME = null;
    API_TITLE = null;
    ENDPOINT_URL = null;
    MODULE_NAME = null;
    PARTY_NAME = null;
    REQUEST_BODY = null;
    REQUEST_URL = null;
    RESPONSE = null;
    FEEAMOUNT = null;

    requestlogid = null;

    constructor(
        public messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        public apiGatewayService: ApiGatewayService
    ) {}

    ngOnInit() {
        this._primengProgressBarService.show();
        this.apiGatewayService.currentApprovalStageRequestlogid.subscribe(
            (res) => {
                this._primengProgressBarService.hide();
                this.requestlogid = res;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .detailReportLog(this.requestlogid)
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    this.API_NAME = a.API_NAME;
                    this.API_TITLE = a.API_TITLE;
                    this.ENDPOINT_URL = a.ENDPOINT_URL;
                    this.MODULE_NAME = a.MODULE_NAME;
                    this.PARTY_NAME = a.PARTY_NAME;
                    this.REQUEST_BODY = a.REQUEST_BODY;
                    this.REQUEST_URL = a.REQUEST_URL;
                    this.RESPONSE = a.RESPONSE;
                    this.FEEAMOUNT = a.FEEAMOUNT;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }
}
