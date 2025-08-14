import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import moment from 'jalali-moment';
import {ActivatedRoute} from "@angular/router";
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { ThreeDotDetailsPipe } from '../../../../shared/pipes/threeDotDetails.pipe';
import { Listbox } from 'primeng/listbox';
import { MatTooltip } from '@angular/material/tooltip';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-mediators-json',
    templateUrl: './mediators-json.component.html',
    standalone: true,
    styleUrls: ['./mediators-json.component.scss'],
    imports: [
        BreadcrumbsComponent,
        Panel,
        FormsModule,
        InputText,
        TranslocoDirective,
        TranslocoPipe,
        ButtonDirective,
        Tooltip,
        ThreeDotDetailsPipe,
        Listbox,
        MatTooltip,
        Dialog,
        TableModule,
        MoreChar19Pipe,
        Toast,
    ],
})
export class MediatorsJsonComponent implements OnInit {
    @Input() inputListMedia;
    @Output() close = new EventEmitter<string>();
    flag: boolean;
    geeksApi: boolean;
    apiName;
    apiTitle;
    moduleTitle;
    apiList;
    detModuleTitle;
    detApiTitle;
    detApiName;
    apiId;
    widthModuleTitle;
    widthApiTitle;
    widthApiName;
    valueNode = null;
    keyNode = null;
    parentNode;
    itemSelect;
    accessBase;
    moduleBase;
    clientBase;
    clientName;
    partyTitle;
    apiiTitle;
    itemsList = [];
    itemsListShow = [];
    flagAddNode: boolean;
    flagDeletedNode: boolean;
    disableFlgAddAndDeleteNode = true;
    selectedApi = false;
    items;
    disableFlgRegister = true;
    title;
    isApproval;
    appDate: string;
    rdate: string;
    LblStatus = 'فعال';
    status = true;
    mediatorId = null;
    showListFlag = false;
    detailsBreadObject = [];
    mediatorChangeObject = {
        id: null,
        nodeName: '',
        keyNode: '',
        valueNode: '',
        changeTypeId: null,
        schemaName: '',
        status: null,
    };
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService,
        private transloco :TranslocoService,
        private apiGatewayService: ApiGatewayService,
        private route: ActivatedRoute
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'mediatorJson':
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
                        label_index1: 'مدیاتور json',
                        rout_index1: '/mediatorJson',
                        isActive1: true,
                        img_index1: 'assets/icons/mediatorJson.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
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
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        img_index2: 'assets/icons/api.png',
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیاتور',
                        rout_index3: null,
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور json',
                        rout_index4: '/mediatorJson',
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                        img_index4: 'assets/icons/mediatorJson.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
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
                        label_index1: 'کلاینت',
                        rout_index1: '/client',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیاتور',
                        rout_index3: null,
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور json',
                        rout_index4: '/mediatorJson',
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                        img_index4: 'assets/icons/mediatorJson.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
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
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیاتور',
                        rout_index3: null,
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور json',
                        rout_index4: '/mediatorJson',
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                        img_index4: 'assets/icons/mediatorJson.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
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
                        label_index1: 'سازمان',
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ماژول',
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور',
                        rout_index4: null,
                        isActive4: false,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 5,
                        label_index5: 'مدیاتور json',
                        rout_index5: '/mediatorJson',
                        isActive5: true,
                        label_Detail_index5: '(' + this.apiiTitle + ')',
                        img_index5: 'assets/icons/mediatorJson.png',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }
    ngOnInit(): void {
        this.scrollTop();
        if (this.inputListMedia != undefined) {
            this.accessBase = this.inputListMedia.accessBase;
            this.moduleBase = this.inputListMedia.moduleBase;
            this.clientBase = this.inputListMedia.clientBase;
            this.partyTitle = this.inputListMedia.partyTitle;
            this.clientName = this.inputListMedia.clientName;
            this.moduleTitle = this.inputListMedia.moduleTitle;
            this.apiiTitle = this.inputListMedia.apiTitle;
            this.detModuleTitle = this.inputListMedia.moduleTitle;
            this.detApiTitle = this.inputListMedia.apiTitle;
            this.apiId = this.inputListMedia.apiId;
            this.apiName = this.inputListMedia.apiName;
            this.detApiName = this.inputListMedia.apiName;

            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyTitle) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            this.showListFlag = true;
            this.disableFlgAddAndDeleteNode = false;
        } else {
            this.detailsBreadObject = this.chooseBread('mediatorJson');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }

    clear() {}

    onChange(e) {
        this.status ? (this.LblStatus = 'فعال') : (this.LblStatus = 'غیرفعال');
    }

    Accept() {
        this.appDate = '';
        this.rdate = '';
        this.disableFlgRegister = false;
        this.isApproval = 1;
        const m = moment();
        const d = new Date();
        m.locale('fa');
        m.format('YY-MM-DD'); // it would be in jalali system
        let date;
        date = m.format('YYYYMMDDHHmmss');
        this.appDate = date + d.getMilliseconds();
        this.rdate = date + d.getMilliseconds();
        this.notifierService.showSuccess({
            detail: 'تایید اولیه json انجام شد!',
            life: 3000,
        });
    }

    showAddKey() {
        this.flagAddNode = true;
    }

    showDeleteKey() {
        this.flagDeletedNode = true;
    }

    onClose() {
        this.flagAddNode = false;
        this.flagDeletedNode = false;
    }

    remove() {
        let itemIndex = this.itemsListShow.indexOf(this.itemSelect);
        let temp = this.itemsListShow;
        this.itemsListShow = [...temp];
        this.itemsListShow.splice(itemIndex, 1);
        console.log('itemsListShow', this.itemsListShow);
        console.log('itemIndex', itemIndex);
        this.itemsList.forEach((value, id) => {
            if (value.id == itemIndex) {
                this.itemsList.splice(id, 1);
            }
        });
    }
    onKeydown(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchApi();
        }
    }
    registerNode(flagAddAndDelete) {
        if (flagAddAndDelete == 1) {
            if (this.validationAddNode()) {
                this.mediatorChangeObject.keyNode = this.keyNode;
                this.mediatorChangeObject.valueNode = this.valueNode;
                this.mediatorChangeObject.schemaName = this.parentNode;
                this.mediatorChangeObject.changeTypeId = 1;
                this.mediatorChangeObject.id += 1;
                this.itemsListShow = [
                    ...this.itemsListShow,
                    {
                        name:
                            'add node → ' +
                            this.mediatorChangeObject.keyNode +
                            ':' +
                            this.mediatorChangeObject.valueNode +
                            ' → ' +
                            this.parentNode,
                    },
                ];

                this.itemsList.push(this.mediatorChangeObject);

                this.flagAddNode = false;
            }
        } else if (flagAddAndDelete == 2) {
            if (this.validationDeleteNode()) {
                this.mediatorChangeObject.keyNode = this.keyNode;
                this.mediatorChangeObject.valueNode = null;
                this.mediatorChangeObject.schemaName = this.parentNode;
                this.mediatorChangeObject.changeTypeId = 2;
                this.mediatorChangeObject.id += 1;
                this.itemsListShow = [
                    ...this.itemsListShow,
                    {
                        name:
                            'del node → ' +
                            this.mediatorChangeObject.keyNode +
                            ' → ' +
                            this.parentNode,
                    },
                ];
                this.itemsList.push(this.mediatorChangeObject);
                this.flagDeletedNode = false;
            }
        }
        this.mediatorChangeObject = {
            id: null,
            nodeName: '',
            keyNode: '',
            valueNode: '',
            changeTypeId: null,
            schemaName: '',
            status: null,
        };
        this.valueNode = '';
        this.keyNode = '';
        this.parentNode = '';
    }

    registerFinal() {
        let registerObj = {
            apiId: null,
            isApproval: null,
            schemaName: '',
            title: '',
            appDate: '',
            rdate: '',
            status: null,
        };
        let registerChangeObj = {
            mediatorId: null,
            changeTypeId: null,
            nodeName: '',
            nodeValue: '',
            schemaName: '',
            status: null,
        };
        if (this.validation()) {
            registerObj.apiId = this.apiId;
            registerObj.schemaName = '*';
            registerObj.title = this.title;
            registerObj.isApproval = this.isApproval;
            registerObj.appDate = this.appDate;
            registerObj.rdate = this.rdate;
            registerObj.status = 1;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .mediatorRegister(registerObj)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.mediatorId = a.mediatorId;

                        this.itemsList.forEach((item) => {
                            console.log('itemsList', this.itemsList);
                            console.log('parent', item.parent);
                            registerChangeObj.mediatorId = this.mediatorId;
                            registerChangeObj.nodeName = item.keyNode;
                            registerChangeObj.nodeValue = item.valueNode;
                            registerChangeObj.changeTypeId = item.changeTypeId;
                            registerChangeObj.schemaName = item.schemaName;
                            registerChangeObj.status = 1;
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .mediatorchangeRegister(registerChangeObj)
                                .subscribe(
                                    (b) => {
                                        this._primengProgressBarService.hide();
                                        this.itemsListShow = [];
                                        this.itemsList = [];
                                        this.isApproval = '';
                                        this.appDate = '';
                                        this.rdate = '';
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    }
                                );
                        });
                        this.title = '';
                        this.detModuleTitle = '';
                        this.detApiTitle = '';
                        this.detApiName = '';
                        this.apiId = '';
                        if (this.itemsList.length == 0) {
                            this.isApproval = '';
                            this.appDate = '';
                            this.rdate = '';
                        }
                        this.notifierService.showSuccess({
                            detail: 'ثبت نهایی مدیاتور باموفقیت انجام شد!',
                            life: 3000,
                        });
                        if (this.showListFlag) {
                            this.close.emit('close');
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    searchApi() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .apisearch(this.apiName, this.apiTitle, this.moduleTitle, '1')
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.apiList = a;
                    } else {
                        this.apiList.push(a);
                    }
                    for (let k = 0; k < this.apiList.length; k++) {
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            row: k + 1,
                        });
                    }
                    console.log('s', this.apiList);
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    clearApi() {
        this.apiName = '';
        this.apiTitle = '';
        this.moduleTitle = '';
        this.searchApi();
    }

    showSelectApi() {
        this.searchApi();
        this.geeksApi = true;
    }

    selectApi(api) {
        let listApiMediator;
        let countLicense = 0;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.mediatorFindByApiId(api.apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                listApiMediator = a;
                if (Array.isArray(a)) {
                    listApiMediator = a;
                } else {
                    listApiMediator.push(a);
                }
                listApiMediator.forEach((item) => {
                    if (item.status || item.status == 1) {
                        countLicense += 1;
                    }
                });
                if (countLicense == 0) {
                    this.selectedApi = true;
                    this.detModuleTitle = api.moduleTitle;
                    this.detApiTitle = api.apiTitle;
                    this.detApiName = api.apiName;
                    this.apiId = api.apiId;
                    this.detModuleTitle.length > 22
                        ? (this.widthModuleTitle = 100)
                        : (this.widthModuleTitle = 50);
                    this.detApiTitle.length > 22
                        ? (this.widthApiTitle = 100)
                        : (this.widthApiTitle = 50);
                    this.detApiName.length > 22
                        ? (this.widthApiName = 100)
                        : (this.widthApiName = 50);
                    this.geeksApi = false;
                    this.disableFlgAddAndDeleteNode = false;
                } else {
                    this.notifierService.showError({
                        detail: 'یک مدیاتور فعال برای این سرویس وجود دارد!',
                        life: 3000,
                    });
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    validation(): boolean {
        if (!this.title) {
            this.notifierService.showError({
                detail: 'لطفا عنوان مدیاتور را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.selectedApi && !this.showListFlag) {
            this.notifierService.showError({
                detail: 'لطفا سرویس  مدیاتور را انتخاب نمائید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationAddNode(): boolean {
        if (!this.parentNode) {
            this.notifierService.showError({
                detail: 'لطفا node والد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.keyNode) {
            this.notifierService.showError({
                detail: 'لطفا کلید را انتخاب نمائید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationDeleteNode(): boolean {
        if (!this.keyNode) {
            this.notifierService.showError({
                detail: 'لطفا کلید را انتخاب نمائید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
