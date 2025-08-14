import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EndpointheaderDto } from '../../../../models/endpointheaderDto';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { Tooltip } from 'primeng/tooltip';
import { CommonModule, NgClass, NgIf, NgStyle } from '@angular/common';
import { ThreeDotDetailsPipe } from '../../../../../shared/pipes/threeDotDetails.pipe';
import { Accordion, AccordionTab } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { detailTypePipe } from '../../../../../shared/pipes/detail-type.pipe';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { HeaderTypePipe } from '../../../../../shared/pipes/headerType.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';
import { HeaderEndpointRegisterComponent } from './header-endpoint-register/header-endpoint-register.component';
import { HeaderEndpointUpdateComponent } from './header-endpoint-update/header-endpoint-update.component';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-header-endpoint-management',
    templateUrl: './header-endpoint-management.component.html',
    styleUrls: ['./header-endpoint-management.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        Panel,
        Tooltip,
        NgIf,
        ThreeDotDetailsPipe,
        TranslocoDirective,
        Accordion,
        AccordionTab,
        TableModule,
        detailTypePipe,
        MoreChar19Pipe,
        HeaderTypePipe,
        NgStyle,
        StatusPipe,
        ButtonDirective,
        TranslocoPipe,
        MatTooltip,
        HeaderEndpointRegisterComponent,
        HeaderEndpointUpdateComponent,
        Toast,
        NgClass,
        CommonModule,
    ],
})
export class HeaderEndpointManagementComponent implements OnInit {
    @Input() inputEndpointHeader;
    @Input() inputApiEndpointHeader;
    @Output() close = new EventEmitter<string>();

    registerFlag: boolean = false;
    updateFlag: boolean = false;
    tblFlag: boolean = false;
    apiEndpointHeaderFlag: boolean;
    endpointList = [];
    endpointListIsSystemEndpointDetail = [];
    endpointNotIsSystemEndpointDetail = [];
    temp;
    sourceUrl;
    destinationHost;
    destinationUri;
    updateEndpointHeaderDto: EndpointheaderDto;
    endpointid: string;
    detailsBreadObject = [];
    partyTitle;
    moduleTitle;
    endpointTitle;
    clientName;
    apiName;
    moduleBase = false;
    accessBase = false;
    clientBase = false;
    widthSourceUrl;
    widthDestinationHost;
    widthDestinationUri;
    first: number = 0;
    rows: number = 10;
    apiId;
    apiTitle;
    apiUrl;
    headerHeaderEndpoint = 'المان های اندپوینت';
    apiBase: boolean = false;
    endpointDetailApiFlag: boolean = false;
    paginationLabel = this.transloco.translate('label.pagination.table');

    constructor(
        private route: ActivatedRoute,
        private transloco: TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
    ) {
    }

    chooseBread(caseBase: any) {
        let resultBreadcrumb;
        if (this.inputApiEndpointHeader != undefined) {
            switch (caseBase) {
                case 'clientBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'کلاینت',
                            rout_index0: '/api-gateway/access-list',
                            isActive0: false,
                            img_index0: 'assets/icons/client.png',
                        },
                        {
                            index: 1,
                            label_index1: 'لیست دسترسی',
                            rout_index1: '',
                            isActive1: false,
                            img_index1: 'assets/icons/access.png',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.clientName + ')',
                            img_index2: 'assets/icons/api.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های سرویس',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3: '(' + this.apiName + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'moduleBase':
                    resultBreadcrumb = [
                        {
                            index: 0,
                            label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                            img_index0: 'assets/icons/team.png',
                            rout_index0: '/home',
                            isActive0: false,
                        },
                        {
                            index: 1,
                            label_index1: 'ماژول',
                            rout_index1: '/api-gateway/home/party/module',
                            isActive1: false,
                            img_index1: 'assets/icons/module.png',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.moduleTitle + ')',
                            img_index2: 'assets/icons/endpoint.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های سرویس',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3: '(' + this.apiName + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'accessBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                        },

                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: '',
                            isActive1: false,
                            label_Detail_index1: '(' + this.moduleTitle + ')',
                            img_index1: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: 'المان های سرویس',
                            rout_index4: null,
                            isActive4: true,
                            label_Detail_index4: '(' + this.apiName + ')',
                            img_index4: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index3: null, label_index3: null },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'partyBase':
                    resultBreadcrumb = [
                        {
                            index: 0,
                            label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                            img_index0: 'assets/icons/team.png',
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
                            rout_index2: '/module',
                            isActive2: false,
                            img_index2: 'assets/icons/module.png',
                            label_Detail_index2: '(' + this.partyTitle + ')',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس ',
                            rout_index3: './endpoint',
                            isActive3: false,
                            img_index3: 'assets/icons/api.png',
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                        },
                        {
                            index: 4,
                            label_index4: 'المان های سرویس',
                            rout_index4: null,
                            isActive4: true,
                            label_Detail_index4: '(' + this.apiName + ')',
                            img_index4: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                default:
                    resultBreadcrumb = null;
            }
        } else if (this.inputEndpointHeader != undefined) {
            switch (caseBase) {
                case 'clientBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'کلاینت',
                            rout_index0: '/api-gateway/access-list',
                            isActive0: false,
                            img_index0: 'assets/icons/client.png',
                        },
                        {
                            index: 1,
                            label_index1: 'لیست دسترسی',
                            rout_index1: '',
                            isActive1: false,
                            img_index1: 'assets/icons/access.png',
                        },
                        {
                            index: 2,
                            label_index2: 'اندپوینت',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.clientName + ')',
                            img_index2: 'assets/icons/endpoint.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های اندپوینت',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3:
                                '(' + this.destinationHost + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'moduleBase':
                    resultBreadcrumb = [
                        {
                            index: 0,
                            label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                            img_index0: 'assets/icons/team.png',
                            rout_index0: '/home',
                            isActive0: false,
                        },
                        {
                            index: 1,
                            label_index1: 'ماژول',
                            rout_index1: '/api-gateway/home/party/module',
                            isActive1: false,
                            img_index1: 'assets/icons/module.png',
                        },
                        {
                            index: 2,
                            label_index2: 'اندپوینت',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.moduleTitle + ')',
                            img_index2: 'assets/icons/endpoint.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های اندپوینت',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3:
                                '(' + this.destinationHost + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'accessBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                        },

                        {
                            index: 1,
                            label_index1: 'اندپوینت',
                            rout_index1: '',
                            isActive1: false,
                            label_Detail_index1: '(' + this.moduleTitle + ')',
                            img_index1: 'assets/icons/endpoint.png',
                        },
                        {
                            index: 2,
                            label_index2: 'المان های اندپوینت',
                            rout_index2: null,
                            isActive2: true,
                            label_Detail_index2:
                                '(' + this.destinationHost + ')',
                            img_index2: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index3: null, label_index3: null },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'partyBase':
                    resultBreadcrumb = [
                        {
                            index: 0,
                            label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                            img_index0: 'assets/icons/team.png',
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
                            rout_index2: '/module',
                            isActive2: false,
                            img_index2: 'assets/icons/module.png',
                            label_Detail_index2: '(' + this.partyTitle + ')',
                        },
                        {
                            index: 3,
                            label_index3: 'اندپوینت',
                            rout_index3: './endpoint',
                            isActive3: false,
                            img_index3: 'assets/icons/endpoint.png',
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                        },
                        {
                            index: 4,
                            label_index4: 'المان های اندپوینت',
                            rout_index4: null,
                            isActive4: true,
                            label_Detail_index4:
                                '(' + this.destinationHost + ')',
                            img_index4: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                default:
                    resultBreadcrumb = null;
            }
        }
        return resultBreadcrumb;
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
        debugger
        if (this.inputEndpointHeader != undefined) {
            debugger
            this.apiEndpointHeaderFlag = false;
            this.apiBase = false;
            this.headerHeaderEndpoint = 'المان های اندپوینت';
            this.endpointDetailApiFlag = false;
            this.endpointList = [];
            this._primengProgressBarService.show();
            this.apiGatewayService.currentApprovalStageEndpoint.subscribe(
                (msg) => {
                    this._primengProgressBarService.hide();
                    this.temp = msg;
                    this.sourceUrl = this.temp.sourceUrl;
                    this.destinationHost = this.temp.destinationHost;
                    this.destinationUri = this.temp.destinationUri;
                    this.endpointid = this.temp.endpointId;
                    this.apiGatewayService.updateApprovalEndpointIdHeader(
                        this.endpointid.toString(),
                    );
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
            this.partyTitle = this.inputEndpointHeader.partyTitle;
            this.moduleTitle = this.inputEndpointHeader.moduleTitle;
            this.endpointTitle = this.inputEndpointHeader.endpointTitle;
            this.clientName = this.inputEndpointHeader.clientName;
            this.moduleBase = this.inputEndpointHeader.moduleBase;
            this.accessBase = this.inputEndpointHeader.accessBase;
            this.clientBase = this.inputEndpointHeader.clientBase;
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getbyendpointid(this.endpointid)
                .subscribe(
                    (getAllResponse) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(getAllResponse)) {
                            this.endpointList = getAllResponse;
                        } else {
                            this.endpointList.push(getAllResponse);
                        }
                        this.endpointList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false),
                        );
                        for (let k = 0; k < this.endpointList.length; k++) {
                            this.endpointList[k] = Object.assign(
                                this.endpointList[k],
                                { row: k + 1 },
                            );
                        }
                        for (let i = 0; i < this.endpointList.length; i++) {
                            debugger;
                            if (
                                this.endpointList[i].isSystemEndpointDetail == 1
                            ) {
                                debugger;
                                this.endpointListIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            } else {
                                this.endpointNotIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            }
                        }
                        this.endpointList.map((x) =>
                            x.isSystemEndpointDetail == 1
                                ? (x.isSystemEndpointDetail = true)
                                : (x.isSystemEndpointDetail = false),
                        );
                        this.tblFlag = true;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );
        }
        else if (this.inputApiEndpointHeader != undefined) {
            debugger
            this.apiBase = true;
            this.apiEndpointHeaderFlag = true;
            this.partyTitle = this.inputApiEndpointHeader.partyTitle;
            this.moduleTitle = this.inputApiEndpointHeader.moduleTitle;
            this.endpointTitle = this.inputApiEndpointHeader.endpointTitle;
            this.clientName = this.inputApiEndpointHeader.clientName;
            this.moduleBase = this.inputApiEndpointHeader.moduleBase;
            this.apiName = this.inputApiEndpointHeader.name;
            this.accessBase = this.inputApiEndpointHeader.accessBase;
            this.clientBase = this.inputApiEndpointHeader.clientBase;
            this.apiId = this.inputApiEndpointHeader.apiId;
            this.apiTitle = this.inputApiEndpointHeader.title;
            this.apiUrl = this.inputApiEndpointHeader.url;
            this.headerHeaderEndpoint = 'المان های سرویس';
            this.endpointDetailApiFlag = true;
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .endpointdetailByApi(this.apiId)
                .subscribe(
                    (res) => {
                        this._primengProgressBarService.hide();
                        debugger;
                        this.endpointList = [];
                        if (Array.isArray(res)) {
                            debugger;
                            this.endpointList = res;
                        } else {
                            this.endpointList.push(res);
                        }
                        this.endpointList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false),
                        );
                        for (let k = 0; k < this.endpointList.length; k++) {
                            this.endpointList[k] = Object.assign(
                                this.endpointList[k],
                                { row: k + 1 },
                            );
                        }
                        for (let i = 0; i < this.endpointList.length; i++) {
                            debugger;
                            if (
                                this.endpointList[i].isSystemEndpointDetail == 1
                            ) {
                                debugger;
                                this.endpointListIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            } else {
                                this.endpointNotIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            }
                        }
                        this.endpointList.map((x) =>
                            x.isSystemEndpointDetail == 1
                                ? (x.isSystemEndpointDetail = true)
                                : (x.isSystemEndpointDetail = false),
                        );
                        this.tblFlag = true;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );
        }

    }

    showAdd() {
        debugger;
        this.updateEndpointHeaderDto = {
            apiEndpointHeaderFlag: null,
            apiBaseFlag: this.apiBase,
            apiId: null,
        };
        console.log(this.apiEndpointHeaderFlag);
        if (this.apiEndpointHeaderFlag) {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = true;
        } else {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = false;
        }
        this.updateEndpointHeaderDto.apiId = this.apiId;
        debugger
        this.registerFlag = true;
    }

    showUpdate(EndpointHeader) {
        /*  this.updateEndpointHeaderDto = {
              title: '',
              status: null,
              partyid: null,

          };*/

        this.updateEndpointHeaderDto = EndpointHeader;
        this.updateEndpointHeaderDto.apiBaseFlag = this.apiBase;

        this.updateEndpointHeaderDto.isSystemEndpointDetail =
            EndpointHeader.isSystemEndpointDetail;
        if (this.apiEndpointHeaderFlag) {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = true;
        } else {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = false;
        }

        this.updateEndpointHeaderDto.apiId = this.apiId;
        this.updateFlag = true;
    }

    onClose(event) {
        this.scrollTop();

        if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        }
        if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        }
        if (event == 'close') {
            this.registerFlag = false;
            this.updateFlag = false;
        } else if (event == 'closeAndCreate') {
            if (this.inputEndpointHeader != undefined) {
                this.apiEndpointHeaderFlag = false;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .getbyendpointid(this.endpointid)
                    .subscribe(
                        (getAllResponse) => {
                            this._primengProgressBarService.hide();
                            this.endpointListIsSystemEndpointDetail = [];
                            this.endpointNotIsSystemEndpointDetail = [];
                            this.endpointList = [];
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { row: k + 1 },
                                );
                                /*(this.partyList[k].row = (k+1))*/
                            }

                            for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i]
                                        .isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        },
                    );
                this.registerFlag = false;
                this.updateFlag = false;
            } else if (this.inputApiEndpointHeader != undefined) {
                this.apiEndpointHeaderFlag = true;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .endpointdetailByApi(this.apiId)
                    .subscribe(
                        (res) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointNotIsSystemEndpointDetail = [];
                            if (Array.isArray(res)) {
                                for (let i = 0; i < res.length; i++) {
                                    debugger;
                                    if (res[i].isSystemEndpointDetail != 1) {
                                        debugger;
                                        this.endpointNotIsSystemEndpointDetail.push(
                                            res[i],
                                        );
                                    }
                                }
                            }
                            this.endpointNotIsSystemEndpointDetail.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            for (
                                let k = 0;
                                k <
                                this.endpointNotIsSystemEndpointDetail.length;
                                k++
                            ) {
                                this.endpointNotIsSystemEndpointDetail[k] =
                                    Object.assign(
                                        this.endpointNotIsSystemEndpointDetail[
                                            k
                                            ],
                                        { row: k + 1 },
                                    );
                            }

                            this.endpointNotIsSystemEndpointDetail.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        },
                    );
                this.registerFlag = false;
                this.updateFlag = false;
            }
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
