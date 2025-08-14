import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientDto} from "../../../models/clientDto";
import {ActivatedRoute} from "@angular/router";

import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { FileUpload } from 'primeng/fileupload';

import { Dialog } from 'primeng/dialog';
import { Card } from 'primeng/card';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { CommonValidationsService } from '../../../../shared/validators/common-validations.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-client-update',
    templateUrl: './client-update.component.html',
    styleUrls: ['./client-update.component.scss'],
    standalone: true,
    imports: [
        Panel,
        FormsModule,
        InputText,
        KeyFilter,
        ButtonDirective,
        MatTooltip,
        TranslocoPipe,
        TranslocoDirective,
        FileUpload,

        Dialog,
        Card,
        ToggleSwitch,
        BreadcrumbsComponent,
        Toast,
        Ripple,
    ],
})
export class ClientUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() updateClient: ClientDto;

    apikey: string = null;
    name: string = null;
    shenase: string = null;
    mobileNo: string = null;
    publicKey: string | ArrayBuffer = null
    digitalPublickey: string | ArrayBuffer = null
    status: boolean = null;
    organizationCode: string = null;
    allowedAccountno: number = null;
    clientId: number = null;
    updateTemp = {
        apikey: '',
        name: '',
        shenase: '',
        mobileNo: '',
        publicKey: '',
        digitalPublickey: '',
        status: null,
        organizationCode: '',
        allowedAccountno: null,
        clientId: null
    };
    stepUpload = false;
    showDialog: boolean;
    showDialog2: boolean;
    showDialog3: boolean;
    fileContent: string | ArrayBuffer = '';

    constructor(
        private route: ActivatedRoute,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private validationsService: CommonValidationsService,
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
        this.allowedAccountno = this.updateClient.allowedAccountno
        this.apikey = this.updateClient.apikey
        this.name = this.updateClient.name
        this.shenase = this.updateClient.shenase
        this.mobileNo = this.updateClient.mobileNo
        this.publicKey = this.updateClient.publicKey
        this.digitalPublickey = this.updateClient.digitalPublickey
        this.organizationCode = this.updateClient.organizationCode
        this.clientId = this.updateClient.clientId
        this.updateClient.status == 1 ? this.status = true : this.status = false;
    }

    onCancel() {
        this.close.emit('close');
    }

    onUpdate() {
        if (this.validationClient()) {

            this.allowedAccountno !== null ? this.updateTemp.allowedAccountno = this.allowedAccountno :
                this.allowedAccountno = null
            this.apikey !== null && this.apikey !== "" ? this.updateTemp.apikey = this.apikey :
                this.apikey = null
            this.name !== null && this.name !== "" ? this.updateTemp.name = this.name :
                this.name = null
            this.shenase !== null && this.shenase !== "" ? this.updateTemp.shenase = this.shenase :
                this.shenase = null
            this.mobileNo !== null && this.mobileNo !== "" ? this.updateTemp.mobileNo = this.mobileNo :
                this.mobileNo = null
            this.organizationCode !== null && this.organizationCode !== "" ? this.updateTemp.organizationCode = this.organizationCode :
                this.organizationCode = null
            this.updateTemp.clientId = this.clientId
            this.status == true ? this.updateTemp.status = 1 : this.updateTemp.status = 0
            if (this.publicKey !== null && this.publicKey !== "") {
                this.publicKey = this.publicKey.toString()
                this.updateTemp.publicKey = this.publicKey.replace(/\n/g, "");
            } else {
                this.updateTemp.publicKey = null;
            }
            if (this.digitalPublickey !== null && this.publicKey !== "") {
                this.digitalPublickey = this.digitalPublickey.toString()
                this.updateTemp.digitalPublickey = this.digitalPublickey.replace(/\n/g, "");
            } else {
                this.updateTemp.digitalPublickey = null;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerClient(this.updateTemp).subscribe(a => {
                this._primengProgressBarService.hide();
                this.close.emit('closeAndCreate');
            }, error => {
                this._primengProgressBarService.hide();
            });


        }

    }

    onDisplay() {

        if (this.apikey) {
            this.showDialog = true;
        }
    }

    myUploader(event: any, fileUploaderRef: any): void {
        fileUploaderRef.clear()
        fileUploaderRef.uploadedFileCount = 0;
    }

    myUploader2(event: any, fileUploaderRef2: any): void {
        fileUploaderRef2.clear()
        fileUploaderRef2.uploadedFileCount = 0;
    }

    onSelectPublicKey(fileList: any): void {

        let file = fileList.currentFiles[0];
        let fileReader
            :
            FileReader = new FileReader();
        let self = this;
        fileReader.onloadend = function (x) {

            self.fileContent = fileReader.result;
            ////console.log('self.fileContent');
            ////console.log(self.fileContent);
            self.publicKey = self.fileContent;
        };

        fileReader.readAsText(file);

    }

    generateApikey() {
        this.apikey = '';
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.randomapikey().subscribe(a => {
            this._primengProgressBarService.hide();
            this.apikey = a
        },error =>{
            this._primengProgressBarService.hide()
        })
    }

    onDisplayUploadDigital() {
        if (this.digitalPublickey) {
            this.showDialog3 = true;
        }
    }

    onDisplayUploadPublicKey() {
        if (this.publicKey) {
            this.showDialog2 = true;
        }
    }

    onSelectDigital(fileList: any): void {
        let file = fileList.currentFiles[0];
        let fileReader
            :
            FileReader = new FileReader();
        let self = this;
        fileReader.onloadend = function (x) {

            self.fileContent = fileReader.result;
            ////console.log('self.fileContent');
            ////console.log(self.fileContent);
            self.digitalPublickey = self.fileContent;
        };

        fileReader.readAsText(file);

    }

    validationClient(): boolean {
        if (!this.name) {
            this.notifierService.showError({detail: "لطفا نام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.mobileNo) {
            this.notifierService.showError({detail: "لطفا شماره موبایل را وارد کنید!", life: 3000});
            return false;
        } else if (this.validationsService.invalidMobile(this.mobileNo)) {
            this.notifierService.showError({detail: "شماره موبایل را به درستی وارد کنید!", life: 3000});
            return false;
        } else if (!this.apikey) {
            this.notifierService.showError({detail: "لطفا کلید کلاینت را وارد کنید!", life: 3000});
            return false;
        }  else if (!this.digitalPublickey) {
            this.notifierService.showError({detail: "لطفا کلید دیجیتال را وارد کنید!", life: 3000});
            return false;
        }  else {
            return true;
        }
    }
}
