import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModuleDto} from "../../../../../models/ModuleDto";
import {ApiGatewayConstants} from "../../../../../constants/ApiGatewayConstants";

import {ActivatedRoute} from "@angular/router";
import {ConfirmationService} from "primeng/api";
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
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { PartyDto } from '../../../../../models/partyDto';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { KeyFilter } from 'primeng/keyfilter';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
    selector: 'app-basemodule-api-add',
    templateUrl: './basemodule-api-add.component.html',
    styleUrls: ['./basemodule-api-add.component.scss'],
    providers: [ConfirmationService],
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
        KeyFilter,
        ToggleSwitch,
    ],
})
export class BasemoduleApiAddComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputParty: PartyDto;

    moduleDto: ModuleDto = {
        partyId: null,
        moduleTitle: '',
        moduleType: null,
        moduleGroup: null,
        moduleAuthMode: null,
        esbMode: null,
        status: null,
        description: '',
        retryCount: null,
        delayRetryTime: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
    };
    authenticationMethodOptions = ApiGatewayConstants.authenticationMethod;
    moduleTypeOptions = ApiGatewayConstants.moduleType;
    status;
    moduleTypeValue: number;
    moduleTitle;
    moduleGroup;
    moduleAuthMode;
    esbMode;
    description;
    retryCount;
    delayRetryTime;
    limitForPeriod;
    limitRefreshPeriod;
    partyId;
    title;
    temp;
    varChangeFlag: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiFacadeService: ApiGatewayService,
        private notifierService: ToastService,
        private confirmationService: ConfirmationService
    ) {}

    /* @HostListener("click", ["$event"])
     onClickEvent(event: Event) {
         debugger
         event.stopPropagation();
         debugger
         if (this.status==false){
             this.statusChange(1)
         }
     }*/
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    confirmDialog() {
        this.confirmationService.confirm({
            message: 'وضعیت این ماژول غیر فعال است، آیا از غیرفعالسازی این ماژول اطمینان دارید؟',
            accept: () => {
                debugger;
                this.moduleDto.esbMode = 0;
                this.moduleDto.moduleGroup = 0;
                this.moduleDto.partyId = Number(this.partyId);
                this.moduleDto.moduleTitle = this.moduleTitle;
                this.moduleDto.moduleType = this.moduleTypeValue;
                this.moduleDto.moduleAuthMode = this.moduleAuthMode;
                this.description != null
                    ? (this.moduleDto.description = this.description)
                    : (this.moduleDto.description = null);
                this.retryCount != null
                    ? (this.moduleDto.retryCount = this.retryCount)
                    : (this.moduleDto.retryCount = null);
                this.delayRetryTime != null
                    ? (this.moduleDto.delayRetryTime = this.delayRetryTime)
                    : (this.moduleDto.delayRetryTime = null);
                this.limitForPeriod != null
                    ? (this.moduleDto.limitForPeriod = this.limitForPeriod)
                    : (this.moduleDto.limitForPeriod = null);
                this.limitRefreshPeriod != null
                    ? (this.moduleDto.limitRefreshPeriod =
                          this.limitRefreshPeriod)
                    : (this.moduleDto.limitRefreshPeriod = null);
                this.status == true
                    ? (this.moduleDto.status = 1)
                    : (this.moduleDto.status = 0);

                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerModule(this.moduleDto)
                    .subscribe(
                        (Moduleresponse) => {
                            this._primengProgressBarService.hide();
                            this.close.emit('closeAndCreate');
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
                //Actual logic to perform a confirmation
            },
            reject: () => {
                debugger;

                // this.status=true
            },
        });
    }

    changeFlag() {
        debugger;
        this.varChangeFlag = true;
    }

    ngOnInit(): void {
        this.scrollTop();
        this.status = true;
        this.varChangeFlag = false;
        /*this.apiFacadeService.currentApprovalStageParty.subscribe(msg => {
            this.temp = msg

            ////console.log(this.temp)*/
        this.partyId = this.inputParty.partyId;
        this.title = this.inputParty.title;
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onCancel() {
        this.close.emit('close');
    }

    onAdd() {
        this.close.emit('closeAndCreate');
    }

    search() {
        /*   this.messagesApiFacadeService.searchbytitle(
               this.moduleTitle,
           ).subscribe(response=>{
               this.moduleList=response;
               // this.tblFlag=true;
           })*/
    }

    validation(): boolean {
        if (!this.moduleTitle) {
            this.notifierService.showError({
                detail: 'لطفا عنوان ماژول را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.moduleTypeValue) {
            this.notifierService.showError({
                detail: 'لطفا نوع ماژول را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.moduleAuthMode) {
            this.notifierService.showError({
                detail: 'لطفا شیوه احراز هویت را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onRegister() {
        debugger;
        if (this.validation()) {
            debugger;
            if (this.varChangeFlag && this.status == false) {
                debugger;
                this.confirmDialog();
            } else {
                debugger;
                this.moduleDto.esbMode = 0;
                this.moduleDto.moduleGroup = 0;
                this.moduleDto.partyId = Number(this.partyId);
                this.moduleDto.moduleTitle = this.moduleTitle;
                this.moduleDto.moduleType = this.moduleTypeValue;
                this.moduleDto.moduleAuthMode = this.moduleAuthMode;
                this.description != null
                    ? (this.moduleDto.description = this.description)
                    : (this.moduleDto.description = null);
                this.retryCount != null
                    ? (this.moduleDto.retryCount = this.retryCount)
                    : (this.moduleDto.retryCount = null);
                this.delayRetryTime != null
                    ? (this.moduleDto.delayRetryTime = this.delayRetryTime)
                    : (this.moduleDto.delayRetryTime = null);
                this.limitForPeriod != null
                    ? (this.moduleDto.limitForPeriod = this.limitForPeriod)
                    : (this.moduleDto.limitForPeriod = null);
                this.limitRefreshPeriod != null
                    ? (this.moduleDto.limitRefreshPeriod =
                          this.limitRefreshPeriod)
                    : (this.moduleDto.limitRefreshPeriod = null);
                this.status == true
                    ? (this.moduleDto.status = 1)
                    : (this.moduleDto.status = 0);
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerModule(this.moduleDto)
                    .subscribe((Moduleresponse) => {
                        this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
                    });
            }
        }
    }
}
