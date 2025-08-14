import { Component, OnInit } from '@angular/core';

import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionPanel,
} from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Panel } from 'primeng/panel';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { FuseSplashScreenService } from '../../../../../@fuse/services/splash-screen';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { MessageTypePipe } from '../../../shared/pipes/messageType.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { MessagesDto } from '../../models/messagesDto';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { MessagesRegisterComponent } from './messages-register/messages-register.component';
import { MessagesUpdateComponent } from './messages-update/messages-update.component';
import { Toast } from 'primeng/toast';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-messages-management',
    templateUrl: './messages-management.component.html',
    standalone: true,
    imports: [
        Panel,
        ReactiveFormsModule,
        KeyFilter,
        InputText,
        ButtonDirective,
        DropdownModule,
        Accordion,
        TableModule,
        Tooltip,
        NgIf,
        MoreChar19Pipe,
        MessagesCategoryPipe,
        MessageTypePipe,
        MessagesRegisterComponent,
        MessagesUpdateComponent,
        AccordionPanel,
        AccordionHeader,
        Select,
        TranslocoDirective,
        TranslocoPipe,
        AccordionContent,
        Toast,
        BreadcrumbsComponent,
    ],
    providers: [MessageService],
    styleUrls: ['./messages-management.component.scss'],
})
export class MessagesManagementComponent implements OnInit {
    registerFlag: boolean = false;
    updateFlag: boolean = false;
    updateMessageDto: MessagesDto;
    tblFlag: boolean = false;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    isSystemMessage: boolean = false;
    detailsBreadObject: any[] = [];
    messagesLIstIsSystemMessage: any[] = [];
    messagesLNottIsSystemMessage: any[] = [];
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    formTitle
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _fuseLoadingService: FuseLoadingService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private transloco :TranslocoService,
        private fb: FormBuilder
    ) {
    }

    managementForm: FormGroup = this.fb.group({
        code: [''],
        title: [''],
        text: [''],
        type: [null],
        tableId: [null],
        messageId: [''],
    });
    messagesList;
    last: any;
    totalRecords: any;

    tooltipDisabled(text): boolean {
        if (text) {
            return text.length < 19;
        } else {
            return false;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('menu.basicInfo'),
                img_index0: 'assets/icons/bulletin.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1: this.transloco.translate('menu.messages'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/message.png',
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
        debugger;
        this.search();
        debugger;
    }

    showRegister(): void {
        this.registerFlag = true;
    }

    onKeydown(event): void {
        let self = this;
        if (event.key === 'Enter') {
            self.search();
        }
    }

    onClose(e: any): void {
        this.registerFlag = false;
    }

    clear(): void {
        this.managementForm.reset();
        this.isSystemMessage = false;
        this.search();
    }

    onCloseAndUpdate(e: any): void {
        this.scrollTop();
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('menu.basicInfo'),
                img_index0: 'assets/icons/home.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1: this.transloco.translate('menu.messages'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/message.png',
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
        this.registerFlag = false;
        this.updateFlag = false;
        if (e === 'closeAndCreate') {
            this.search();
        }
    }

    search(): void {
        debugger
        // this._fuseSplashScreenService.show();
        /*this._fuseLoadingService.show();
        this.tblFlag = true;
        this.messagesLIstIsSystemMessage = [{ messageId: '12' }];
        return;*/
        this._fuseLoadingService.show();
        this.messagesApiFacadeService
            .messagesearch(
                this.managementForm.controls['code'].value,
                this.managementForm.controls['title'].value,
                this.managementForm.controls['tableId'].value,
                this.managementForm.controls['type'].value,
                this.managementForm.controls['messageId'].value
            )
            .subscribe(
                (response) => {
                    debugger
                    this._fuseLoadingService.hide();
                    debugger;
                    this.messagesList = [];
                    this.messagesLIstIsSystemMessage = [];
                    this.messagesLNottIsSystemMessage = [];
                    debugger
                    this.messagesList = response;
                    for (let i = 0; i < this.messagesList?.length; i++) {
                        debugger
                        if (this.messagesList[i].isSystemMessage == 1) {
                            debugger
                            this.messagesLIstIsSystemMessage.push(
                                this.messagesList[i]
                            );
                        } else {
                            debugger
                            this.messagesLNottIsSystemMessage.push(
                                this.messagesList[i]
                            );
                        }
                    }
                    this.messagesList?.map((x) =>
                        x.isSystemMessage == 1
                            ? (x.isSystemMessage = true)
                            : (x.isSystemMessage = false)
                    );
                    this.tblFlag = true;
                    console.log('messagesLIstIsSystemMessage',this.messagesLIstIsSystemMessage);
                    console.log('messagesLNottIsSystemMessage',this.messagesLNottIsSystemMessage);
                },
                (error) => {
                    this._fuseLoadingService.hide();
                }

            );
    }

    showUpdate(messages): void {
        this.updateMessageDto = {
            code: '',
            title: '',
            text: '',
            textEN: '',
            type: null,
            tableId: null,
            messageId: null,
            isSystemMessage: null,
        };
        this.updateMessageDto = messages;
        this.updateFlag = true;
    }
}
