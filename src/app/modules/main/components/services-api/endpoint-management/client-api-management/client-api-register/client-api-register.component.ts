import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
} from '../../header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { CommonValidationsService } from '../../../../../../shared/validators/common-validations.service';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { FileUpload } from 'primeng/fileupload';
import { KeyFilter } from 'primeng/keyfilter';
import { Card } from 'primeng/card';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
    selector: 'app-client-api-register',
    templateUrl: './client-api-register.component.html',
    styleUrls: ['./client-api-register.component.scss'],
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
        FileUpload,
        KeyFilter,
        Card,
        ToggleSwitch,
    ],
})
export class ClientApiRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() registerClintApi;
    apikey: string = null;
    name: string = null;
    mobileNo: string = null;
    publicKey: string | ArrayBuffer = null;
    digitalPublickey: string | ArrayBuffer = null;
    status: boolean = null;
    endpointID: number = null;
    organizationCode: string = null;
    allowedAccountno: number = null;
    clientTemp = {
        apikey: '',
        name: '',
        mobileNo: '',
        publicKey: '',
        digitalPublickey: '',
        status: null,
        organizationCode: '',
        allowedAccountno: null,
    };
    message: string = null;
    approvalText: string = null;
    showDialog: boolean;
    showDialog2: boolean;
    showDialog3: boolean;
    stepUpload = false;
    selectedFile: any;
    fileContent: string | ArrayBuffer = '';
    dubFlag = false;

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiFacadeService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService,
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
        this.status = true;
    }

    onCancel() {
        this.close.emit('close');
    }

    generateApikey() {
        this.apikey = '';
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.randomapikey().subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.apikey = a;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    onDisplay() {
        if (this.apikey) {
            this.showDialog = true;
        }
    }

    // fileContent: string | ArrayBuffer = '';

    onDisplayUploadPublicKey() {
        if (this.publicKey) {
            this.showDialog2 = true;
        }
    }

    onDisplayUploadDigital() {
        if (this.digitalPublickey) {
            this.showDialog3 = true;
        }
    }

    onRegister() {
        if (this.validationClient()) {
            for (let i = 0; i < this.registerClintApi.clientList.length; i++) {
                if (
                    this.mobileNo ==
                    this.registerClintApi.clientList[i].mobileNo
                ) {
                    this.dubFlag = true;
                    this.notifierService.showError({
                        detail: 'این کلاینت در لیست کلاینت های سرویس وجود دارد!',
                        life: 3000,
                    });

                    break;
                } else {
                    this.dubFlag = false;
                }
            }
            if (!this.dubFlag) {
                this.clientTemp.allowedAccountno = this.allowedAccountno;
                this.clientTemp.apikey = this.apikey;
                this.clientTemp.name = this.name;
                this.clientTemp.mobileNo = this.mobileNo;
                this.status == true
                    ? (this.clientTemp.status = 1)
                    : (this.clientTemp.status = 0);
                this.clientTemp.organizationCode = this.organizationCode;
                if (this.publicKey !== null) {
                    this.publicKey = this.publicKey.toString();
                    this.clientTemp.publicKey = this.publicKey.replace(
                        /\n/g,
                        ''
                    );
                } else {
                    this.clientTemp.publicKey = null;
                }
                if (this.digitalPublickey !== null) {
                    this.digitalPublickey = this.digitalPublickey.toString();
                    this.clientTemp.digitalPublickey =
                        this.digitalPublickey.replace(/\n/g, '');
                } else {
                    this.clientTemp.digitalPublickey = null;
                }
                ////console.log(msg + "\n")
                let tempClientApi = {
                    clientId: null,
                    apiId: null,
                    dailyCount: null,
                    weeklyCount: null,
                    monthlyCount: null,
                };
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerClient(this.clientTemp)
                    .subscribe(
                        (res) => {
                            this._primengProgressBarService.hide();
                            if (this.registerClintApi != undefined) {
                                tempClientApi.apiId =
                                    this.registerClintApi.apiId;
                                tempClientApi.dailyCount =
                                    this.registerClintApi.dailyCount;
                                tempClientApi.weeklyCount =
                                    this.registerClintApi.weeklyCount;
                                tempClientApi.monthlyCount =
                                    this.registerClintApi.monthlyCount;
                            }
                            tempClientApi.clientId = res.clientId;
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .clientAttachApi(tempClientApi)
                                .subscribe(
                                    (e) => {
                                        this._primengProgressBarService.hide();
                                        this.close.emit('closeAndCreate');
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
    }

    myUploader(event: any, fileUploaderRef: any): void {
        fileUploaderRef.clear();
        fileUploaderRef.uploadedFileCount = 0;
    }

    myUploader2(event: any, fileUploaderRef2: any): void {
        fileUploaderRef2.clear();
        fileUploaderRef2.uploadedFileCount = 0;
    }

    /*  onChange(fileList: FileList): void {
          let file = fileList[0];
          let fileReader: FileReader = new FileReader();
          let self = this;
          fileReader.onloadend = function(x) {
              self.fileContent = fileReader.result;
              ////console.log('self.fileContent');
              ////console.log(self.fileContent);
              self.publicKey = self.fileContent;
          }
          fileReader.readAsText(file);
      }*/

    onSelectPublicKey(fileList: any): void {
        let file = fileList.currentFiles[0];
        let fileReader: FileReader = new FileReader();
        let self = this;
        fileReader.onloadend = function (x) {
            self.fileContent = fileReader.result;
            ////console.log('self.fileContent');
            ////console.log(self.fileContent);
            self.publicKey = self.fileContent;
        };

        fileReader.readAsText(file);
    }

    onSelectDigital(fileList: any): void {
        let file = fileList.currentFiles[0];
        let fileReader: FileReader = new FileReader();
        let self = this;
        fileReader.onloadend = function (x) {
            self.fileContent = fileReader.result;
            ////console.log('self.fileContent');
            ////console.log(self.fileContent);
            self.digitalPublickey = self.fileContent;
        };

        fileReader.readAsText(file);
    }

    /*  let file = fileList[0];
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function(x) {
          self.fileContent = fileReader.result;
          ////console.log('self.fileContent');
          ////console.log(self.fileContent);
          self.publicKey = self.fileContent;
      }
      fileReader.readAsText(file);*/
    uploadedFiles;

    uploadHandler(event: any, fileUploaderRef: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
            ////console.log(this.uploadedFiles)
        }
        fileUploaderRef.clear();
        fileUploaderRef.uploadedFileCount = 0;
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onKeydownUploadDigital(e) {
        let self = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                self.onSelectDigital(event);
            }
        });
    }

    onKeydownUploadPublicKey(e) {
        let self = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                self.onSelectPublicKey(event);
            }
        });
    }

    onKeydownGenerate(e) {
        let self = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                self.generateApikey();
            }
        });
    }

    validationClient(): boolean {
        if (!this.name) {
            this.notifierService.showError({
                detail: 'لطفا نام را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.apikey) {
            this.notifierService.showError({
                detail: 'لطفا کلید کلاینت را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.mobileNo) {
            this.notifierService.showError({
                detail: 'لطفا شماره موبایل را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.validationsService.invalidMobile(this.mobileNo)) {
            this.notifierService.showError({
                detail: 'شماره موبایل را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.publicKey) {
            this.notifierService.showError({
                detail: 'لطفا کلید عمومی را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
