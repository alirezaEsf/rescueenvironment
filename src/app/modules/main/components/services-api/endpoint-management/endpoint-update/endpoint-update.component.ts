import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EndpointDto} from '../../../../models/endpointDto';
import {ActivatedRoute} from '@angular/router';
import {FuseLoadingService} from '../../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../../shared/services/ToastService';
import {CommonValidationsService} from '../../../../../shared/validators/common-validations.service';
import {ApiGatewayService} from '../../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../../services/messages-api-facade.service';
import {Panel} from "primeng/panel";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {KeyFilter} from "primeng/keyfilter";

import {TranslocoPipe} from "@ngneat/transloco";
import {ButtonDirective} from "primeng/button";
import { ToggleSwitch } from 'primeng/toggleswitch';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
    selector: 'app-endpoint-update',
    templateUrl: './endpoint-update.component.html',
    styleUrls: ['./endpoint-update.component.scss'],
    standalone: true,
    imports: [
        Panel,
        FormsModule,
        InputText,
        KeyFilter,
        TranslocoPipe,
        ButtonDirective,
        ToggleSwitch,
        InputGroup,
        InputGroupAddon,

    ],
})
export class EndpointUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate: EndpointDto;

    status;
    sourceUrl: string = null;
    destinationPortNumber: string = null;
    destinationHost: string = null;
    destinationUri: string = null;
    endpointId;
    moduleId;
    updateTemp = {
        sourceUrl: '',
        status: null,
        destinationPortNumber: '',
        destinationHost: '',
        destinationUri: '',
        moduleId: null,
        endpointId: null,
    };
    slashAlpha: RegExp = /[a-zA-Z0-9/]/;

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
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

        //this.sourceUrl = this.inputUpdate.sourceUrl;
        this.inputUpdate.sourceUrl != undefined ||
        this.inputUpdate.sourceUrl != null
            ? (this.sourceUrl = this.inputUpdate.sourceUrl.replace(
                  /^\/api\//,
                  ''
              ))
            : this.inputUpdate.sourceUrl;
        this.status = this.inputUpdate.status;
        this.inputUpdate.status == 1
            ? (this.status = true)
            : (this.status = false);
        this.destinationPortNumber = this.inputUpdate.destinationPortNumber;
        this.destinationHost = this.inputUpdate.destinationHost;
        this.destinationUri = this.inputUpdate.destinationUri;
        this.endpointId = this.inputUpdate.endpointId;
        this.moduleId = this.inputUpdate.moduleId;
    }

    onClose() {
        this.close.emit('close');
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }

    onUpdate() {
        if (this.validation()) {
            /*  اضاف کردن / به ابتدا و انتهای ورودی
            let firstChar = this.sourceUrl.charAt(0);
             let lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1)
             firstChar != "/"?this.sourceUrl="/"+ this.sourceUrl: "/"+ this.sourceUrl
             lastChar != "/"?this.sourceUrl= this.sourceUrl+"/": this.sourceUrl+"/"*/
            this.apiGatewayService.currentApprovalStageModuleId.subscribe(
                (a) => {
                    this.updateTemp.moduleId = a;
                }
            );

            this.updateTemp.moduleId = this.moduleId;
            this.updateTemp.endpointId = this.endpointId;

            let firstChar = this.sourceUrl.charAt(0);
            let lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1);
            lastChar != '/'
                ? (this.sourceUrl = this.sourceUrl + '/')
                : this.sourceUrl + '/';
            firstChar != '/'
                ? (this.sourceUrl = '/' + this.sourceUrl)
                : '/' + this.sourceUrl;
            this.sourceUrl = '/api' + this.sourceUrl;
            // this.sourceUrl != null ? this.sourceUrl = this.sourceUrl.toLowerCase() : null
            // this.destinationUri != null ? this.destinationUri = this.destinationUri.toLowerCase() : null
            this.updateTemp.sourceUrl = this.sourceUrl;
            this.updateTemp.destinationPortNumber = this.destinationPortNumber;
            this.updateTemp.destinationHost = this.destinationHost;
            this.updateTemp.destinationUri = this.destinationUri;
            this.status == true
                ? (this.updateTemp.status = 1)
                : (this.updateTemp.status = 0);
            this.updateTemp.destinationHost = this.destinationHost;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .updateEndpoint(this.updateTemp)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
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
                detail: 'لطفا آدرس مقصد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            /*برداشتن pKeyFilter*/
            /* else if (this.validationsService.invalidSite(this.destinationHost)) {
             this.notifierService.showError({detail: "لطفا آدرس Host را به درستی وارد کنید!", life: 3000});
             return false;
         }*/
            return true;
        }
    }
}
