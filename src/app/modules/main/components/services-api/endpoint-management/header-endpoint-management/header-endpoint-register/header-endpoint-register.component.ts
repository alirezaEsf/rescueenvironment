import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../../../constants/ApiGatewayConstants";
import {EndpointheaderDto} from "../../../../../models/endpointheaderDto";
import {ActivatedRoute} from "@angular/router";
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {TranslocoPipe} from '@ngneat/transloco';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitch} from 'primeng/inputswitch';
import {Checkbox} from 'primeng/checkbox';
import {AutoComplete} from 'primeng/autocomplete';
import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {HeaderNameService} from '../../../../../services/headerName.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Ripple } from 'primeng/ripple';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header-endpoint-register',
    templateUrl: './header-endpoint-register.component.html',
    styleUrls: ['./header-endpoint-register.component.scss'],
    standalone: true,
    imports: [
        Panel,
        DropdownModule,
        FormsModule,
        AutoComplete,
        InputText,
        Checkbox,
        /*  */
        ButtonDirective,
        TranslocoPipe,
        ToggleSwitch,
        Ripple,
        BreadcrumbsComponent,
        Toast,
        CommonModule
    ],
    providers: [HeaderNameService],
})
export class HeaderEndpointRegisterComponent implements OnInit, AfterViewInit {
    @Output() close = new EventEmitter<string>();
    @Input() input: EndpointheaderDto;
    @Input() hubInput;
    headerTypeValue = ApiGatewayConstants.headerType;
    headerTypeGroup = ApiGatewayConstants.headerTypeGroup;
    actionType;
    detailType;
    endpointId;
    inputName;
    inputValue;
    ouputName;
    outputValue;
    // beforeEndpointId
    // afterEndpointId
    status;
    detailTypeFlag = false;
    inputHeaderNameFlag = false;
    inputHeaderValueFlag = false;
    ouputHeaderNameFlag = false;
    outputHeaderValueFlag = false;
    inputHeaderNameStar = '* ';
    ouputHeaderNameStar = '* ';
    outputHeaderValueStar = '* ';
    inputHeaderValueStar = '* ';
    // beforeEndpointIdStar
    // afterEndpointIdStar
    stateofFlag = 1;
    registerTemp: EndpointheaderDto = {
        actionType: null,
        status: null,
        inputName: '',
        inputValue: '',
        ouputName: '',
        outputValue: '',
        // beforeEndpointId: null,
        //  afterEndpointId: null,
        detailType: null,
        checkElementPath: null,
    };
    filteredGroups: any[];
    headerName: any[];
    checkElementPath: string = null;
    showMessage = false;
    checked;
    bodyFlag = true;
    apiBaseFlag: boolean = false;
    headerRegister = 'ثبت المان های اندپوینت';
    cust_alphanEnAndSlash: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderLine;

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiFacadeService: ApiGatewayService,
        private notifierService: ToastService,
        private headerNameService: HeaderNameService
    ) {
    }

    onShowMessage(e) {
        this.checkElementPath != null || this.checkElementPath != ''
            ? (this.showMessage = true)
            : (this.showMessage = false);
    }

    bodyState(e) {
        if (this.input != undefined) {
            if (this.input.apiBaseFlag == true) {
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

    search(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;
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

    ngAfterViewInit() {
        debugger
        console.log('child => ngAfterViewInit()');
        //debugger
        if (this.hubInput != undefined) {
            debugger;
            debugger;
            this.detailType = '3';
            this.detailTypeFlag = true;
        }
    }

    ngOnInit(): void {
        debugger;
        this.scrollTop();

        this.input != undefined
            ? this.input.apiBaseFlag == false
                ? (this.headerRegister = 'ثبت المان های اندپوینت')
                : (this.headerRegister = 'ثبت المان های سرویس')
            : null;
        this.input != undefined
            ? this.input.apiBaseFlag == true
                ? ((this.detailType = '1'),
                    (this.apiBaseFlag = true),
                    (this.actionType = '1'))
                : ((this.apiBaseFlag = false),
                    (this.detailType = null),
                    (this.actionType = null))
            : null;
        this.status = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getinputheadernamesUrl().subscribe(
            (h) => {
                debugger;
                this._primengProgressBarService.hide();
                debugger;
                this.headerName = h?.data;
                debugger;
            },
            (error) => {
                /*   debugger
                this._primengProgressBarService.hide()
                debugger
               let temp  = JSON.parse(error?.error?.text)
                this.headerName = temp.data*/
                debugger;
                try {
                    let cleanedText = error?.error?.text
                        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
                        .replace(/\s+/g, ' ')
                        .trim();
                    let temp = JSON.parse(cleanedText);
                    this.headerName = temp.data;
                } catch (e) {
                    console.error('خطا در parsing JSON', e);
                    this.headerName = [];
                } finally {
                    this._primengProgressBarService.hide();
                }
            }
        );
        debugger;
        if (this.hubInput != undefined) {
            debugger;
            this.detailType = '3';
            this.detailTypeFlag = true;
        }
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

    onChangeHeaderType(e: any) {
        debugger;
        if (this.actionType === '1') {
            this.inputHeaderNameFlag = true;
            this.inputHeaderValueFlag = true;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.inputName = '';
            this.inputValue = '';
            this.ouputName = '';
            this.outputValue = '';
            this.ouputHeaderNameStar = '* ';
            this.outputHeaderValueStar = '* ';
            this.inputHeaderNameStar = '';
            this.inputHeaderValueStar = '';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else if (this.actionType === '2') {
            this.inputHeaderNameFlag = false;
            this.inputHeaderValueFlag = false;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '* ';
            this.outputHeaderValueStar = '* ';
            this.inputHeaderNameStar = '* ';
            this.inputHeaderValueStar = '* ';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else if (this.actionType === '3') {
            this.inputValue = '* ';
            this.inputHeaderValueFlag = true;
            this.outputValue = '* ';
            this.outputHeaderValueFlag = true;
            this.inputHeaderNameFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '* ';
            this.outputHeaderValueStar = '';
            this.inputHeaderNameStar = '* ';
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

    onRegister() {
        debugger
        if (this.validationRegister()) {
            debugger;
            this.registerTemp.actionType = +this.actionType;
            this.registerTemp.detailType = +this.detailType;
            this.status == true
                ? (this.registerTemp.status = 1)
                : (this.registerTemp.status = 0);
            // this.registerTemp.inputName = this.inputName;
            // this.registerTemp.ouputName = this.ouputName;
            if (typeof this.inputName == 'object') {
                this.registerTemp.inputName = this.inputName.name;
            } else {
                this.registerTemp.inputName = this.inputName;
            }
            if (typeof this.ouputName == 'object') {
                this.registerTemp.ouputName = this.ouputName.name;
            } else {
                this.registerTemp.ouputName = this.ouputName;
            }
            this.registerTemp.inputValue = this.inputValue;
            this.registerTemp.outputValue = this.outputValue;
            this.registerTemp.isSystemEndpointDetail = 0;
            //  this.registerTemp.beforeEndpointId = +this.beforeEndpointId;
            // this.registerTemp.afterEndpointId = +this.afterEndpointId;
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
                    : '/' + this.checkElementPath;
            }
            this.registerTemp.checkElementPath = this.checkElementPath;
            console.log('registerTemp', this.registerTemp);

            if (this.input != undefined) {
                let levelId: number = null;
                let recordId: number = null;
                debugger;
                if (this.input.apiEndpointHeaderFlag) {
                    levelId = 1;
                    recordId = this.input.apiId;
                } else if (!this.input.apiEndpointHeaderFlag) {
                    this.apiFacadeService.currentApprovalStageEndpointIdHeader.subscribe(
                        (msg) => {
                            recordId = Number(msg);
                            levelId = 0;
                        },
                        (error) => {
                        }
                    );
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerEndpointdetail(
                        levelId,
                        recordId,
                        this.registerTemp
                    )
                    .subscribe(
                        (a) => {
                            this._primengProgressBarService.hide();
                            this.close.emit('closeAndCreate');
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            console.log(error);
                            this.close.emit('close');
                        }
                    );
            } else if (this.hubInput != undefined) {
                let levelId: number = null;
                let recordId: number = null;
                debugger;
                if (this.hubInput.apiEndpointHeaderFlag) {
                    levelId = 1;
                    recordId = this.hubInput.apiId;
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .registerEndpointdetail(
                            levelId,
                            recordId,
                            this.registerTemp
                        )
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
    }

    validationRegister(): boolean {
        debugger
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
