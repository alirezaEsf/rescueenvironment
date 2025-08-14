import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../../constants/ApiGatewayConstants";

import {ModuleDto} from "../../../../models/ModuleDto";

import {ActivatedRoute} from "@angular/router";
import {ConfirmationService} from "primeng/api";
import {FuseLoadingService} from '../../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../../shared/services/ToastService';
import {MessagesApiFacadeService} from '../../../../services/messages-api-facade.service';
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import {KeyFilter} from 'primeng/keyfilter';
import {ToggleSwitch} from "primeng/toggleswitch";
import { Ripple } from 'primeng/ripple';
import { StyleClass } from 'primeng/styleclass';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { ApiGatewayService } from '../../../../services/api-gateway.service';


@Component({
    selector: 'app-module-api-add',
    templateUrl: './module-api-add.component.html',
    styleUrls: ['./module-api-add.component.scss'],
    providers: [ConfirmationService],
    standalone: true,
    imports: [
        Panel,
        FormsModule,
        InputText,
        DropdownModule,
        KeyFilter,
        ToggleSwitch,
        ButtonDirective,
        TranslocoPipe,
        ConfirmDialog,
        Ripple,
        StyleClass,
        BreadcrumbsComponent,
        Toast,

    ],
})
export class ModuleApiAddComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputParty;
    moduleDto: ModuleDto = {
        moduleGroup: null,
        partyId: null,
        moduleTitle: null,
        moduleType: null,
        moduleAuthMode: null,
        description: null,
        retryCount: null,
        delayRetryTime: null,
        esbMode: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
        status: null,
    };
    varChangeFlag: boolean = false;
    moduleTypeOptions = ApiGatewayConstants.moduleType;
    authenticationMethodOptions = ApiGatewayConstants.authenticationMethod;
    status;
    moduleTypeValue: number=null;
    moduleTitle: string = null;
    moduleGroup: number = null;
    moduleAuthMode: number = null;
    esbMode: number = null;
    description: string = null;
    retryCount: number = null;
    delayRetryTime: number = null;
    limitForPeriod: number = null;
    limitRefreshPeriod: number = null;
    partyId;
    title;
    detailsBreadObject = [];
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private apiGatewayService: ApiGatewayService,
        private confirmationService: ConfirmationService
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }
    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1:  this.transloco.translate('breadcrumbs.party'),
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.module'),
                        rout_index2: '',
                        isActive2: true,
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {    index: 3,
                        label_index3:this.transloco.translate('registerModule.header.registerModule'),
                        rout_index3: '/registerRule',
                        isActive3: true,
                        img_index3: 'assets/icons/save.png',},
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    ngOnInit(): void {
        this.scrollTop();
        this.status = true;
        this.partyId = this.inputParty.partyId;
        this.title = this.inputParty.title;
        this.varChangeFlag = false;
        this.detailsBreadObject= this.chooseBread('partyBase')
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }

    onCancel() {
        this.close.emit('close');
    }

    onAdd() {
        this.close.emit('closeAndCreate');
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
    confirm1() {
        this.confirmationService.confirm({
            message: this.transloco.translate('registerModule.message.sureDeactivateModule'),
            header:this.transloco.translate('module.dialog.header.deActiveModule') ,
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.onAccept(),
            reject: () => this.rejectFunc()
        });
    }


    rejectFunc() {
        console.log('عملیات لغو شد.');
        // مدیریت لغو عملیات
    }

    changeFlag() {
        debugger;
        this.varChangeFlag = true;
    }
    onRegister() {
        debugger;
        if (this.validation()) {
            debugger;
            if (this.varChangeFlag && this.status == false) {
                debugger;
                this.confirm1();
            } else {
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
            }
        }
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

    private onAccept() {
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
    }
}
