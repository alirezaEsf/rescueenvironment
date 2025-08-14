import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Iplimit} from "../../../../models/Iplimit";

import {ActivatedRoute} from "@angular/router";
import {BreadcrumbsComponent} from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {Listbox} from 'primeng/listbox';
import {ToastService} from '../../../../../shared/services/ToastService';
import {FuseLoadingService} from '../../../../../../../@fuse/services/loading';
import {ApiGatewayService} from '../../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../../services/messages-api-facade.service';
import {CommonValidationsService} from '../../../../../shared/validators/common-validations.service';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-ip-limitation',
    templateUrl: './ip-limitation.component.html',
    styleUrls: ['./ip-limitation.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        Panel,
        Listbox,
        FormsModule,
        ButtonDirective,
        InputText,
        TranslocoPipe,
        Toast,

    ],
})
export class IpLimitationComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputIpLimit;
    ips = [];
    selectedIp;
    ip;
    flagList;
    ipAddress = [];
    iplimit: Iplimit[] = [
        {
            endpointId: null,
            ipAddress: null,
        },
    ];
    detailsBreadObject = [];
    moduleTitle;
    destinationHost;
    partyTitle;
    clientName;
    partyBase;
    clientBase;
    accessBase;
    moduleBase;

    constructor(
        private route: ActivatedRoute,
        private notifierService: ToastService,
        private validationsService: CommonValidationsService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService
    ) {
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'moduleBase':
                return [
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
                        label_index3: 'محدودیت IP',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.destinationHost + ')',
                        img_index3: 'assets/icons/limitIp.png',
                    },
                    {label_index4: null},
                    {label_index5: null},
                    {label_index6: null},
                ];
            case 'partyBase':
                return [
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
                        label_index4: 'محدودیت IP',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.destinationHost + ')',
                        img_index4: 'assets/icons/limitIp.png',
                    },
                    {label_index5: null},
                    {label_index6: null},
                ];
            case 'accessBase':
                return [

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
                        label_index2: 'محدودیت IP',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.destinationHost + ')',
                        img_index2: 'assets/icons/limitIp.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
                ];
            case 'clientBase':
                return [

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
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'اندپوینت',
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 3,
                        label_index3: 'محدودیت IP',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.destinationHost + ')',
                        img_index3: 'assets/icons/limitIp.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
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

    ngOnInit() {
        this.scrollTop();

        if (this.inputIpLimit != undefined) {
            this.moduleTitle = this.inputIpLimit.moduleTitle;
            this.destinationHost = this.inputIpLimit.destinationHost;
            this.partyTitle = this.inputIpLimit.partyTitle;
            this.clientName = this.inputIpLimit.clientName;
            this.partyBase = this.inputIpLimit.partyBase;
            this.clientBase = this.inputIpLimit.clientBase;
            this.accessBase = this.inputIpLimit.accessBase;
            this.moduleBase = this.inputIpLimit.moduleBase;

            if (this.inputIpLimit.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.inputIpLimit.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.inputIpLimit.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.inputIpLimit.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        this.flagList = true;
      /*  if (this.inputIpLimit != undefined) {
            console.log('ghablamal', this.inputIpLimit.ipAddress);
            this.ipAddress = this.inputIpLimit.ipAddress
                .replace(/\s+/g, '')
                .split('/')
                .map((ipStr) => {
                    if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipStr)) {
                        throw new Error('Invalid input: ' + ipStr);
                    }
                    return {name: ipStr};
                });
            this.ips = [...this.ipAddress];
            console.log('badamal', this.ips);
        }*/
        if (this.inputIpLimit != undefined) {
            console.log('ghablamal', this.inputIpLimit.ipAddress);
            this.ipAddress = this.inputIpLimit.ipAddress
                .replace(/\s+/g, '') // حذف فاصله‌ها
                .split('/')          // جدا کردن با /
                .filter(ipStr => ipStr) // حذف رشته‌های خالی
                .map((ipStr) => {
                    if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipStr)) {
                        throw new Error('Invalid input: ' + ipStr);
                    }
                    return { name: ipStr };
                });
            this.ips = [...this.ipAddress];
        }
    }

    onCancel() {
        this.close.emit('close');
    }

    createObjectIpsByEndpointId() {
        this.iplimit = [];
        for (let i = 0; i < this.ips.length; i++) {
            let iplimitObj = {
                endpointId: null,
                ipAddress: null,
            };
            iplimitObj.endpointId = this.inputIpLimit.endpointId;
            iplimitObj.ipAddress = this.ips[i].name;
            this.iplimit.push(iplimitObj);
        }
        return this.iplimit;
    }

    addSemicolon(iplimit) {
        let result = '';
        for (let i = 0; i < iplimit.length; i++) {
            result += iplimit[i].ipAddress.toString();
            if (i < iplimit.length - 1) {
                result += ';';
            }
        }
        return result;
    }

    onRegister() {
        this.iplimit = this.createObjectIpsByEndpointId();
        let result = this.addSemicolon(this.iplimit);
        let iplimitObj = {
            endpointId: null,
            ipAddress: null,
        };
        iplimitObj.endpointId = this.inputIpLimit.endpointId.toString();
        iplimitObj.ipAddress = result;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.registerIplimit(iplimitObj).subscribe(
            (resp) => {
                this._primengProgressBarService.hide();
                this.close.emit('close');
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    addList() {
        if (this.ipValidate()) this.ips = [...this.ips, {name: this.ip}];
    }

    remove() {
        let itemIndex = this.ips.indexOf(this.selectedIp);
        let temp = this.ips;
        this.ips = [...temp];
        this.ips.splice(itemIndex, 1);
    }

    ipValidate(): boolean {
        if (this.validationsService.invalidIp(this.ip)) {
            this.notifierService.showError({
                detail: 'لطفا Ip را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}

