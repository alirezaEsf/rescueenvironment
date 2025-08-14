import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../../../../constants/ApiGatewayConstants";
import {ActivatedRoute} from "@angular/router";
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderEndpointRegisterComponent } from '../../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../../../services/api-gateway.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import {
    PersianCalendarComponent
} from '../../../../../../../shared/components/persian-calendar/persian-calendar.module';

@Component({
    selector: 'app-time-limitation-register',
    templateUrl: './time-limitation-register.component.html',
    styleUrls: ['./time-limitation-register.component.scss'],
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
        ToggleSwitch,
        PersianCalendarComponent,
    ],
})
export class TimeLimitationRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate
    limitTypeOptions = ApiGatewayConstants.limitType;
    limitType: string = null
    status: any = null
    limitId: any = null
    fromDate: string = ""
    fromTime: string = ""
    toDate: string = ""
    toTime: string = ""
    fullToDateTime: string = null
    fullFromDateTime: string = null
    formFieldsClass: string;
    repeatedly: boolean = true;
    headerLimit = 'headerLimit'
    repeatedlyDisabledFlag: boolean = false;
    objectTimeLimitation = {
        fromDateTime: null,
        toDateTime: null,
        limitType: null,
        apiId: null,
        status: null,
        limitId: null,
        repeatedly: null
    }

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        public translate: TranslocoService,
    ) {
    }

    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f)
            console.log(element)
            if (element) element.scrollIntoView(true)
        })
    }

    ngOnInit(): void {
        this.scrollTop()
        this.headerLimit = this.inputUpdate.headerLimit
        if (this.inputUpdate.updateFlag) {
            if (!this.inputUpdate.repeatedly) {
                this.fromTime = this.inputUpdate.fromDateTime.substring(11)
                this.fromDate = this.inputUpdate.fromDateTime.substring(0, 11)
                this.toTime = this.inputUpdate.toDateTime.substring(11)
                this.toDate = this.inputUpdate.toDateTime.substring(0, 11)
                this.inputUpdate.status == 1 ? this.status = true : this.status = false
                this.inputUpdate.repeatedly == 1 ? this.repeatedly = true : this.repeatedly = false
                this.inputUpdate.limitType != null ? this.limitType = (this.inputUpdate.limitType).toString() :
                    this.limitType = null
                this.limitId = this.inputUpdate.limitId
            } else {
                this.fromTime = this.inputUpdate.fromDateTime
                this.fromDate = ""
                this.toTime = this.inputUpdate.toDateTime
                this.toDate = ""
                this.inputUpdate.status == 1 ? this.status = true : this.status = false
                this.inputUpdate.repeatedly == 1 ? this.repeatedly = true : this.repeatedly = false
                this.inputUpdate.limitType != null ? this.limitType = (this.inputUpdate.limitType).toString() :
                    this.limitType = null
                this.limitId = this.inputUpdate.limitId
            }
            this.repeatedly == true ? this.repeatedlyDisabledFlag = true : this.repeatedlyDisabledFlag = false
            this.repeatedly == true ? this.fromDate = "" : this.repeatedlyDisabledFlag = false
            this.repeatedly == true ? this.toDate = "" : this.repeatedlyDisabledFlag = false
        } else {
            this.status = true;
            this.repeatedly = false;
        }

    }

    onCancel() {
        this.close.emit('close');
    }

    onChangRepeatedly() {
        this.repeatedly == true ? this.repeatedlyDisabledFlag = true : this.repeatedlyDisabledFlag = false
        this.repeatedly == true ? this.fromDate = "" : this.repeatedlyDisabledFlag = false
        this.repeatedly == true ? this.toDate = "" : this.repeatedlyDisabledFlag = false
    }

    onKeydown(event) {
        let self = this
        if (event.key === "Enter") {
            self.onRegister();
        }
    }

    resetTime() {
        this.fromTime = "000000000"
        this.toTime = "235959999"
    }

    onRegister() {
        if (this.validationLimit()) {
            this.fullFromDateTime = null
            this.fullToDateTime = null
            this.formFieldsClass = 'elementHasError';
            let testArray = document.getElementsByClassName('ng-invalid');
            for (let i = 0; i < testArray.length; i++) {
                testArray[i].className += " ng-dirty";
            }
            this._primengProgressBarService.show()
            this.apiGatewayService.currentApprovalStageApiId.subscribe(res => {
                this._primengProgressBarService.hide()
                this.objectTimeLimitation.apiId = res
            },error => {
                this._primengProgressBarService.hide()
            })
            if (this.toDate != "" && this.toDate != null) {
                this.toDate = this.toDate.replace(/[/]/g, '')
                this.toDate = this.toDate.replace(/[' ']/g, '')
            }
            if (this.fromDate != "" && this.fromDate != null) {
                this.fromDate = this.fromDate.replace(/[/]/g, '')
                this.fromDate = this.fromDate.replace(/[' ']/g, '')
            }
            if (this.toTime != "" && this.toTime != null) {
                this.toTime = this.toTime.replace(/[:]/g, '')
                this.toTime = this.toTime.replace(/[.]/g, '')
            }
            if (this.fromTime != "" && this.fromTime != null) {
                this.fromTime = this.fromTime.replace(/[:]/g, '')
                this.fromTime = this.fromTime.replace(/[.]/g, '')
            }
            if (this.toTime == "") {
                this.toTime = "000000000"
            }
            this.fullToDateTime = this.toDate + this.toTime
            if (this.toTime.length == 9) {
                this.objectTimeLimitation.toDateTime = this.fullToDateTime
            } else if (this.fullToDateTime.length < 14) {
                this.objectTimeLimitation.toDateTime = this.fullToDateTime + "59999"
            } else {
                this.objectTimeLimitation.toDateTime = this.fullToDateTime
            }
            if (this.fromTime == "") {
                this.fromTime = "000000000"
            }
            this.fullFromDateTime = this.fromDate + this.fromTime
            if (this.fromTime.length == 9) {
                this.objectTimeLimitation.fromDateTime = this.fullFromDateTime
            } else if (this.fullFromDateTime.length < 14) {
                this.objectTimeLimitation.fromDateTime = this.fullFromDateTime + "00000"
            } else {
                this.objectTimeLimitation.fromDateTime = this.fromDate + this.fromTime
            }
            this.objectTimeLimitation.limitType = Number(this.limitType)
            this.status == true ? this.objectTimeLimitation.status = 1 : this.objectTimeLimitation.status = 0
            this.repeatedly == true ? this.objectTimeLimitation.repeatedly = 1 : this.objectTimeLimitation.repeatedly = 0
            if (this.inputUpdate.updateFlag) {
                this.objectTimeLimitation.limitId = this.limitId
            } else {
                delete this.objectTimeLimitation.limitId
            }
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.savelimit(this.objectTimeLimitation).subscribe(a => {
                this._primengProgressBarService.hide()
                this.close.emit('closeAndCreate');
            },error => {
                this._primengProgressBarService.hide()
            })
        }
    }

    validationLimit(): boolean {

        if (this.toDate != "" && this.toDate != null) {
            this.toDate = this.toDate.replace(/[/]/g, '')
            this.toDate = this.toDate.replace(/[' ']/g, '')
        }
        if (this.fromDate != "" && this.fromDate != null) {
            this.fromDate = this.fromDate.replace(/[/]/g, '')
            this.fromDate = this.fromDate.replace(/[' ']/g, '')
        }
        if (this.toTime != "" && this.toTime != null) {
            this.toTime = this.toTime.replace(/[:]/g, '')
        }
        if (this.fromTime != "" && this.fromTime != null) {
            this.fromTime = this.fromTime.replace(/[:]/g, '')
        }

        if ((this.limitType == "") || (this.limitType == null)) {
            this.notifierService.showError({
                detail: "لطفا نوع محدودیت را وارد کنید!",
                life: 3000
            });
            return false
        }
        if (this.limitType == '1' && !this.repeatedly) {
            if ((this.fromDate == null || this.fromDate == "")) {
                this.notifierService.showError({
                    detail: "لطفا تاریخ شروع را وارد کنید!",
                    life: 3000
                });
                return false
            }
            if (this.fromTime == "" || this.fromTime == null) {
                this.notifierService.showError({
                    detail: "لطفا ساعت شروع را وارد کنید!",
                    life: 3000
                });
                return false
            }
        }
        if (this.repeatedly) {
            if (this.fromTime == "" || this.fromTime == null) {
                this.notifierService.showError({
                    detail: "لطفا ساعت شروع را وارد کنید!",
                    life: 3000
                });
                return false
            }
            if (this.toTime == null || this.toTime == "") {
                this.notifierService.showError({
                    detail: "لطفا ساعت پایان را وارد کنید!",
                    life: 3000
                });
                return false
            }
        }
        if (this.limitType == '2' && !this.repeatedly) {
            if ((this.fromDate == null || this.fromDate == "")) {
                this.notifierService.showError({
                    detail: "لطفا تاریخ شروع را وارد کنید!",
                    life: 3000
                });
                return false
            }
            if ((this.toDate == null || this.toDate == "") && !this.repeatedly) {
                this.notifierService.showError({
                    detail: "لطفا تاریخ پایان را وارد کنید!",
                    life: 3000
                });
                return false
            }
            if (this.fromTime == "" || this.fromTime == null) {
                this.notifierService.showError({
                    detail: "لطفا ساعت شروع را وارد کنید!",
                    life: 3000
                });
                return false
            }
            if (this.toTime == null || this.toTime == "") {
                this.notifierService.showError({
                    detail: "لطفا ساعت پایان را وارد کنید!",
                    life: 3000
                });
                return false
            }
        }
        if (this.fromDate > this.toDate) {
            this.notifierService.showError({
                detail: "لطفا بازه تاریخ معتبر را وارد کنید!",
                life: 3000
            });
            return false
        }
        if ((this.toDate == this.fromDate)) {
            if (this.fromTime > this.toTime) {
                this.notifierService.showError({
                    detail: "لطفا بازه ساعت معتبر را وارد کنید!",
                    life: 3000
                });
                return false
            }

        }

        if (this.repeatedly) {
            if ((this.fromTime == "" || this.toTime == "") ||
                (this.fromTime == "00000000" || this.toTime == "00000000")) {

                this.notifierService.showError({
                    detail: "لطفا بازه ساعت معتبر را وارد کنید!",
                    life: 3000
                });
                return false
            }
        }
        return true
    }
}
