import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import moment from 'jalali-moment';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { PrintService } from '../../../../shared/services/print.service';
import { CommonValidationsService } from '../../../../shared/validators/common-validations.service';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { TableModule } from 'primeng/table';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { NgIf, NgStyle } from '@angular/common';
import { ThreeDotBreadcrumbPipe } from '../../../../shared/pipes/threeDotBreadcrumb.pipe';
import { Tooltip } from 'primeng/tooltip';
import { Panel } from 'primeng/panel';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { CastToDatePipe } from '../../../../shared/pipes/cast-to-date.pipe';
import { AddCommaPipe } from '../../../../shared/pipes/add-comma.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { Dialog } from 'primeng/dialog';
import { MoreCharLongPipe } from '../../../../shared/pipes/moreCharLong.pipe';
import { StatusPipe } from '../../../../shared/pipes/status.pipe';
import { Constants } from '../../../../shared/constants/Constants';

@Component({
    selector: 'app-factor-register',
    templateUrl: './factor-register.component.html',
    standalone: true,
    styleUrls: ['./factor-register.component.scss'],
    imports: [
        TableModule,
        Checkbox,
        FormsModule,
        ButtonDirective,
        TranslocoPipe,
        NgStyle,
        ThreeDotBreadcrumbPipe,
        Tooltip,
        Panel,
        TranslocoDirective,
        MoreChar19Pipe,
        CastToDatePipe,
        AddCommaPipe,
        NgIf,
        Menu,
        Ripple,
        Dialog,
        MoreCharLongPipe,
        StatusPipe,
    ],
})
export class FactorRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() factorObj;
    previewObj = {
        billList: [],
    };
    selectFlag: boolean = true;
    registerObg = {
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
    headPartyTitle;
    billTotall: number = 0;
    billDiscount: number = null;
    countSelected: number = 0;
    billTax: number = null;
    billAmount: number = null;
    titleCategory1 = 'سازمان';
    partyTitle;
    partyId: number = null;
    countApi;
    countApiTitle = 'سرویس';
    fromDate;
    toDate;
    factorConstant = Constants;
    titleCategory2: string = '';
    clientTitle: string = '';
    clientFlag: boolean = false;
    apiTitle: string = '';
    apiList = [];
    detailList = [];
    summaryList = [];
    dialogApisFlag: boolean = false;
    detailFlag: boolean = false;
    previewFlag: boolean = false;
    changeFlag: boolean = false;
    displayFlag: boolean = false;
    loading: boolean;
    apiListOptions = [{ title: '-', apiId: null }];
    clientListOptions = [
        {
            name: '-',
            partyId: null,
            allowedAccountno: null,
            apikey: null,
            clientId: null,
            digitalPublickey: null,
            mobileNo: null,
            organizationCode: null,
            publicKey: null,
            status: null,
        },
    ];
    rows: number = 10;
    first: number = 0;
    clientId: number = null;
    apiId: number = null;
    items;
    tempFactor;
    pageno: number = 0;
    pagesize = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    billList = [];
    billId;
    hidePrint: boolean = true;
    dateFactoor;
    checkedAllItems;
    selectedItem: any[];
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private route: ActivatedRoute,
        private print: PrintService,
        private commonValidationsService: CommonValidationsService,
        private _primengProgressBarService: FuseLoadingService,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {}

    onRowSelect(event) {
        if (this.selectedItem.indexOf(event.data) === -1) {
            this.selectedItem.push(event.data);
        }
        if (this.summaryList.length == this.selectedItem.length) {
            this.checkedAllItems = true;
        }
        console.log('this.selectedItem', this.selectedItem);
        this.billTotall = 0;
        this.countSelected = 0;
        for (let i = 0; i < this.selectedItem.length; i++) {
            this.billTotall += this.selectedItem[i].totalFeeAmount;
            /* this.billList = []*/
        }
        this.countSelected = this.selectedItem.length;
        this.cal(1);
    }

    onRowUnselect(event) {
        this.selectedItem = this.selectedItem.filter((x) => {
            return x.summaryId != event.data.summaryId;
        });
        if (this.summaryList.length != this.selectedItem.length) {
            this.checkedAllItems = false;
        }
        console.log('remove', this.selectedItem);
        this.billTotall = 0;
        this.countSelected = 0;
        for (let i = 0; i < this.selectedItem.length; i++) {
            this.billTotall += this.selectedItem[i].totalFeeAmount;
            /* this.billList = []*/
        }
        this.countSelected = this.selectedItem.length;
        this.cal(1);
    }

    setRecord(factor) {
        this.tempFactor = factor;
    }

    selectAllItems() {
        if (this.checkedAllItems) {
            if (this.validation()) {
                this.billTotall = 0;
                this.billAmount = this.billTotall = 0;
                this.countSelected = 0;
                this.selectedItem = this.summaryList;
                for (let i = 0; i < this.selectedItem.length; i++) {
                    this.billTotall += this.selectedItem[i].totalFeeAmount;
                    /* this.billList = []*/
                }
                this.countSelected = this.selectedItem.length;
                this.cal(1);
                // this.changeFlag = false
            }
        } else {
            this.selectedItem = [];
            this.countSelected = 0;
            this.billTotall = 0;
            this.billAmount = 0;
            this.cal(1);
        }
    }

    onCancel() {
        this.partyId = null;
        this.clientId = null;
        this.apiId = null;
        this.billTotall = 0;
        this.billTax = null;
        this.billDiscount = null;
        this.billAmount = null;
        this.fromDate = null;
        this.toDate = null;
        this.registerObg = {
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
        this.close.emit('close');
    }

    validationRegister() {
        if (!this.fromDate) {
            this.notifierService.showError({
                detail: 'لطفا تاریخ شروع را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.toDate) {
            this.notifierService.showError({
                detail: 'لطفا تاریخ پایان را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.fromDate > this.toDate) {
            this.notifierService.showError({
                detail: 'لطفا بازه تاریخ معتبر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.commonValidationsService.maximumDateBeforeDayChecker(
                this.toDate
            )
        ) {
            this.notifierService.showError({
                detail: 'حداکثر تاریخ پایان روز قبل از روزجاری می تواند باشد!',
                life: 3000,
            });
            return false;
        } else if (!this.billTotall) {
            this.notifierService.showError({
                detail: 'صورتحساب نمی تواند صفر باشد!',
                life: 3000,
            });
            return false;
        } else if (this.selectedItem.length == 0) {
            this.notifierService.showError({
                detail: 'موارد را جهت صدور فاکتور انتخاب کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    getStyleSheetElement() {
        const styleSheetElement = document.createElement('link');
        document.querySelectorAll('link').forEach((htmlElement) => {
            if (htmlElement.rel === 'stylesheet') {
                const absoluteUrl = new URL(htmlElement.href).href;
                styleSheetElement.rel = 'stylesheet';
                styleSheetElement.href = absoluteUrl;
            }
        });
        return styleSheetElement;
    }

    onPrint() {
        this.hidePrint = false;
        // this.previewFlag = true
        // setTimeout(() => {
        //     this.print.printDiv('previewId');
        // this.previewFlag = false
        // }, 100);
        this.previewFlag = true;
        setTimeout(() => {
            var WinPrint = window.open(
                '',
                '',
                'left=100,top=0,width=1200,height=12000,toolbar=0,scrollbars=0,status=0'
            );
            /*  document.body.innerHTML =
                  '<html><head></head><body>' +
                  divElements + '</body></html>';*/
            let divElements = document.getElementById('previewId').innerHTML;
            WinPrint.document.body.innerHTML =
                '<html ><head>' +
                /* '<link rel="stylesheet" type="text/css" href="./factor-register.component.scss">' +*/
                '</head><body>' +
                divElements +
                '</body></html>';
            /*    WinPrint.document.write(
                  '<html><head></head><body>' +
                  divElements + '</body></html>');*/
            WinPrint.document.close();
            WinPrint.focus();
            document
                .querySelectorAll(
                    'link, style,.invoice,.wrapper-invoice,.invoice-head'
                )
                .forEach((htmlElement) => {
                    WinPrint.document.head.appendChild(
                        htmlElement.cloneNode(true)
                    );
                });
            let styleSheetElement = this.getStyleSheetElement();
            WinPrint.document.head.appendChild(styleSheetElement);
            setTimeout(() => {
                WinPrint.print();
                WinPrint.close();
                this.previewFlag = false;
                //Restore orignal HTML
                // document.body.innerHTML = oldPage;
            }, 500);
        }, 100);
    }

    onRegister() {
        if (this.validationRegister()) {
            this.registerObg.partyId = this.partyId;
            this.registerObg.clientId = this.clientId;
            this.registerObg.apiId = this.apiId;
            this.registerObg.billTotall = this.billTotall;
            this.registerObg.billTax = this.billTax;
            this.registerObg.billDiscount = this.billDiscount;
            this.registerObg.billAmount = this.billAmount;
            this.registerObg.fromDate = this.fromDate;
            this.registerObg.toDate = this.toDate;
            this.registerObg.billStatus = 1;
            const m = moment();
            m.locale('fa');
            m.format('YY-MM-DD'); // it would be in jalali system
            let date;
            date = m.format('YYYYMMDD');
            this.registerObg.billDate = date;
            this.registerObg.paymentDate = null;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .billRegister(this.registerObg)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        console.log('billList', this.billList);
                        if (this.selectedItem.length != 0) {
                            this.selectedItem.forEach((item) => {
                                console.log('billListItem', item);
                                let obj = {
                                    summaryId: 0,
                                    billId: 0,
                                };
                                obj.summaryId = item.summaryId;
                                obj.billId = a.billId;
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .summarybillRegister(obj)
                                    .subscribe(
                                        (g) => {
                                            this._primengProgressBarService.hide();
                                            console.log('g', g);
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        }
                                    );

                                this.partyId = null;
                                this.clientId = null;
                                this.apiId = null;
                                this.billTotall = null;
                                this.billTax = null;
                                this.billDiscount = null;
                                this.billAmount = null;
                                this.fromDate = null;
                                this.toDate = null;
                                this.registerObg = {
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
                                this.close.emit('close');
                            });
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    openDialog() {
        if (this.countApi > 0) {
            this.dialogApisFlag = true;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    cal(event) {
        if (this.billDiscount && this.billTax) {
            this.billAmount = Number(this.billTotall) + Number(this.billTax);
            this.billAmount =
                Number(this.billAmount) - Number(this.billDiscount);
        } else if (!this.billDiscount && !this.billTax) {
            this.billAmount = this.billTotall;
        } else {
            if (this.billDiscount) {
                this.billAmount =
                    Number(this.billTotall) - Number(this.billDiscount);
            }
            if (this.billTax) {
                this.billAmount =
                    Number(this.billTotall) + Number(this.billTax);
            }
        }
    }

    detail(factor) {
        this.loading = true;
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getsummarydetailinfo(
                factor.partyId,
                factor.clientId,
                factor.apiId,
                factor.summaryDate,
                this.pagesize,
                this.pageno
            )
            .subscribe(
                (r) => {
                    this._primengProgressBarService.hide();
                    this.detailList = [];
                    if (Array.isArray(r)) {
                        this.detailList = r;
                    } else {
                        this.detailList.push(...r);
                    }
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.detailList.length; u++) {
                            this.detailList[u] = Object.assign(
                                this.detailList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.detailList.length; u++) {
                            this.detailList[u] = Object.assign(
                                this.detailList[u],
                                { row: u + this.pagesize + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.detailList.length; u++) {
                            this.detailList[u] = Object.assign(
                                this.detailList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                    console.log('detailList', this.detailList);
                    console.log('r', r);
                    this.loading = false;
                    this.detailFlag = true;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    addToFactor(factor) {
        if (!this.displayFlag) {
            for (let k = 0; k < this.summaryList.length; k++) {
                if (this.summaryList[k].summaryId == factor.summaryId) {
                    this.summaryList[k] = Object.assign(this.summaryList[k], {
                        toBill: '1',
                    });
                }
            }
            console.log('summaryList', this.summaryList);
            factor.toBill = '1';
            if (this.billList.indexOf(factor) === -1) {
                this.billList.push(factor);
            }
            console.log('billList', this.billList);
            console.log('billTotall', this.billTotall);
            this.billTotall = 0;
            this.countSelected = 0;
            this.billList.forEach((a) => {
                this.countSelected += 1;
                this.billTotall += a.totalFeeAmount;
            });
            this.billAmount = this.billTotall;
            this.cal(1);
            console.log('billTotall', this.billTotall);
        }
    }

    deleteToFactor(factor) {
        if (!this.displayFlag) {
            for (let k = 0; k < this.summaryList.length; k++) {
                if (this.summaryList[k].summaryId == factor.summaryId) {
                    this.summaryList[k] = Object.assign(this.summaryList[k], {
                        toBill: '0',
                    });
                }
            }
            console.log('summaryList', this.summaryList);
            console.log('beforbillList', this.billList);
            if (this.billList.indexOf(factor) != -1) {
                let index = this.billList.findIndex(
                    (obj) => obj.row === factor.row
                );
                this.billList.splice(index, 1);
            }

            console.log('afterbillList', this.billList);
            console.log('billTotall', this.billTotall);
            this.billTotall = 0;
            this.countSelected = 0;
            this.billList.forEach((a) => {
                this.countSelected += 1;
                this.billTotall += a.totalFeeAmount;
            });
            this.billAmount = this.billTotall;
            this.cal(1);
            console.log('billTotall', this.billTotall);
        }
    }

    ngOnInit(): void {
        this.displayFlag = false;
        this.scrollTop();
        if (
            this.factorObj.apiListOptions != undefined &&
            this.factorObj.apiListOptions.length > 0
        ) {
            if (this.factorObj.apiListOptions[0].apiId == null) {
                this.factorObj.apiListOptions.splice(0, 1);
            }
        }
        if (
            this.factorObj.partyTitle != null &&
            this.factorObj.partyTitle != undefined &&
            this.factorObj.partyTitle != '-'
        ) {
            this.partyId = this.factorObj.partyId;
            this.titleCategory1 = 'سازمان';
            this.partyTitle = this.factorObj.partyTitle;
            if (
                this.factorObj.clientTitle != null &&
                this.factorObj.clientTitle != undefined &&
                this.factorObj.clientTitle != '-'
            ) {
                this.titleCategory2 = 'کلاینت';
                this.clientTitle = this.factorObj.clientTitle;
                this.apiTitle = this.factorObj.apiTitle;
                this.clientFlag = true;
            }
        }
        if (this.factorObj.apiListOptions.length > 0) {
            if (this.factorObj.apiListOptions.length > 1) {
                this.apiList = this.factorObj.apiListOptions;
                for (let k = 0; k < this.apiList.length; k++) {
                    this.apiList[k] = Object.assign(this.apiList[k], {
                        row: k + 1,
                    });
                }
                let counter = 0;
                for (let i = 0; this.apiList.length > i; i++) {
                    counter++;
                }
                this.countApi = counter;
            } else {
                this.apiList = this.factorObj.apiListOptions;
                for (let k = 0; k < this.apiList.length; k++) {
                    this.apiList[k] = Object.assign(this.apiList[k], {
                        row: k + 1,
                    });
                }
                this.countApi = 1;
            }
        } else {
            this.countApi = 0;
        }
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallclient().subscribe(
            (b) => {
                this._primengProgressBarService.hide();
                this.clientListOptions.push(...b);
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
        if (
            this.factorObj.billId != undefined &&
            this.factorObj.billId != null
        ) {
            this.checkedAllItems = true;
            this.hidePrint = true;
            this.headPartyTitle = this.factorObj.partyTitle;
            this.billId = this.factorObj.billId;
            this.fromDate = this.factorObj.fromDate;
            this.toDate = this.factorObj.toDate;
            this.billTax = this.factorObj.billTax;
            this.billDiscount = this.factorObj.billDiscount;
            this.billTotall = this.factorObj.billTotall;
            this.billAmount = this.factorObj.billAmount;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getbillsummary(this.billId).subscribe(
                (o) => {
                    this._primengProgressBarService.hide();
                    this.summaryList = o;
                    for (let k = 0; k < this.summaryList.length; k++) {
                        this.summaryList[k] = Object.assign(
                            this.summaryList[k],
                            {
                                toBill: '1',
                                row: k + 1,
                            }
                        );
                    }
                    this.countSelected = this.summaryList.length;
                    this.dateFactoor = o[0].RDATE;
                    this.selectedItem = this.summaryList;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
            this.displayFlag = true;
        }
    }

    onKeydownSearch(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.search();
        }
    }

    onKeydownCal(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.cal(event);
        }
    }

    clear() {
        this.fromDate = null;
        this.toDate = null;
        this.summaryList = [];
        this.billTotall = 0;
        this.billDiscount = null;
        this.billTax = null;
        this.billAmount = null;
        this.selectFlag = true;
    }

    search() {
        if (this.validation()) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getcalcsummarybypartyid(
                    this.partyId,
                    this.fromDate,
                    this.toDate
                )
                .subscribe(
                    (r) => {
                        this._primengProgressBarService.hide();
                        this.billTotall = 0;
                        this.summaryList = [];
                        this.billAmount = this.billTotall = 0;
                        this.countSelected = 0;
                        this.billList = [];
                        if (Array.isArray(r)) {
                            this.summaryList = r;
                        } else {
                            this.summaryList.push(...r);
                        }
                        this.summaryList.length > 0
                            ? (this.selectFlag = false)
                            : (this.selectFlag = true);
                        for (let k = 0; k < this.summaryList.length; k++) {
                            if ('row' in this.summaryList) {
                            } else {
                                this.summaryList[k] = Object.assign(
                                    this.summaryList[k],
                                    { row: k + 1 }
                                );
                            }
                        }
                        /* this.summaryList.forEach(a => {
                     this.billTotall += a.totalFeeAmount
                 })*/
                        this.billAmount = this.billTotall = 0;
                        this.countSelected = 0;
                        this.billList = [];
                        this.changeFlag = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    validation() {
        if (!this.fromDate) {
            this.notifierService.showError({
                detail: 'لطفا تاریخ شروع را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.toDate) {
            this.notifierService.showError({
                detail: 'لطفا تاریخ پایان را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.fromDate > this.toDate) {
            this.notifierService.showError({
                detail: 'لطفا بازه تاریخ معتبر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.commonValidationsService.maximumDateBeforeDayChecker(
                this.toDate
            )
        ) {
            this.notifierService.showError({
                detail: 'حداکثر تاریخ پایان روز قبل از روزجاری می تواند باشد!',
                life: 3000,
            });
            return;
        } else {
            return true;
        }
    }

    changeCalender(e) {
        this.changeFlag = true;
    }

    onChangeClient() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.apibyclientid(this.clientId).subscribe(
            (d) => {
                this._primengProgressBarService.hide();
                this.apiListOptions = [{ title: '-', apiId: null }];
                this.apiListOptions.push(...d);
                this.apiListOptions = this.apiListOptions.sort();
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }
}
