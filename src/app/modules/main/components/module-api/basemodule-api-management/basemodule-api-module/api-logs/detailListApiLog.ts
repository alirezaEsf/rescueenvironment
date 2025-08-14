import {Component} from '@angular/core';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { AddCommaPipe } from '../../../../../../shared/pipes/add-comma.pipe';

@Component({
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
    standalone: true,
    imports: [
        TableModule,
        BreadcrumbsComponent,
        Panel,
        FormsModule,
        ButtonDirective,
        InputText,
        Tooltip,
        MoreChar19Pipe,
        ModuleTypePipe,
        HistoryMoreCharPipe,
        NgStyle,
        IsApprovalPipe,
        StatusPipe,
        Menu,
        Ripple,
        MediatorsJsonComponent,
        MediatorsComponent,
        NodeChangeListComponent,
        Dialog,
        TranslocoPipe,
        TranslocoDirective,
        ConfirmDialog,
        DropdownModule,
        NgIf,
        HeaderEndpointRegisterComponent,
        MatTooltip,

        MatIcon,
        Message,
        InputTextarea,
        NgClass,
        Checkbox,
        DbEnginePipe,
        Steps,
        AddCommaPipe,
    ],
})
export class DetailListApiLog {
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
