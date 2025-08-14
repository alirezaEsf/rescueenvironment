import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EndpointDto} from "../../../../models/endpointDto";
import {ApiGatewayConstants} from "../../../../constants/ApiGatewayConstants";
import {ActivatedRoute} from "@angular/router";
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { CommonValidationsService } from '../../../../../shared/validators/common-validations.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { Card } from 'primeng/card';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { KeyFilter } from 'primeng/keyfilter';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
    selector: 'app-endpoint-register',
    templateUrl: './endpoint-register.component.html',
    styleUrls: ['./endpoint-register.component.scss'],
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

        ConfirmDialog,
        DropdownModule,

        HeaderEndpointRegisterComponent,


        /*  InputTextarea,
        TranslocoDirective,
        NgIf,
          MatTooltip,
         MatIcon,
         Message,
        * Checkbox,
        NgClass,*/
        /*Steps,*/


        /* DbEnginePipe,*/

        Card,
        ToggleSwitch,
        KeyFilter,
        InputGroup,
        InputGroupAddon,
    ],
})
export class EndpointRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputRegister;
    // slashAlpha: RegExp = /^[a-zA-Z\/]+$/;
    slashAlpha: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderDashLine;
    //slashDotAlpha: RegExp = /^[a-zA-Z\/\.]+$/;
    slashDotAlpha: RegExp = /[a-zA-Z0-9/.]/;
    moduleId: number;
    clientBase: boolean = false;
    status = true;
    sourceUrl: string = null;
    destinationPortNumber: string = null;
    destinationHost: string = null;
    destinationUri: string = null;
    registerTemp = {
        moduleId: null,
        sourceUrl: null,
        status: null,
        destinationPortNumber: null,
        destinationHost: null,
        destinationUri: null,
    };
    dubFlag = true;
    clientTemp = {
        apikey: '',
        name: '',
        mobileNo: '',
        publicKey: '',
        digitalPublickey: '',
        status: null,
        organizationCode: '',
        allowedAccountno: null,
        endpointId: null,
        clientId: null,
    };
    aaaa = 'www.google.com' + 'یا' + '192.168.100.20';
    clientName;
    mobile;
    clientKey;
    mobileNo;
    dialogClientFlag = false;
    organizationCode;
    clientList = [];
    tempClient;
    clientId;
    clientAttachList = [];
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private transloco :TranslocoService,
        private validationsService: CommonValidationsService
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();

        if (this.inputRegister != undefined) {
            this.moduleId = this.inputRegister.moduleId;
            this.clientBase = this.inputRegister.clientBase;
            if (this.clientBase) {
                console.log('inputRegister', this.inputRegister);
                this.clientList.push(this.inputRegister);
                console.log('clientList', this.clientList);
            }
            /*   else {
                   this.clientTemp = {
                       apikey: '',
                       name: '',
                       mobileNo: '',
                       publicKey: '',
                       digitalPublickey: '',
                       status: null,
                       organizationCode: '',
                       allowedAccountno: null,
                       endpointId: null,
                       clientId: null,
                   }
                   this.clientTemp.allowedAccountno = this.inputRegister.allowedAccountno
                   this.clientTemp.apikey = this.inputRegister.apikey
                   this.clientTemp.clientId = this.inputRegister.clientId
                   this.clientTemp.endpointId = this.inputRegister.endpointId
                   this.clientTemp.mobileNo = this.inputRegister.mobileNo
                   this.clientTemp.name = this.inputRegister.name
                   this.clientTemp.organizationCode = this.inputRegister.organizationCode
                   this.clientTemp.status = this.inputRegister.status
                   console.log('clientTemp',this.clientTemp)

                   this.clientList.push(this.clientTemp)
                   console.log('clientList',this.clientList)
               }*/
        }
    }

    onKeydownSearch(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.clientSearch();
        }
    }

    clientSearch() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .clientsearchbyclientnameandmobileno(this.clientName, this.mobile)
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    this.clientAttachList = a;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    //this.
    showClients() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientgetall().subscribe(
            (c) => {
                this._primengProgressBarService.hide();
                this.clientAttachList = c;
                this.dialogClientFlag = true;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    selectedClient(client) {
        this.dubFlag = true;
        this.dialogClientFlag = false;
        this.mobile = '';
        this.clientName = '';
        //console.log(this.clientList, 'ghabl')
        this.clientTemp = {
            apikey: '',
            name: '',
            mobileNo: '',
            publicKey: '',
            digitalPublickey: '',
            status: null,
            organizationCode: '',
            allowedAccountno: null,
            endpointId: null,
            clientId: null,
        };
        this.clientTemp.allowedAccountno = client.allowedAccountno;
        this.clientTemp.clientId = client.clientId;
        this.clientTemp.digitalPublickey = client.digitalPublickey;
        this.clientTemp.mobileNo = client.mobileNo;
        this.clientTemp.name = client.name;
        this.clientTemp.organizationCode = client.organizationCode;
        this.clientTemp.publicKey = client.publicKey;
        this.clientTemp.status = client.status;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.randomapikey().subscribe(
            (f) => {
                this._primengProgressBarService.hide();
                this.clientTemp.apikey = f;
                for (let i = 0; i < this.clientList.length; i++) {
                    if (this.clientList[i].clientId == client.clientId) {
                        this.dubFlag = false;
                    }
                }
                if (this.dubFlag) {
                    this.clientList.push(this.clientTemp);
                } else {
                    this.notifierService.showError({
                        detail: 'این کلاینت قبلا به لیست اتصال اضافه شده است!',
                        life: 3000,
                    });
                }

                //console.log(this.clientList, 'bad')
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    clear() {
        this.mobile = '';
        this.clientName = '';
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientgetall().subscribe(
            (c) => {
                this._primengProgressBarService.hide();
                this.clientAttachList = c;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    deleteClient(client) {
        //console.log(this.clientList, 'ghabl')
        //console.log(this.clientList.indexOf(client))
        let itemIndex = this.clientList.indexOf(client);
        this.clientList.splice(itemIndex, 1);
        //console.log(this.clientList, 'bad')
    }

    onCancel() {
        this.close.emit('close');
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onRegister() {
        /*  اضاف کردن / به ابتدا و انتهای ورودی
          let firstChar = this.sourceUrl.charAt(0);
          let lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1)
          firstChar != "/" ? this.sourceUrl = "/" + this.sourceUrl : "/" + this.sourceUrl
          lastChar != "/" ? this.sourceUrl = this.sourceUrl + "/" : this.sourceUrl + "/"*/
        if (this.validation()) {
            /* this.apiGatewayService.currentApprovalStageModuleId.subscribe(a => {
                 this.registerTemp.moduleId = Number(a);
             })*/

            this.registerTemp.moduleId = this.moduleId;

            let firstChar = this.sourceUrl.charAt(0);
            let lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1);
            lastChar != '/'
                ? (this.sourceUrl = this.sourceUrl + '/')
                : this.sourceUrl + '/';
            firstChar != '/'
                ? (this.sourceUrl = '/' + this.sourceUrl)
                : '/' + this.sourceUrl;
            this.sourceUrl = '/api' + this.sourceUrl;
            //this.sourceUrl != null ? this.sourceUrl = this.sourceUrl.toLowerCase() : null
            //this.destinationUri != null ? this.destinationUri = this.destinationUri.toLowerCase() : null
            this.registerTemp.sourceUrl = this.sourceUrl;

            this.registerTemp.destinationPortNumber =
                this.destinationPortNumber;
            this.registerTemp.destinationHost = this.destinationHost;
            this.registerTemp.destinationUri = this.destinationUri;
            if (this.status) {
                this.registerTemp.status = 1;
            } else {
                this.registerTemp.status = 0;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerEndpoint(this.registerTemp)
                .subscribe(
                    (respons) => {
                        this._primengProgressBarService.hide();
                        // this.close.emit('closeAndCreate');

                        if (this.clientList.length > 0) {
                            for (let k = 0; k < this.clientList.length; k++) {
                                this.clientList[k].endpointId =
                                    respons.endpointId;
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .registerClient(this.clientList[k])
                                    .subscribe(
                                        (res) => {
                                            this._primengProgressBarService.hide();
                                            this.close.emit('closeAndCreate');
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        }
                                    );
                            }
                        } else {
                            this.close.emit('closeAndCreate');
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    validation(): boolean {
        if (!this.sourceUrl) {
            this.notifierService.showError({
                detail: 'لطفا آدرس مبدا را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.destinationHost) {
            this.notifierService.showError({
                detail: 'لطفا آدرس Host را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            /*برداشتن pKeyFilter*/
            /*
       else if (this.validationsService.invalidSite(this.destinationHost)) {
           this.notifierService.showError({detail: "لطفا آدرس Host را به درستی وارد کنید!", life: 3000});
           return false;
       } */
            return true;
        }
    }
}
