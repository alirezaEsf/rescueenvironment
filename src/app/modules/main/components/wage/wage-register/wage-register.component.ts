import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Wage} from "../../../models/wage";
import {HeaderWageDto} from "../../../models/headerWageDto";
import {FeeDetailDomainsDto} from "../../../models/feeDetailDomainsDto";

import {ApiGatewayConstants} from "../../../constants/ApiGatewayConstants";


import {TableModule} from 'primeng/table';
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';
import {NgIf, NgStyle} from '@angular/common';
import {StatusPipe} from '../../../../shared/pipes/status.pipe';
import {Ripple} from 'primeng/ripple';
import {Dialog} from 'primeng/dialog';
import {TranslocoDirective, TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {DropdownModule} from 'primeng/dropdown';
import {ToastService} from '../../../../shared/services/ToastService';
import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {CommonValidationsService} from '../../../../shared/validators/common-validations.service';
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {Constants} from '../../../../shared/constants/Constants';
import {KeyFilter} from 'primeng/keyfilter';
import {WageTypePipe} from '../../../../shared/pipes/wageType.pipe';
import {TieredMenu} from 'primeng/tieredmenu';
import {CastToDatePipe} from '../../../../shared/pipes/cast-to-date.pipe';
import {ThreeDotBreadcrumbPipe} from '../../../../shared/pipes/threeDotBreadcrumb.pipe';
import {AddCommaPipe} from '../../../../shared/pipes/add-comma.pipe';
import {AddCaracterPipe} from '../../../../shared/pipes/add-caracter.pipe';
import {MoreCharLongPipe} from '../../../../shared/pipes/moreCharLong.pipe';


@Component({
    selector: 'app-wage-register',
    templateUrl: './wage-register.component.html',
    styleUrls: ['./wage-register.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        Panel,
        FormsModule,
        ButtonDirective,
        InputText,
        Tooltip,
        NgStyle,
        StatusPipe,
        Ripple,
        Dialog,
        TranslocoPipe,
        TranslocoDirective,
        DropdownModule,
        NgIf,
        KeyFilter,
        Button,
        WageTypePipe,
        TieredMenu,
        CastToDatePipe,
        ThreeDotBreadcrumbPipe,
        AddCommaPipe,
        AddCaracterPipe,
        MoreCharLongPipe,
    ],
})
export class WageRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() wageObj;
    wageConstants = Constants;
    wageDetailsAddBtnDisable: boolean = false;
    wageDetailList = [];
    wageAccountsList: any[] = [];
    isPercentage: boolean = false;
    nullFeeFieldPath: boolean = false;
    wageTypeFlag = false;
    wageTedadiFlag = false;
    sadehFlag = false;
    registerWageHeader: HeaderWageDto;
    feeTitle: string = null;
    feeDetailId: number = null;
    disableUpdateFlag: boolean = false;
    sadehDonFlag: boolean = false;
    disableAmount: boolean = false;
    feeHeaderId: number = null;
    partyId: number = null;
    calculationTypeOptions = this.wageConstants.amount;
    registerWage: Wage = {
        partyid: null,
        feeheaderid: null,
    };
    inputFloat: RegExp = ApiGatewayConstants.cust_float;
    rows: number = 10;
    first: number = 0;
    wageList = [];
    apiList = [];
    feeTypeId = null;
    calculationValue: number = 0;
    calculationTypeId: number = 1;
    fromValue: number = 0;
    toValue: number = 0;
    minValue: number = 0;
    maxvalue: number = 0;
    countApi = 0;
    countApiTitle = 'سرویس';
    status;
    partyTitle: string = '';
    apiTitle: string = '';
    clientTitle: string = '';
    titleCategory01: string = '';
    titleCategory02: string = '';
    titleCategory1: string = '';
    titleCategory2: string = '';
    titleCategory3: string = '';
    counter: number = 0;
    dialogApisFlag: boolean = false;
    helpFlag: boolean = false;
    showAddBtn: boolean = true;
    clientFlag: boolean = false;
    tempWage;
    items;
    temp;
    headerWage = 'ایجاد کارمزد';
    apiFeeId: number = null;
    toDate;
    fromDate;
    apiId;
    clientId: string = null;
    partyListOptions = [{title: '-', partyId: null}];
    moduleListOptions = [{moduleTitle: '-', moduleId: null}];
    apiListOptions = [{title: '-', apiId: null}];
    clientListOptions = [{name: '-', clientId: null}];
    paginationLabel = this.transloco.translate('label.pagination.table');

    constructor(
        private route: ActivatedRoute,
        private commonValidationsService: CommonValidationsService,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService
    ) {
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    onKeydown(event): void {
        let self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onKeydownDetail(event): void {
        let self = this;
        if (this.showAddBtn) {
            if (event.key === 'Enter') {
                self.addWageDetail();
            }
        } else {
            if (event.key === 'Enter') {
                self.updateWage();
            }
        }
    }

    setRecord(wage) {
        this.tempWage = wage;
    }

    ngOnInit(): void {
        this.feeTypeId = '1';
        this.apiId = null;
        this.headerWage = 'ایجاد کارمزد';
        this.headerWage = this.wageObj.headerWage;
        this.apiFeeId = this.wageObj.apiFeeId;
        this.clientId = this.wageObj.clientId;
        if (this.wageObj.apiListOptions[0].apiId == null) {
            this.wageObj.apiListOptions.splice(0, 1);
        } else {
            this.apiId = this.wageObj.apiListOptions[0].apiId;
        }
        if (
            this.wageObj.feeTitle != undefined &&
            this.wageObj.feeTitle != null
        ) {
            this.disableUpdateFlag = true;
            this.feeTitle = this.wageObj.feeTitle;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .findbyfeeheaderid(this.wageObj.feeId)
                .subscribe(
                    (u) => {
                        this._primengProgressBarService.hide();
                        this.feeTypeId = u.feeTypeId.toString();
                        this.wageDetailList = u.feeDetailDomains;
                        this.fromDate = u.fromDate;
                        this.toDate = u.toDate;
                        for (let k = 0; k < this.wageDetailList.length; k++) {
                            this.wageDetailList[k] = Object.assign(
                                this.wageDetailList[k],
                                {feeTypeId: u.feeTypeId, title: u.title}
                            );
                        }
                        this.functionalityWageType();
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        } else {
            this.feeTitle = '';
            this.disableUpdateFlag = false;
        }
        this.items = [
            {
                label: this.transloco.translate('contextMenu.Edit'),
                icon: '',
                command: () => {
                    this.showUpdate(this.tempWage);
                },
            },
            {
                label: 'حذف',
                icon: '',
                command: () => {
                    this.deleted(this.tempWage);
                },
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
        if (
            this.wageObj.partyTitle != null &&
            this.wageObj.partyTitle != undefined &&
            this.wageObj.partyTitle != '-'
        ) {
            this.titleCategory1 = 'سازمان';
            this.titleCategory01 = 'شروع تاریخ';
            this.titleCategory02 = 'پایان تاریخ';
            this.partyTitle = this.wageObj.partyTitle;
            this.fromDate = this.wageObj.fromDate;
            this.toDate = this.wageObj.toDate;
            if (
                this.wageObj.clientTitle != null &&
                this.wageObj.clientTitle != undefined &&
                this.wageObj.clientTitle != '-'
            ) {
                this.titleCategory2 = 'کلاینت';
                this.clientTitle = this.wageObj.clientTitle;
                this.apiTitle = this.wageObj.apiTitle;
                this.clientFlag = true;
            }
        }
        if (this.wageObj.apiListOptions.length > 0) {
            if (this.wageObj.apiListOptions.length > 1) {
                this.apiList = this.wageObj.apiListOptions;
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
                this.apiList = this.wageObj.apiListOptions;
                for (let k = 0; k < this.apiList.length; k++) {
                    this.apiList[k] = Object.assign(this.apiList[k], {
                        row: k + 1,
                    });
                }
                this.countApi = 1;
            }
        } else {
            this.apiList = [];
        }
    }

    functionalityWageType() {
        if (this.feeTypeId == '1') {
            this.calculationTypeOptions = this.wageConstants.amount;
            this.disableMoreThanOneAddForFixedTypeWage();
            this.wageTypeFlag = false;
            this.wageTedadiFlag = false;
            this.disableAmount = false;
            this.calculationTypeId = 1;
            this.isPercentage = false;
            this.sadehFlag = true;
        } else if (this.feeTypeId == '2') {
            this.disableAmount = false;
            this.calculationTypeOptions = this.wageConstants.amount;
            this.wageTedadiFlag = true;
            this.wageTypeFlag = false;
            this.isPercentage = false;
            this.calculationTypeId = 1;
            this.sadehFlag = false;
        } else if (this.feeTypeId == '3') {
            this.disableAmount = false;
            this.calculationTypeOptions = this.wageConstants.amountOrPercentage;
            this.wageTedadiFlag = false;
            this.wageTypeFlag = true;
            this.isPercentage = false;
            this.calculationTypeId = 1;
            this.sadehFlag = true;
        } else if (this.feeTypeId == '4') {
            this.disableAmount = true;
            this.isPercentage = false;
            this.calculationTypeOptions = this.wageConstants.amountOrPercentage;
            this.calculationTypeId = 1;
            this.wageDetailsAddBtnDisable = false;
            this.wageTypeFlag = true;
            this.wageTedadiFlag = false;
            this.sadehFlag = false;
        }
    }

    onChangeWageType() {
        this.functionalityWageType();
        this.calculationValue = 0;
        this.minValue = 0;
        this.maxvalue = 0;
        this.fromValue = 0;
        this.toValue = 0;
        this.wageDetailList = [];
        this.sadehDonFlag = false;
    }

    disableMoreThanOneAddForFixedTypeWage(): void {
        if (this.wageDetailList.length > 0) {
            // this.wageDetailCalculateListForm.disable();
            // this.wageDetailCalculateListForm.reset();
            this.wageDetailsAddBtnDisable = true;
        }
    }

    onPercentageOrFixedAmount(event): void {
        if (event.value === 1) {
            this.isPercentage = false;
            this.calculationValue = 0;
        } else if (event.value === 2) {
            this.isPercentage = true;
            this.calculationValue = 0;
        }
    }

    addWageDetail() {
        if (this.validationRegister(false)) {
            if (this.feeTypeId == '4' || this.feeTypeId == '3') {
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apibyid(this.apiId).subscribe(
                    (c) => {
                        this._primengProgressBarService.hide();
                        if (
                            c.feeFieldPath == null ||
                            c.feeFieldPath == undefined ||
                            c.feeFieldPath == ''
                        ) {
                            this.notifierService.showError({
                                detail: 'صدور کارمزد برای سرویسی که دارای فیلد محاسبه گر کارمزد نباشد امکان پذیر نیست!\n لطفا از بخش سرویس ها فیلد محاسبه گر کارمزد را ثبت نمائید!',
                                life: 3000,
                            });
                        } else {
                            this.wageDetailList.push({
                                feeTypeId: this.feeTypeId,
                                title: this.feeTitle,
                                calculationTypeId: this.calculationTypeId,
                                calculationValue: this.calculationValue,
                                minValue: this.minValue,
                                maxvalue: this.maxvalue,
                                fromValue: this.fromValue,
                                toValue: this.toValue,
                                fromDate: this.fromDate,
                                toDate: this.toDate,
                                status:
                                    this.status == true
                                        ? (this.status = true)
                                        : (this.status = false),
                            });
                            if (
                                (this.feeTypeId == '1' ||
                                    this.feeTypeId == '3') &&
                                this.wageDetailList.length == 1
                            ) {
                                this.sadehDonFlag = true;
                            } else {
                                this.sadehDonFlag = false;
                            }
                            for (
                                let k = 0;
                                k < this.wageDetailList.length;
                                k++
                            ) {
                                if ('row' in this.wageDetailList) {
                                } else {
                                    this.wageDetailList[k] = Object.assign(
                                        this.wageDetailList[k],
                                        {row: k + 1}
                                    );
                                }
                                // this.wageType=null
                                // this.feeTitle=null
                                this.isPercentage = false;
                                this.calculationValue = 0;
                                this.calculationValue = 0;
                                this.minValue = 0;
                                this.maxvalue = 0;
                                this.fromValue = 0;
                                this.toValue = 0;
                                this.functionalityWageType();
                                // this.status=false
                            }
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            } else {
                this.wageDetailList.push({
                    feeTypeId: this.feeTypeId,
                    title: this.feeTitle,
                    calculationTypeId: this.calculationTypeId,
                    calculationValue: this.calculationValue,
                    minValue: this.minValue,
                    maxvalue: this.maxvalue,
                    fromValue: this.fromValue,
                    toValue: this.toValue,
                    fromDate: this.fromDate,
                    toDate: this.toDate,
                    status:
                        this.status == true
                            ? (this.status = true)
                            : (this.status = false),
                });
                if (
                    (this.feeTypeId == '1' || this.feeTypeId == '3') &&
                    this.wageDetailList.length == 1
                ) {
                    this.sadehDonFlag = true;
                } else {
                    this.sadehDonFlag = false;
                }
                for (let k = 0; k < this.wageDetailList.length; k++) {
                    if ('row' in this.wageDetailList) {
                    } else {
                        this.wageDetailList[k] = Object.assign(
                            this.wageDetailList[k],
                            {row: k + 1}
                        );
                    }
                    // this.wageType=null
                    // this.feeTitle=null
                    this.isPercentage = false;
                    this.calculationValue = 0;
                    this.calculationValue = 0;
                    this.minValue = 0;
                    this.maxvalue = 0;
                    this.fromValue = 0;
                    this.toValue = 0;
                    this.functionalityWageType();
                    // this.status=false
                }
            }
            //  }
        }
    }

    updateWage() {
        if (this.validationRegister(true)) {
            if (this.feeTypeId == '3') {
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apibyid(this.apiId).subscribe(
                    (c) => {
                        this._primengProgressBarService.hide();
                        if (
                            c.feeFieldPath == null ||
                            c.feeFieldPath == undefined ||
                            c.feeFieldPath == ''
                        ) {
                            this.notifierService.showError({
                                detail: 'صدور کارمزد برای سرویسی که دارای فیلد محاسبه گر کارمزد نباشد امکان پذیر نیست!',
                                life: 3000,
                            });
                        } else {
                            for (
                                let k = 0;
                                k < this.wageDetailList.length;
                                k++
                            ) {
                                if (this.wageDetailList[k].row == this.temp) {
                                    this.wageDetailList[k].feeTitle =
                                        this.feeTitle;
                                    this.wageDetailList[k].feeTypeId =
                                        this.feeTypeId;
                                    this.status == true
                                        ? (this.wageDetailList[k].status = 1)
                                        : (this.wageDetailList[k].status = 0);
                                    this.wageDetailList[k].calculationTypeId =
                                        this.calculationTypeId;
                                    this.wageDetailList[k].calculationValue =
                                        this.calculationValue;
                                    this.wageDetailList[k].fromValue =
                                        this.fromValue;
                                    this.wageDetailList[k].toValue =
                                        this.toValue;
                                    this.wageDetailList[k].minValue =
                                        this.minValue;
                                    this.wageDetailList[k].maxvalue =
                                        this.maxvalue;
                                }
                            }

                            this.showAddBtn = true;
                            this.isPercentage = false;
                            this.calculationValue = 0;
                            this.minValue = 0;
                            this.maxvalue = 0;
                            this.fromValue = 0;
                            this.toValue = 0;
                            this.functionalityWageType();
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            } else {
                for (let k = 0; k < this.wageDetailList.length; k++) {
                    if (this.wageDetailList[k].row == this.temp) {
                        this.wageDetailList[k].feeTitle = this.feeTitle;
                        this.wageDetailList[k].feeTypeId = this.feeTypeId;
                        this.status == true
                            ? (this.wageDetailList[k].status = 1)
                            : (this.wageDetailList[k].status = 0);
                        this.wageDetailList[k].calculationTypeId =
                            this.calculationTypeId;
                        this.wageDetailList[k].calculationValue =
                            this.calculationValue;
                        this.wageDetailList[k].fromValue = this.fromValue;
                        this.wageDetailList[k].toValue = this.toValue;
                        this.wageDetailList[k].minValue = this.minValue;
                        this.wageDetailList[k].maxvalue = this.maxvalue;
                    }
                }

                this.showAddBtn = true;
                this.isPercentage = false;
                this.calculationValue = 0;
                this.calculationValue = 0;
                this.minValue = 0;
                this.maxvalue = 0;
                this.fromValue = 0;
                this.toValue = 0;
                this.functionalityWageType();
            }
            // this.status=false

            //}
        }
    }

    onClose() {
        this.close.emit('close');
    }

    handleMaxAndMinAmount() {
    }

    onCancel(): void {
        this.disableUpdateFlag = false;
        if (this.wageObj != null) {
            this.wageObj.feeTitle = null;
            this.wageObj.category = null;
            this.wageObj.partyTitle = null;
            this.wageObj.partyId = null;
            this.wageObj.detail_category2_label = null;
            this.wageObj.detail_category2_value = null;
            this.wageObj.detail_category3_label = null;
            this.wageObj.detail_category3_value = null;
            this.wageObj.apiTitle = null;
            this.wageObj.apiId = null;
            this.wageObj.moduleTitle = null;
            this.wageObj.moduleId = null;
            this.wageObj.partyTile = null;
            this.wageObj.partyId = null;
            this.wageObj.clinetTitle = null;
            this.wageObj.clientId = null;
            this.wageObj.feeTitle = null;
            this.wageObj.status = null;
            this.wageObj.feeId = null;
            this.wageObj.apiFeeId = null;
            this.wageObj = null;
        }
        this.feeTitle = null;
        this.feeTypeId = null;
        this.status = false;
        this.close.emit('close');
    }

    validateReg(): boolean {
        if (
            !this.commonValidationsService.stringNotNullChecker(this.feeTitle)
        ) {
            this.notifierService.showError({
                detail: 'لطفا عنوان را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.fromDate) {
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
            this.commonValidationsService.maximumDateDayChecker(this.toDate)
        ) {
            this.notifierService.showError({
                detail: 'حداکثر تاریخ پایان روزجاری می تواند باشد!',
                life: 3000,
            });
            return false;
        } else if (
            !this.commonValidationsService.stringNotNullChecker(this.feeTypeId)
        ) {
            this.notifierService.showError({
                detail: 'لطفا نوع کارمزد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.wageDetailList.length < 1) {
            this.notifierService.showError({
                detail: 'لطفا جزئیات کارمزد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.showAddBtn) {
            this.notifierService.showError({
                detail: 'لطفا ویرایش جزئیات کارمزد را تکمیل کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onRegister(): void {
        if (this.validateReg()) {
            let headerWageDto: HeaderWageDto = new HeaderWageDto();
            let feeDetailDomainsDto: FeeDetailDomainsDto =
                new FeeDetailDomainsDto();
            headerWageDto.title = this.feeTitle;
            headerWageDto.fromDate = this.fromDate;
            headerWageDto.toDate = this.toDate;
            headerWageDto.feeTypeId = Number(this.feeTypeId);
            headerWageDto.feeDetailDomains =
                feeDetailDomainsDto.objectMapperToList(this.wageDetailList);
            if (
                this.commonValidationsService.stringNotNullChecker(
                    this.wageObj.partyId
                )
            ) {
                this.partyId = this.wageObj.partyId;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.feeheaderRegister(headerWageDto).subscribe(
                    (p) => {
                        this._primengProgressBarService.hide();
                        this.feeHeaderId = p.feeHeaderId;

                        // if (this.wageObj.apiId == null) {
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService
                            .apifeeRegister2(
                                this.partyId,
                                this.feeHeaderId,
                                this.clientId,
                                this.apiId
                            )
                            .subscribe(
                                (y) => {
                                    this._primengProgressBarService.hide();
                                    // this.notifierService.showSuccess({
                                    //     detail: 'کارمزد جدید ثبت گردید!',
                                    //     life: 3000
                                    // });
                                    this.wageObj.feeTitle = null;
                                    this.wageObj.category = null;
                                    this.wageObj.feeId = null;
                                    this.wageObj.partyTitle = null;
                                    this.wageObj.partyId = null;
                                    this.wageObj.detail_category2_label = null;
                                    this.wageObj.detail_category2_value = null;
                                    this.wageObj.detail_category3_label = null;
                                    this.wageObj.detail_category3_value = null;
                                    this.wageObj = null;
                                    this.feeTitle = null;
                                    this.feeTypeId = null;
                                    this.status = false;
                                    this.apiFeeId = null;
                                    this.close.emit('closeAndCreate');
                                    this.wageObj.feeTitle = null;
                                    this.wageObj.category = null;
                                    this.wageObj.feeId = null;
                                    this.wageObj.partyTitle = null;
                                    this.wageObj.partyId = null;
                                    this.wageObj.detail_category2_label = null;
                                    this.wageObj.detail_category2_value = null;
                                    this.wageObj.detail_category3_label = null;
                                    this.wageObj.detail_category3_value = null;
                                    this.wageObj = null;
                                    this.feeTitle = null;
                                    this.feeTypeId = null;
                                    this.status = false;
                                    this.apiFeeId = null;
                                },
                                (error) => {
                                    this._primengProgressBarService.hide();
                                }
                            );
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    clearDetail() {
        this.showAddBtn = true;
        this.calculationTypeId = 1;
        this.isPercentage = false;
        this.calculationValue = 0;
        this.calculationValue = 0;
        this.minValue = 0;
        this.maxvalue = 0;
        this.fromValue = 0;
        this.toValue = 0;
    }

    showUpdate(wage) {
        this.isPercentage = false;
        this.calculationValue = 0;
        this.minValue = 0;
        this.maxvalue = 0;
        this.fromValue = 0;
        this.toValue = 0;
        this.feeTitle = wage.title;
        this.feeTypeId = wage.feeTypeId.toString();
        wage.status == 1 ? (this.status = true) : (this.status = false);
        this.calculationTypeId = wage.calculationTypeId;
        this.calculationValue = wage.calculationValue;
        this.fromValue = wage.fromValue;
        this.toValue = wage.toValue;
        this.minValue = wage.minValue;
        this.maxvalue = wage.maxvalue;
        this.temp = wage.row;
        this.showAddBtn = false;
        this.functionalityWageType();
    }

    deleted(wage) {
        this.functionalityWageType();
        let index = this.wageDetailList.findIndex(
            (obj) => obj.row === wage.row
        );
        if (index > -1) {
            this.wageDetailList.splice(index, 1);
            for (let k = 0; k < this.wageDetailList.length; k++) {
                this.wageDetailList[k] = Object.assign(this.wageDetailList[k], {
                    row: k + 1,
                });
            }
        }
    }

    openDialog() {
        this.dialogApisFlag = true;
    }

    constAmontCheck(editFlag): boolean {
        return this.wageDetailList.length == 1 && !editFlag;
    }

    validationRegister(editFlag: boolean): boolean {
        if (
            !this.commonValidationsService.stringNotNullChecker(this.feeTitle)
        ) {
            this.notifierService.showError({
                detail: 'لطفا عنوان را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            !this.commonValidationsService.stringNotNullChecker(this.feeTypeId)
        ) {
            this.notifierService.showError({
                detail: 'لطفا نوع کارمزد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.fromDate) {
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
            this.commonValidationsService.maximumDateDayChecker(this.toDate)
        ) {
            this.notifierService.showError({
                detail: 'حداکثر تاریخ پایان روزجاری می تواند باشد!',
                life: 3000,
            });
            return false;
        } else if (
            this.calculationTypeId == 1 &&
            !this.commonValidationsService.numberNotNullChecker(
                this.calculationValue
            )
        ) {
            this.notifierService.showError({
                detail: 'لطفا مبلغ ثابت را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.feeTypeId == '1' &&
            this.calculationTypeId == 1 &&
            this.constAmontCheck(editFlag)
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'کارمزد تعدادی ساده تنها می تواند دارای یک رکورد باشد!',
                life: 3000,
            });
            return false;
            debugger;
        } else if (this.feeTypeId == '3' && this.constAmontCheck(editFlag)) {
            debugger;
            this.notifierService.showError({
                detail: 'کارمزد مبلغی ساده تنها می تواند دارای یک رکورد باشد!',
                life: 3000,
            });
            return false;
            debugger;
        } else if (
            (this.feeTypeId == '3' || this.feeTypeId == '4') &&
            this.calculationTypeId == 2 &&
            !this.commonValidationsService.numberNotNullChecker(
                this.calculationValue
            )
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا درصد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.feeTypeId == '4' &&
            !this.commonValidationsService.numberNotNullWithoutZeroChecker(
                this.fromValue
            )
        ) {
            this.notifierService.showError({
                detail: 'لطفا از مبلغ را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.feeTypeId == '4' &&
            !this.commonValidationsService.numberNotNullChecker(this.toValue)
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا تا مبلغ را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.feeTypeId == '4' && this.fromValue > this.toValue) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا بازه مبلغ را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.feeTypeId == '4' &&
            this.overlapChecked(this.fromValue, this.toValue, editFlag)
        ) {
            this.notifierService.showError({
                detail: 'بازه های مبلغ تداخل دارند!',
                life: 3000,
            });
            return false;
        } else if (
            !this.commonValidationsService.numberNotNullWithoutZeroChecker(
                this.minValue
            )
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا حداقل مبلغ کارمزد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            !this.commonValidationsService.numberNotNullChecker(this.maxvalue)
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا حداکثر مبلغ کارمزد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.maxvalue < this.minValue) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا بازه حداقل تا حداکثر مبلغ کارمزد را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.feeTypeId == '2' &&
            !this.commonValidationsService.numberNotNullWithoutZeroChecker(
                this.fromValue
            )
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا از تعداد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.feeTypeId == '2' &&
            !this.commonValidationsService.numberNotNullChecker(this.toValue)
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا تا تعداد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.feeTypeId == '2' && this.toValue < this.fromValue) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا بازه تعداد را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.feeTypeId == '2' &&
            this.overlapChecked(this.fromValue, this.toValue, editFlag)
        ) {
            this.notifierService.showError({
                detail: 'بازه های تعداد تداخل دارند!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    overlapChecked(newFromValue, newToValue, editFlag): boolean {
        let counter: number = 0;
        for (let item of this.wageDetailList) {
            if (editFlag) {
                debugger;
                if (item.row == this.temp) {
                    continue;
                } else {
                    debugger;
                    if (
                        newFromValue <= item.toValue &&
                        item.fromValue <= newToValue
                    ) {
                        /* newInterval[0] = interval[1] + 1;
                         newInterval[1] = newInterval[0] + (newInterval[1] - newInterval[0]);*/ // Maintain the interval duration
                        counter++;
                    }
                }
            } else {
                if (
                    newFromValue <= item.toValue &&
                    item.fromValue <= newToValue
                ) {
                    /* newInterval[0] = interval[1] + 1;
                     newInterval[1] = newInterval[0] + (newInterval[1] - newInterval[0]);*/ // Maintain the interval duration
                    counter++;
                }
            }
        }
        if (counter > 0) {
            return true;
        } else {
            return false;
        }
    }
}
