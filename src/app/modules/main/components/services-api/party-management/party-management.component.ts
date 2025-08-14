import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import {ModuleDto} from "../../../models/ModuleDto";
import { PrimeNG } from 'primeng/config';
import {ActivatedRoute} from "@angular/router";
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Panel } from 'primeng/panel';
import { ButtonDirective } from 'primeng/button';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../../shared/pipes/status.pipe';
import { Ripple } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { CommonValidationsService } from '../../../../shared/validators/common-validations.service';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { PartyRegisterComponent } from './party-register/party-register.component';
import { PartyUpdateComponent } from './party-update/party-update.component';
import { ModuleApiManagementComponent } from '../module-api-management/module-api-management.component';
import {InputText} from "primeng/inputtext";
import { Toast } from 'primeng/toast';
import { MorChar32Pipe } from '../../../../shared/pipes/morChar32.pipe';

@Component({
    selector: 'app-party-management',
    templateUrl: './party-management.component.html',
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        NgIf,
        Panel,
        FormsModule,
        ButtonDirective,
        TranslocoPipe,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        NgStyle,
        StatusPipe,
        Ripple,
        Menu,
        DropdownModule,
        PartyRegisterComponent,
        PartyUpdateComponent,
        ModuleApiManagementComponent,
        InputText,
        Toast,
        NgClass,
        MorChar32Pipe,
    ],
    styleUrls: ['./party-management.component.scss'],
})
export class PartyManagementComponent implements OnInit {
    @Output() close: EventEmitter<string> = new EventEmitter<string>();
    @Input() inputModuleUpdate: ModuleDto;
    @Input() inputUpdate;

    onKeydown(event): void {
        debugger
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchClick(true);
        }
    }

    tempPartySearch = '';
    searchFlag: Boolean = false;
    addFlag: Boolean = false;
    updateFlag: Boolean = false;
    moduleApiFlag: Boolean = false;
    partyList: any[] = [];
    title: string = '';
    moduleTitle;
    detailsBreadObject: any[] = [];
    statuses: any[] = [];
    tempParty: any;
    items: any[] = [];
    first: number = 0;
    rows: number = 10;
    pageno: number = 0;
    totalRecords: number = 0;
    pagesize = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    nextBtnFlag: boolean = false;
    partyDto: {
        title: string;
        status: null;
        partyId: null;
        partyBase: boolean;
    };
    partyNameDir;
    paginationLabel=this.transloco.translate('label.pagination.table');

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private fb: FormBuilder,
        private transloco :TranslocoService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService,
        private commonValidationsService: CommonValidationsService,
        private primeng: PrimeNG
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        debugger;
        this.scrollTop();
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.modulesParty'),
                        icon: '',
                        command: (): void => {
                            this.showModule(this.tempParty);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: (): void => {
                            this.showUpdate(this.tempParty);
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
        /* if (window.localStorage.getItem('partyUpdate') != null &&
             window.localStorage.getItem('partyUpdate') != undefined) {
             debugger
             this.partyDto = {
                 title: '',
                 status: null,
                 partyId: null,
                 partyBase: false
             };
             this.partyDto = JSON.parse( window.localStorage.getItem('partyUpdate'));
             this.updateFlag = true;
             debugger
         }else  if (window.localStorage.getItem('partyBase') != null &&
             window.localStorage.getItem('partyBase') != undefined) {
             debugger
             this.partyDto = {
                 title: '',
                 status: null,
                 partyId: null,
                 partyBase: false
             };
             this.partyDto = JSON.parse( window.localStorage.getItem('partyBase'));
             this.partyDto.partyBase = true;
             this.moduleApiFlag = true;
             debugger
         }else {*/
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                img_index0: 'assets/icons/team.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1:this.transloco.translate('breadcrumbs.party'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/party.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        this.partyList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        //  this.messagesApiFacadeService.getpartyinfo(this.pageno, this.pagesize, this.title).subscribe((httpResponse: HttpResponse<any>) => {
        this.messagesApiFacadeService
            .getpartyinfo(this.pageno, this.pagesize, this.title)
            .subscribe(
                (httpResponse) => {
                    debugger;
                    // this.totalRecords = parseInt(httpResponse.headers.get('totalitems'))
                    this._primengProgressBarService.hide();
                    this.partyList = httpResponse;
                    // if (Array.isArray(httpResponse.body)) {
                    //     this.partyList = httpResponse.body
                    // } else {
                    //     this.partyList.push(httpResponse.body)
                    //
                    // }
                 /*   this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );*/
                    console.log(this.partyList,'party');
                    this.partyList = this.partyList?.filter(x => x != null)?.map(x => {
                            x.status = x.status === 1;
                            return x;
                        });

                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesize + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        this.inputModuleUpdate != undefined
            ? (this.moduleTitle = this.inputModuleUpdate.moduleTitle)
            : (this.moduleTitle = '');
        //   }
    }

    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }

    validationSearchByTitle(): boolean {
        debugger
        if (this.title && this.title.length < 3) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان سازمان را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    showAdd(): void {
        this.addFlag = true;
    }

    showUpdate(party): void {
        // window.localStorage.setItem('partyUpdate',
        //     JSON.stringify(party)
        // );
        this.partyDto = {
            title: '',
            status: null,
            partyId: null,
            partyBase: false,
        };
        this.partyDto = party;
        this.updateFlag = true;
    }

    showModule(party): void {
        // window.localStorage.setItem('partyBase',
        //     JSON.stringify(party)
        // );
        this.partyDto = {
            title: '',
            status: null,
            partyId: null,
            partyBase: false,
        };
        this.partyDto = party;
        this.partyDto.partyBase = true;
        this.moduleApiFlag = true;
    }

    setRecord(party): void {
        this.tempParty = party;
    }

    onClose(e: any): void {
        this.scrollTop();
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                img_index0: 'assets/icons/team.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1:this.transloco.translate('breadcrumbs.party'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/party.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        if (e === 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.moduleApiFlag = false;
        } else if (e === 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.moduleApiFlag = false;
            this.partyList = [];
            this.pageno = 0;
            this.pagesize = 5;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this.search();
        }
    }

    clear(): void {
        this.title = '';
        this.partyList = [];
        this.pageno = 0;
        this.pagesize = 5;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
        this.nextBtnFlag = false;
    }

    searchClick(flag: boolean) {
        debugger
        if (flag) {debugger
            if (this.validationSearchByTitle()) {
                this.pageno = 0;
                this.pagesize = 5;
                this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                this.search();
            }
        } else {debugger
            this.search();
        }
    }

    loadData(event) {
        console.log(event, 'loadData');
        console.log(event, 'loadData');
        console.log(event, 'loadData');
        //this.pagesize=e.rows
        this.pagesize = Math.floor(event.first / event.rows);
        const size = event.rows;

        this.search();
    }

    search(): void {
        debugger;
        this.partyList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        // this.messagesApiFacadeService.getpartyinfo(this.pageno, this.pagesize, this.title).subscribe((response: HttpResponse<any>) => {
        this.messagesApiFacadeService
            .getpartyinfo(this.pageno, this.pagesize, this.title)
            .subscribe(
                (response) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    //   this.totalRecords = parseInt(response?.headers?.get('totalItems'))
                    debugger;
                    // window.localStorage.setItem('partySearch',
                    //     JSON.stringify({pageno: this.pageno, pagesize: this.pagesize, title: this.title})
                    // );
                    this.partyList = response;
                    // if (Array.isArray(response?.body)) {
                    //     this.partyList = response.body
                    // } else {
                    //     this.partyList.push(response?.body)
                    // }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesize + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                            debugger;
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search();
    }
}
