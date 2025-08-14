import {Component, OnInit} from '@angular/core';
import {HubDto} from "../../models/hub.Dto";
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { DbEnginePipe } from '../../../shared/pipes/dbEngine.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterHubComponent } from './register-hub/register-hub.component';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-hub-management',
    templateUrl: './hub-management.component.html',
    standalone: true,
    styleUrls: ['./hub-management.component.scss'],
    imports: [
        BreadcrumbsComponent,
        Panel,
        NgIf,
        InputText,
        FormsModule,
        TranslocoPipe,
        ButtonDirective,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        DbEnginePipe,
        Menu,
        Ripple,
        DropdownModule,
        RegisterHubComponent,
        TranslocoDirective,
        Toast,
    ],
})
export class HubManagementComponent implements OnInit {
    updateFlag: boolean = false;
    addFlag: boolean = false;
    loading: boolean = false;
    pageno: number = 0;
    pagesize: number = 10;
    pageDescription: string =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    nextBtnFlag: boolean = false;
    hubList: any[] = [];
    items: any[] = [];
    tempHub;
    detailsBreadObject: any[] = [];
    ip;
    dbname;
    title;
    hubDto: HubDto;

    constructor(
        private apiGatewayService: ApiGatewayService,
        private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'hubBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dataHub'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/hub.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    onClose(e) {
        this.detailsBreadObject = this.chooseBread('hubBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        this.addFlag = false;
        this.search();
    }
    clear() {
        this.title = '';
        this.dbname = '';
        this.ip = '';
        this.pageno = 0;
        this.pagesize = 10;
        this.search();
    }
    onKeydown(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchClick();
        }
    }
    searchClick() {
        this.pageno = 0;
        this.pagesize = 10;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    search() {
        this.hubList = [];
        let startRow: number;
        this.loading = true;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .searchhub(
                this.pageno,
                this.pagesize,
                this.dbname,
                this.ip,
                this.title
            )
            .subscribe(
                (r) => {
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    if (Array.isArray(r)) {
                        this.hubList = r;
                    } else {
                        this.hubList.push(r);
                    }
                    // this.hubList[0].isTestConnection=1
                    this.hubList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.hubList.length; u++) {
                            this.hubList[u] = Object.assign(this.hubList[u], {
                                row: u + startRow + 1,
                            });
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.hubList.length; u++) {
                            this.hubList[u] = Object.assign(this.hubList[u], {
                                row: u + this.pagesize + 1,
                            });
                        }
                    } else {
                        for (let u = 0; u < this.hubList.length; u++) {
                            this.hubList[u] = Object.assign(this.hubList[u], {
                                row: u + 1,
                            });
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    nextPageStatement() {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }

    previousPageStatement() {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    setRecord(hub): void {
        this.tempHub = hub;
    }

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search();
    }
    showUpdate(hub) {
        this.hubDto = hub;
        this.addFlag = true;
    }
    ngOnInit(): void {
        this.items = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: (): void => {
                            this.showUpdate(this.tempHub);
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
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this.loading = true;
        this.search();
        /*
        this.messagesApiFacadeService.getAllDataHub(this.pageno, this.pagesize).subscribe(y => {

            this.loading = false;
            if (Array.isArray(y)) {
                this.hubList = y
            } else {
                this.hubList.push(y)
            }
           // this.hubList[0].isTestConnection=1
            this.hubList.map(x => (x.status === 1 ? x.status = true : x.status = false))
            if (this.pageno != 0 && this.pageno != 1) {
                for (let u = 0; u < this.hubList.length; u++) {
                    this.hubList[u] = Object.assign(this.hubList[u], {row: (u + startRow + 1)})
                }
            } else if (this.pageno == 1) {
                for (let u = 0; u < this.hubList.length; u++) {
                    this.hubList[u] = Object.assign(this.hubList[u], {row: (u + this.pagesize + 1)})
                }
            } else {
                for (let u = 0; u < this.hubList.length; u++) {
                    this.hubList[u] = Object.assign(this.hubList[u], {row: (u + 1)})

                }
            }
        })
*/

        this.detailsBreadObject = this.chooseBread('hubBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    showAdd() {
        this.hubDto = undefined;
        this.addFlag = true;
    }
}
