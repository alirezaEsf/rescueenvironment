import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from '../../../../../constants/ApiGatewayConstants';

import {EndpointheaderDto} from '../../../../../models/endpointheaderDto';

import {ActivatedRoute} from '@angular/router';
import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {HeaderNameService} from '../../../../../services/headerName.service';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {Panel} from "primeng/panel";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {AutoComplete} from "primeng/autocomplete";
import {InputText} from "primeng/inputtext";
import {Checkbox} from "primeng/checkbox";

import {TranslocoPipe} from "@ngneat/transloco";
import {ButtonDirective} from "primeng/button";
import { ToggleSwitch } from 'primeng/toggleswitch';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-header-endpoint-update',
    templateUrl: './header-endpoint-update.component.html',
    styleUrls: ['./header-endpoint-update.component.scss'],
    standalone: true,
    imports: [
        Panel,
        DropdownModule,
        FormsModule,
        AutoComplete,
        InputText,
        Checkbox,
        /**/
        TranslocoPipe,
        ButtonDirective,
        ToggleSwitch,
        BreadcrumbsComponent,
        Toast,
        Ripple,

    ],
    providers: [HeaderNameService],
})
export class HeaderEndpointUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate: EndpointheaderDto;
    headerTypeValue = ApiGatewayConstants.headerType;
    headerTypeGroup = ApiGatewayConstants.headerTypeGroup;
    detailType;
    actionType;
    inputName;
    inputValue;
    ouputName;
    outputValue;
    // beforeEndpointId
    // afterEndpointId
    status;
    isSystemEndpointDetail;
    endpointDetailId;
    inputHeaderNameFlag = false;
    inputHeaderValueFlag = false;
    ouputHeaderNameFlag = false;
    outputHeaderValueFlag = false;
    inputHeaderNameStar = '*';
    ouputHeaderNameStar = '*';
    outputHeaderValueStar = '*';
    inputHeaderValueStar = '*';
    //beforeEndpointIdStar
    //afterEndpointIdStar
    updateTemp: EndpointheaderDto = {
        actionType: null,
        status: null,
        inputName: '',
        inputValue: '',
        ouputName: '',
        outputValue: '',
        // beforeEndpointId: null,
        // afterEndpointId: null,
        endpointDetailId: null,
        detailType: null,
    };
    filteredGroups: any[];
    headerName: any[];
    checkElementPath;
    showMessage = false;
    checked;
    bodyFlag = true;
    headerEdit = 'ویرایش المان های اندپوینت';
    apiBaseFlag: boolean = false;
    cust_alphanEnAndSlash: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderLine;

    constructor(
        private route: ActivatedRoute,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiFacadeService: ApiGatewayService,
        private notifierService: ToastService,
        private headerNameService: HeaderNameService
    ) {}

    bodyState(e) {
        if (this.inputUpdate != undefined) {
            if (this.inputUpdate.apiBaseFlag == true) {
                if (e.value == '1') {
                    (this.apiBaseFlag = true),
                        (this.actionType = '1'),
                        this.onChangeHeaderType('1');
                } else {
                    (this.apiBaseFlag = false),
                        (this.actionType = null),
                        this.onChangeHeaderType(null);
                }
            } else {
                (this.apiBaseFlag = false),
                    (this.actionType = null),
                    this.onChangeHeaderType(null);
            }
        } else {
            (this.apiBaseFlag = false),
                (this.actionType = null),
                this.onChangeHeaderType(null);
        }

        if (e.value == '2') {
            this.bodyFlag = false;
        } else {
            this.checked = false;
            this.checkElementPath = '';
            this.bodyFlag = true;
        }
    }

    onShowMessage(e) {
        this.checkElementPath != null || this.checkElementPath != ''
            ? (this.showMessage = true)
            : (this.showMessage = false);
    }

    search(event) {
        //console.log('start')
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;
        //console.log('headerName',this.headerName.length)

        for (let i = 0; i < this.headerName?.length; i++) {
            let char = this.headerName[i];
            //console.log('char',char)
            if (char.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(char);
                //console.log('filtered',filtered)
            }
        }

        this.filteredGroups = filtered;
        // this.filteredGroups = this.headerName;
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
        this.inputUpdate != undefined
            ? this.inputUpdate.apiBaseFlag == false
                ? (this.headerEdit = 'ویرایش المان های اندپوینت')
                : (this.headerEdit = 'ویرایش المان های سرویس')
            : null;
        this.inputUpdate != undefined
            ? this.inputUpdate.apiBaseFlag == true
                ? ((this.detailType = '1'),
                  (this.apiBaseFlag = true),
                  (this.actionType = '1'))
                : ((this.apiBaseFlag = false),
                  (this.detailType = null),
                  (this.actionType = null))
            : null;
        this.inputUpdate.status == 1
            ? (this.status = true)
            : (this.status = false);
        this.inputUpdate.isSystemEndpointDetail == 1
            ? (this.isSystemEndpointDetail = true)
            : (this.isSystemEndpointDetail = false);
        this.actionType = this.inputUpdate.actionType.toString();

        this.detailType = this.inputUpdate.detailType.toString();
        // this.inputName = this.inputUpdate.inputName;
        this.inputName = {
            name: this.inputUpdate.inputName,
            code: this.inputUpdate.inputName,
        };
        this.inputValue = this.inputUpdate.inputValue;

        //  this.ouputName = this.inputUpdate.ouputName;
        this.ouputName = {
            name: this.inputUpdate.ouputName,
            code: this.inputUpdate.ouputName,
        };
        this.outputValue = this.inputUpdate.outputValue;
        //this.beforeEndpointId = this.inputUpdate.beforeEndpointId;
        // this.afterEndpointId = this.inputUpdate.afterEndpointId;
        this.endpointDetailId = this.inputUpdate.endpointDetailId;
        this.checkElementPath = this.inputUpdate.checkElementPath;
        if (this.actionType === '1') {
            this.inputHeaderNameFlag = true;
            this.inputHeaderValueFlag = true;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;

            this.inputName = '';
            this.inputValue = '';
            this.ouputHeaderNameStar = '*';
            this.outputHeaderValueStar = '*';
            this.inputHeaderNameStar = '';
            this.inputHeaderValueStar = '';
            //  this.beforeEndpointIdStar = ""
            // this.afterEndpointIdStar = ""
        } else if (this.actionType === '2') {
            this.inputHeaderNameFlag = false;
            this.inputHeaderValueFlag = false;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '*';
            this.outputHeaderValueStar = '*';
            this.inputHeaderNameStar = '*';
            this.inputHeaderValueStar = '*';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else if (this.actionType === '3') {
            this.inputValue = '*';
            this.inputHeaderValueFlag = true;
            this.outputValue = '*';
            this.outputHeaderValueFlag = true;
            this.inputHeaderNameFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '*';
            this.outputHeaderValueStar = '';
            this.inputHeaderNameStar = '*';
            this.inputHeaderValueStar = '';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else {
            this.inputHeaderNameFlag = false;
            this.inputHeaderValueFlag = false;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
        }
        /*  this.headerNameService.getCountries().then(name => {
              this.headerName = name;
          });*/
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getinputheadernamesUrl().subscribe(
            (h) => {
                this._primengProgressBarService.hide();
                this.headerName = h.data;
            },
            (error) => {
                this._primengProgressBarService.hide();
                this.headerName = JSON.parse(error?.error?.text);
            }
        );
        if (this.detailType == '2') {
            this.bodyFlag = false;
        } else {
            this.checked = false;
            this.checkElementPath = '';
            this.bodyFlag = true;
        }
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }

    onChangeHeaderType(e: any) {
        if (this.actionType === '1') {
            this.inputHeaderNameFlag = true;
            this.inputHeaderValueFlag = true;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.inputName = '';
            this.inputValue = '';
            this.ouputName = '';
            this.outputValue = '';
            this.ouputHeaderNameStar = '*';
            this.outputHeaderValueStar = '*';
            this.inputHeaderNameStar = '';
            this.inputHeaderValueStar = '';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else if (this.actionType === '2') {
            this.inputHeaderNameFlag = false;
            this.inputHeaderValueFlag = false;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '*';
            this.outputHeaderValueStar = '*';
            this.inputHeaderNameStar = '*';
            this.inputHeaderValueStar = '*';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else if (this.actionType === '3') {
            this.inputValue = '*';
            this.inputHeaderValueFlag = true;
            this.outputValue = '*';
            this.outputHeaderValueFlag = true;
            this.inputHeaderNameFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '*';
            this.outputHeaderValueStar = '';
            this.inputHeaderNameStar = '*';
            this.inputHeaderValueStar = '';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else {
            this.inputHeaderNameFlag = false;
            this.inputHeaderValueFlag = false;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.inputName = '';
            this.inputValue = '';
            this.ouputName = '';
            this.outputValue = '';
        }
    }

    onUpdate() {
        debugger;
        if (this.validationRegister()) {
            debugger;
            this.updateTemp.actionType = +this.actionType;
            this.status == true
                ? (this.updateTemp.status = 1)
                : (this.updateTemp.status = 0);
            if (typeof this.inputName == 'object') {
                this.updateTemp.inputName = this.inputName.name;
            } else {
                this.updateTemp.inputName = this.inputName;
            }
            if (typeof this.ouputName == 'object') {
                this.updateTemp.ouputName = this.ouputName.name;
            } else {
                this.updateTemp.ouputName = this.ouputName;
            }
            this.updateTemp.inputValue = this.inputValue;
            this.updateTemp.outputValue = this.outputValue;
            // this.updateTemp.beforeEndpointId = +this.beforeEndpointId;
            //  this.updateTemp.afterEndpointId = +this.afterEndpointId;
            this.updateTemp.endpointDetailId = +this.endpointDetailId;
            this.updateTemp.detailType = +this.detailType;
            this.updateTemp.isSystemEndpointDetail = 0;

            if (this.checked == false) {
                this.checkElementPath = null;
            }
            if (
                this.checkElementPath != null &&
                this.checkElementPath != undefined
            ) {
                let firstChar = this.checkElementPath.charAt(0);
                firstChar != '/'
                    ? (this.checkElementPath = '/' + this.checkElementPath)
                    : this.checkElementPath;
            }
            this.updateTemp.checkElementPath = this.checkElementPath;
            this.inputUpdate.isSystemEndpointDetail == 1
                ? (this.updateTemp.isSystemEndpointDetail = 1)
                : (this.updateTemp.isSystemEndpointDetail = 0);

            if (this.inputUpdate != undefined) {
                let levelId: number = null;
                let recordId: number = null;
                if (this.inputUpdate.apiEndpointHeaderFlag) {
                    levelId = 1;
                    recordId = this.inputUpdate.apiId;
                } else if (!this.inputUpdate.apiEndpointHeaderFlag) {
                    this.apiFacadeService.currentApprovalStageEndpointIdHeader.subscribe(
                        (msg) => {
                            recordId = Number(msg);
                            levelId = 0;
                        },
                        (error) => {}
                    );
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerEndpointdetail(levelId, recordId, this.updateTemp)
                    .subscribe(
                        (a) => {
                            this._primengProgressBarService.hide();
                            this.close.emit('closeAndCreate');
                        },
                        (error) => {
                            debugger;
                            this._primengProgressBarService.hide();
                            console.log(error);
                            this.close.emit('close');
                        }
                    );
            }
        }
    }

    onCancel() {
        this.close.emit('close');
    }

    validationRegister(): boolean {
        if (!this.detailType){
            this.notifierService.showError({
                detail: 'لطفا گروه بندی را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.actionType){
            this.notifierService.showError({
                detail: 'لطفا نوع عملیات را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        switch (this.actionType) {
            case '1':
                if (!this.ouputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.outputValue) {
                    this.notifierService.showError({
                        detail: 'لطفا مقدار خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else {
                    return true;
                }
            case '2':
                if (!this.inputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام ورودی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.inputValue) {
                    this.notifierService.showError({
                        detail: 'لطفا مقدار ورودی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.ouputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.outputValue) {
                    this.notifierService.showError({
                        detail: 'لطفا مقدار خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else {
                    return true;
                }
            case '3':
                if (!this.inputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام ورودی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.ouputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else {
                    return true;
                }
        }
    }
}
