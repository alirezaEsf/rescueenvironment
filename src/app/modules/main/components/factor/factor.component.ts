import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import moment from 'jalali-moment';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { Constants } from '../../../shared/constants/Constants';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { AddCommaPipe } from '../../../shared/pipes/add-comma.pipe';
import { CastToDatePipe } from '../../../shared/pipes/cast-to-date.pipe';
import { NgIf, NgStyle } from '@angular/common';
import { BillStatusPipe } from '../../../shared/pipes/billStatus.pipe';
import { Ripple } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { FactorRegisterComponent } from './factor-register/factor-register.component';
import { TranslocoService } from '@ngneat/transloco';
import { Toast } from 'primeng/toast';


@Component({
    selector: 'app-factor',
    templateUrl: './factor.component.html',
    standalone: true,
    styleUrls: ['./factor.component.scss'],
    imports: [
        BreadcrumbsComponent,
        Panel,
        DropdownModule,
        FormsModule,
        ButtonDirective,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        AddCommaPipe,
        CastToDatePipe,
        NgStyle,
        BillStatusPipe,
        Ripple,
        Menu,
        FactorRegisterComponent,
        NgIf,
        Toast,
    ],
})
export class FactorComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    detailsBreadObject: any = null;
    addFlag: Boolean = false;
    updateFlag: Boolean = false;
    first: number = 0;
    rows: number = 10;
    factorList = [];
    tempFactor;
    items: any[] = [];
    partyListOptions = [{ title: '-', partyId: null }];
    moduleListOptions = [{ moduleTitle: '-', moduleId: null }];
    partyId: number = null;
    moduleId: number = null;
    clientId: number = null;
    categoryListOptions = Constants.categoryListOptions;
    category: any = null;
    clientListOptions = [{ name: '-', clientId: null }];
    apiListOptions = [{ title: '-', apiId: null }];
    partyModuleDisabled: boolean = true;
    apiDisabled: boolean = true;
    apiId: string = null;
    paginationLabel=this.transloco.translate('label.pagination.table');
    hideApiListOptions = [
        {
            apiId: null,
            moduleId: null,
            title: null,
            name: null,
            protocol: null,
            type: null,
            url: null,
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: null,
            description: null,
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            dailyCount: null,
            weeklyCount: null,
            monthlyCount: null,
            retryForHttpStatusCode: null,
            hasBody: null,
        },
    ];
    factorObj = {
        headerWage: '',
        partyTitle: null,
        moduleTitle: null,
        clientTitle: null,
        apiTitle: null,
        feeTitle: null,
        status: null,
        feeDetailCount: null,
        partyId: null,
        moduleId: null,
        apiId: null,
        clientId: null,
        feeId: null,
        apiFeeId: null,
        billId: null,
        fromDate: null,
        toDate: null,
        billDiscount: null,
        billTax: null,
        billAmount: null,
        billTotall: null,
        apiListOptions: [
            {
                apiId: null,
                moduleId: null,
                title: null,
                name: null,
                protocol: null,
                type: null,
                url: null,
                timeout: null,
                runningType: null,
                status: null,
                maxCall: null,
                callDuration: null,
                cashing_status: null,
                cashing_expire: null,
                description: null,
                retryCount: null,
                delayRetryCount: null,
                limitForPeriod: null,
                limitRefreshPeriod: null,
                logRequestStatus: null,
                logResponseStatus: null,
                reverseStatus: null,
                reverseCondition: null,
                cookeSendStatus: null,
                dailyCount: null,
                weeklyCount: null,
                monthlyCount: null,
                retryForHttpStatusCode: null,
                hasBody: null,
            },
        ],
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }
    display(factor) {
        this.factorObj.billId = factor.billId;
        this.factorObj.fromDate = factor.fromDate;
        this.factorObj.toDate = factor.toDate;
        this.factorObj.billTax = factor.billTax;
        this.factorObj.billDiscount = factor.billDiscount;
        this.factorObj.billAmount = factor.billAmount;
        this.factorObj.billTotall = factor.billTotall;
        this.addFlag = true;
        debugger;
    }
    pay(factor) {
        if (factor.billStatus == 3) {
            this.notifierService.showError({
                detail: 'فاکتور پرداخت شده است!',
                life: 3000,
            });
        } else {
            let registerBillObg = {
                billId: null,
                partyId: null,
                clientId: null,
                apiId: null,
                billAmount: null,
                billDiscount: null,
                billTax: null,
                billTotall: null,
                billDate: '',
                billStatus: null,
                paymentDate: '',
                fromDate: '',
                toDate: '',
            };
            registerBillObg.billId = factor.billId;
            registerBillObg.partyId = factor.partyId;
            registerBillObg.clientId = factor.clientId;
            registerBillObg.apiId = factor.apiId;
            registerBillObg.billAmount = factor.billAmount;
            registerBillObg.billDiscount = factor.billDiscount;
            registerBillObg.billTax = factor.billTax;
            registerBillObg.billTotall = factor.billTotall;
            registerBillObg.billDate = factor.billDate;
            registerBillObg.billStatus = factor.billStatus;
            registerBillObg.fromDate = factor.fromDate;
            registerBillObg.toDate = factor.toDate;
            registerBillObg.billStatus = 3;
            const m = moment();
            m.locale('fa');
            m.format('YY-MM-DD'); // it would be in jalali system
            let date;
            date = m.format('YYYYMMDD');
            registerBillObg.paymentDate = date;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .billRegister(registerBillObg)
                .subscribe(
                    (w) => {
                        this._primengProgressBarService.hide();
                        this.search();
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }
    ngOnInit(): void {
        this.items = [
            {
                items: [
                    {
                        label: 'مشاهده',
                        icon: '',
                        command: (): void => {
                            this.display(this.tempFactor);
                        },
                    },
                    {
                        label: 'پرداخت صورت حساب',
                        command: (): void => {
                            this.pay(this.tempFactor);
                        },
                    },
                ],
            },
            {
                label: '____________________________',
                items: [
                    {
                        label: this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
        this.scrollTop();
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallparty().subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.partyListOptions.push(...a);
                this.partyListOptions = this.partyListOptions.sort();
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
        this.detailsBreadObject = this.chooseBread('factorBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    search() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .billsearch(this.partyId, this.clientId, this.apiId)
            .subscribe(
                (i) => {
                    this._primengProgressBarService.hide();
                    this.factorList = [];
                    if (Array.isArray(i)) {
                        this.factorList = i;
                    } else {
                        this.factorList.push(...i);
                    }
                    for (let k = 0; k < this.factorList.length; k++) {
                        if ('row' in this.factorList) {
                        } else {
                            this.factorList[k] = Object.assign(
                                this.factorList[k],
                                { row: k + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    OnchangeParty(event) {
        if (event.value != null) {
            this.partyListOptions.forEach((s) => {
                if (s.partyId == event.value) {
                    this.factorObj.partyTitle = s.title;
                    this.factorObj.partyId = s.partyId;
                }
            });
            this.search();
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibypartyid(event.value).subscribe(
                (l) => {
                    this._primengProgressBarService.hide();
                    this.factorObj.apiListOptions = [];
                    this.hideApiListOptions = [];
                    this.apiListOptions = [{ title: '-', apiId: null }];
                    this.clientListOptions = [{ name: '-', clientId: null }];
                    if (Array.isArray(l)) {
                        this.apiListOptions = l;
                        this.hideApiListOptions = l;
                        this.apiListOptions.unshift({
                            title: '-',
                            apiId: null,
                        });
                    } else {
                        this.apiListOptions.push(...l);
                        this.hideApiListOptions.push(l);
                    }
                    this.factorObj.apiListOptions = this.hideApiListOptions;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        } else {
            this.apiListOptions = [{ title: '-', apiId: null }];
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.partyId = null;
            this.apiId = null;
            this.clientId = null;
            this.search();
        }
    }

    OnchangeClient(event) {
        if (event.value != null) {
            this.clientListOptions.forEach((s) => {
                if (s.clientId == event.value) {
                    this.factorObj.clientTitle = s.name;
                    this.factorObj.clientId = s.clientId;
                }
            });
            this.search();
        } else {
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.clientId = null;
            this.search();
        }
    }

    OnchangeApi(event) {
        if (event.value != null) {
            this.apiListOptions.forEach((s) => {
                if (s.apiId == event.value) {
                    this.factorObj.apiTitle = s.title;
                    this.factorObj.apiId = s.apiId;
                }
            });
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.search();
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.clientbyapiid(event.value).subscribe(
                (i) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(i)) {
                        this.clientListOptions = i;
                    } else {
                        this.clientListOptions.push(...i);
                    }
                    this.clientListOptions.unshift({
                        name: '-',
                        clientId: null,
                    });
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        } else {
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.apiId = null;
            this.clientId = null;
            this.search();
        }
    }

    showAdd() {
        if (this.partyId) {
            this.addFlag = true;
            this.factorObj.billId = null;
        } else {
            this.notifierService.showError({
                detail: 'لطفا سازمان را وارد کنید!',
                life: 3000,
            });
        }
    }

    onClose(e) {
        this.scrollTop();
        if (this.apiListOptions.length > 0) {
            if (
                this.apiListOptions[0].apiId != null &&
                this.apiListOptions[0].apiId != undefined
            ) {
                this.apiListOptions.unshift({ title: '-', apiId: null });
            }
        }

        this.search();
        this.addFlag = false;
    }

    clear() {
        this.factorList = [];
        this.clientId = null;
        this.apiId = null;
        this.apiListOptions = [{ title: '-', apiId: null }];
        this.clientListOptions = [{ name: '-', clientId: null }];
        this.partyId = null;
        this.factorObj = {
            headerWage: '',
            partyTitle: null,
            moduleTitle: null,
            clientTitle: null,
            apiTitle: null,
            feeTitle: null,
            status: null,
            feeDetailCount: null,
            partyId: null,
            moduleId: null,
            apiId: null,
            clientId: null,
            feeId: null,
            apiFeeId: null,
            billId: null,
            fromDate: null,
            toDate: null,
            billDiscount: null,
            billTax: null,
            billAmount: null,
            billTotall: null,
            apiListOptions: [
                {
                    apiId: null,
                    moduleId: null,
                    title: null,
                    name: null,
                    protocol: null,
                    type: null,
                    url: null,
                    timeout: null,
                    runningType: null,
                    status: null,
                    maxCall: null,
                    callDuration: null,
                    cashing_status: null,
                    cashing_expire: null,
                    description: null,
                    retryCount: null,
                    delayRetryCount: null,
                    limitForPeriod: null,
                    limitRefreshPeriod: null,
                    logRequestStatus: null,
                    logResponseStatus: null,
                    reverseStatus: null,
                    reverseCondition: null,
                    cookeSendStatus: null,
                    dailyCount: null,
                    weeklyCount: null,
                    monthlyCount: null,
                    retryForHttpStatusCode: null,
                    hasBody: null,
                },
            ],
        };
    }

    onKeydown(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.search();
        }
    }

    setRecord(factor) {
        debugger;
        this.tempFactor = factor;
    }

    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'factorBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'فاکتور',
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/factor.png',
                        label_Detail_index1: null,
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
}
