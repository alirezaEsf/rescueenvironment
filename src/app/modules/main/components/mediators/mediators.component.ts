import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MessageService, TreeNode} from "primeng/api";

import {ApiGatewayConstants} from "../../constants/ApiGatewayConstants";

import moment from 'jalali-moment';

import {Tree} from "primeng/tree";

import {ActivatedRoute} from "@angular/router";
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FileUpload } from 'primeng/fileupload';
import { NgIf, NgStyle } from '@angular/common';
import { ContextMenu } from 'primeng/contextmenu';
import { Toast } from 'primeng/toast';
import { ButtonDirective } from 'primeng/button';
import { Listbox } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { ThreeDotDetailsPipe } from '../../../shared/pipes/threeDotDetails.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { TableModule } from 'primeng/table';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { Textarea } from 'primeng/textarea';
import { OrganizationChart } from 'primeng/organizationchart';
import {
    CustomHorizontalTreeComponent
} from '../../../shared/components/custom-horizontal-tree/custom-horizontal-tree.component';

@Component({
    selector: 'app-mediators',
    templateUrl: './mediators.component.html',
    styleUrls: ['./mediators.component.scss'],
    standalone: true,
    providers: [MessageService,ToastService],
    imports: [
        BreadcrumbsComponent,
        Panel,
        FileUpload,
        Tree,
        NgStyle,
        ContextMenu,
        Toast,
        ButtonDirective,
        Listbox,
        FormsModule,
        InputTextarea,
        InputText,
        Tooltip,
        ThreeDotDetailsPipe,
        MatTooltip,
        Dialog,
        TranslocoDirective,
        TranslocoPipe,
        TableModule,
        MoreChar19Pipe,
        Textarea,
        NgIf,
        OrganizationChart,
        CustomHorizontalTreeComponent,
    ],
})
export class MediatorsComponent implements OnInit {
    @Input() inputListMedia;
    @Output() close = new EventEmitter<string>();
    @ViewChild('myTree') myTree: Tree;
    files: TreeNode[];
    tempXml;
    selectedFile: TreeNode;
    selectedFileTree2: TreeNode;
    selectedTree: TreeNode[];
    pathSelect;
    withJson = '20px';
    acceptDisable = true;
    fileContent: string | ArrayBuffer = '';
    mapper = [];
    itemsList = [];
    itemsListShow = [];
    objs;
    public orgObjs: any;
    btnNextFlag = true;
    SecondFlag = true;
    btnUploadFlag = false;
    findDub = false;
    showListFlag = false;
    flagDialog: boolean;
    flagAddAndDeletedNode: boolean;
    title;
    node: any;
    isApproval = 0;
    appDate = '14020101';
    rdate = '14020102';
    apiList;
    items;
    apiName;
    apiTitle;
    moduleTitle;
    detModuleTitle;
    detApiTitle;
    detApiName;
    widthModuleTitle;
    widthApiTitle;
    widthApiName;
    selectedString: any;
    tempConst = ApiGatewayConstants.xmlString;
    keyNode;
    valueNode;
    changeTypeId;
    itemList;
    status = true;
    selectedApi = false;
    detailsBreadObject = [];
    accessBase;
    moduleBase;
    clientBase;
    clientName;
    partyTitle;
    apiiTitle;
    tempPath;
    xmlString;
    copiedPathSelect: any | string;
    newPathSelect = '';
    finalPath = '';
    give = '';
    resultSliceObject = '';
    mediatorChangeObject = {
        id: null,
        nodeName: '',
        keyNode: '',
        valueNode: '',
        changeTypeId: null,
        schemaName: null,
        status: null,
    };
    data: TreeNode[] = [
        {
            label: 'مدیرعامل',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'علی محمدی', title: 'مدیرعامل' },
            children: [
                {
                    label: 'مدیر فنی',
                    type: 'person',
                    styleClass: 'p-person',
                    data: { name: 'مریم رضایی', title: 'مدیر فنی' },
                    children: [
                        {
                            label: 'برنامه‌نویس',
                            type: 'person',
                            styleClass: 'p-person',
                            data: { name: 'احمد جعفری', title: 'برنامه‌نویس' }
                        }
                    ]
                },
                {
                    label: 'مدیر فروش',
                    type: 'person',
                    styleClass: 'p-person',
                    data: { name: 'زهرا احمدی', title: 'مدیر فروش' }
                }
            ]
        }
    ];
    pathPreview = '';
    rootNodes: TreeNode[];
    nodeId: TreeNode['key'];
    pathFromRoot: TreeNode[] = [];
    apiId;
    mediatorId = null;
    path: string = '';
    orgPath: string = '';
    first: number = 0;
    rows: number = 10;
    vtextarea;
    outerPanel;
    innerTextarea;
    objSelected;
    copyObjSelected;
    selectedObject;
    lastWord = '';
    selectedNode = '';
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private transloco :TranslocoService,
        private el: ElementRef,
        private notifierService: ToastService
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'mediatorXml':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'مدیاتور xml',
                        rout_index1: '/mediator',
                        isActive1: true,
                        img_index1: 'assets/icons/mediatorXml.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        img_index2: 'assets/icons/api.png',
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیاتور',
                        rout_index3: null,
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور xml',
                        rout_index4: '/mediator',
                        isActive4: true,
                        img_index4: 'assets/icons/mediatorXml.png',
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'کلاینت',
                        rout_index1: '/client',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیاتور',
                        rout_index3: null,
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور xml',
                        rout_index4: '/mediator',
                        isActive4: true,
                        img_index4: 'assets/icons/mediatorXml.png',
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیاتور',
                        rout_index3: null,
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور xml',
                        rout_index4: '/mediator',
                        isActive4: true,
                        img_index4: 'assets/icons/mediatorXml.png',
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
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
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور',
                        rout_index4: null,
                        isActive4: false,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 5,
                        label_index5: 'مدیاتور xml',
                        rout_index5: '/mediator',
                        isActive5: true,
                        img_index5: 'assets/icons/mediatorXml.png',
                        label_Detail_index5: '(' + this.apiiTitle + ')',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    onClose() {
        this.flagAddAndDeletedNode = false;
        this.mediatorChangeObject = {
            id: null,
            nodeName: '',
            keyNode: '',
            valueNode: '',
            changeTypeId: null,
            schemaName: null,
            status: null,
        };
        this.valueNode = '';
        this.keyNode = '';
        this.path = '';
    }

    BeforeButton() {
        this.close.emit('close');
    }

    getPath(select: TreeNode): string {
        this.path = '';

        if (!select?.key) {
            this.path = '*';
            return this.path;
        }

        let tempKey = select.key.toString();
        this.node = this.findNodeByKey(tempKey, this.files); // تغییر این خط

        if (!this.node) {
            this.notifierService.showError({
                detail: 'گره انتخاب شده یافت نشد!',
                life: 3000,
            });
            return '*';
        }

        let key = this.node.key;

        while (key.lastIndexOf('/') !== -1) {
            this.path = '/' + this.node.label + this.path;
            const lastIndex = key.lastIndexOf('/');
            key = key.substring(0, lastIndex);

            this.node = this.findNodeByKey(key, this.files); // تغییر این خط
            if (!this.node) {
                this.notifierService.showError({
                    detail: 'فرمت فایل XML وارد شده با سامانه هماهنگ نمی‌باشد!',
                    life: 3000,
                });
                return '*';
            }

            key = this.node.key;
        }

        this.node = this.findNodeByKey('0', this.files); // تغییر این خط
        if (this.node) {
            this.path = '/' + this.node.label + this.path;
        } else {
            this.notifierService.showError({
                detail: 'گره ریشه یافت نشد!',
                life: 3000,
            });
            return '*';
        }

        return this.path;
    }

    findNodeByKey(key: string, nodes: TreeNode[]): TreeNode | null {
        for (const node of nodes) {
            if (node.key === key) return node;
            if (node.children) {
                const found = this.findNodeByKey(key, node.children);
                if (found) return found;
            }
        }
        return null;
    }

    registerNode() {
        if (this.validationNode()) {
            this.mediatorChangeObject.nodeName = this.selectedFileTree2.label;
            this.mediatorChangeObject.keyNode = this.keyNode;
            this.mediatorChangeObject.valueNode = this.valueNode;
            this.mediatorChangeObject.changeTypeId = 1;
            this.mediatorChangeObject.status = 1;
            this.mediatorChangeObject.id += 1;
            this.mediatorChangeObject.schemaName = this.getPath(
                this.selectedFileTree2
            );
            this.itemsListShow = [
                ...this.itemsListShow,
                {
                    name:
                        'add node → ' +
                        this.mediatorChangeObject.keyNode +
                        ':' +
                        this.mediatorChangeObject.valueNode +
                        ' → ' +
                        this.getPath(this.selectedFileTree2),
                },
            ];
            this.itemsList.push(this.mediatorChangeObject);
            let pathSelectTree2 = this.getPath(this.selectedFileTree2);
            console.log('this.objSelected', this.objSelected);
            let lastWordSelected;
            pathSelectTree2 = pathSelectTree2.slice(1);
            pathSelectTree2 = pathSelectTree2.replace(/\//g, '.');
            pathSelectTree2 =
                String.prototype.toUpperCase.call(pathSelectTree2);
            console.log('newPathSelect', pathSelectTree2);
            if (pathSelectTree2.includes('.')) {
                for (let i = pathSelectTree2.length - 1; i >= 0; i--) {
                    const currentChar = pathSelectTree2[i];
                    if (currentChar === '.') {
                        lastWordSelected = pathSelectTree2.substring(i + 1);
                        break;
                    }
                }
                console.log(lastWordSelected, 'lastWordSelected');
            }

            this.finalPath = '';
            let give = this.getCorrectPath2(this.objs, this.path, this.objs);

            let tempStr: any;
            this.newPathSelect;
            tempStr = JSON.stringify(eval('this.objs.' + give));
            //this.copyObjSelected=tempStr
            // this.objSelected = this.objSelected.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');

            console.log(JSON.stringify(tempStr));
            const regex = /,\s*}\s*]/g;
            //  let updatedJsonString = this.objSelected.replace(regex, '}\n]');
            /* let updatedJsonString = this.objSelected.replace(/}\s*,\s*$/, '}\n',match => {
                 if (match.endsWith('}')) {
                     return match.replace(/,(\s*})/, '$1');
                 }
                 return match;});*/
            let updatedJsonString;
            tempStr != undefined
                ? (updatedJsonString = tempStr.replace(/,(\s*})/g, '$1'))
                : null;
            console.log('updatedJsonString', updatedJsonString);
            tempStr = JSON.parse(updatedJsonString);
            if (Array.isArray(tempStr)) {
                for (let i = 0; i < tempStr.length; i++) {
                    tempStr[i][this.mediatorChangeObject.keyNode] =
                        this.mediatorChangeObject.valueNode;
                }
            } else if (typeof tempStr == 'object') {
                tempStr[this.mediatorChangeObject.keyNode] =
                    this.mediatorChangeObject.valueNode;
            }
            console.log(JSON.stringify(tempStr), 'JSON.stringify(tempStr)');
            this.objSelected = JSON.stringify(tempStr);
            this.objSelected = this.prettyCode(this.objSelected);
            this.flagAddAndDeletedNode = false;
            this.mediatorChangeObject = {
                id: null,
                nodeName: '',
                keyNode: '',
                valueNode: '',
                changeTypeId: null,
                schemaName: null,
                status: null,
            };
            this.valueNode = '';
            this.keyNode = '';
            this.path = '';
        }
    }

    deleteNode(selectedFileTree2) {
        console.log('selectedFileTree2', selectedFileTree2);
        if (selectedFileTree2.leaf) {
            if (this.deleteValidation()) {
                this.mediatorChangeObject.nodeName =
                    this.selectedFileTree2.label;
                if (this.keyNode != '' && this.keyNode != null) {
                    this.mediatorChangeObject.keyNode = this.keyNode;
                } else {
                    this.mediatorChangeObject.keyNode =
                        this.selectedFileTree2.label;
                }
                this.mediatorChangeObject.valueNode = null;
                this.mediatorChangeObject.changeTypeId = 2;
                this.mediatorChangeObject.schemaName = this.getPath(
                    this.selectedFileTree2
                );
                this.mediatorChangeObject.id += 1;
                this.mediatorChangeObject.status = 1;
                this.itemsListShow = [
                    ...this.itemsListShow,
                    {
                        name:
                            'del node →  ' +
                            this.mediatorChangeObject.nodeName +
                            '  →  ' +
                            this.getPath(this.selectedFileTree2),
                    },
                ];
                this.itemsList.push(this.mediatorChangeObject);
                this.mediatorChangeObject = {
                    id: null,
                    nodeName: '',
                    keyNode: '',
                    valueNode: '',
                    changeTypeId: null,
                    schemaName: null,
                    status: null,
                };
                let pathSelectTree2 = this.getPath(this.selectedFileTree2);
                console.log('this.objSelected', this.objSelected);
                let lastWordSelected;
                pathSelectTree2 = pathSelectTree2.slice(1);
                pathSelectTree2 = pathSelectTree2.replace(/\//g, '.');
                pathSelectTree2 =
                    String.prototype.toUpperCase.call(pathSelectTree2);
                console.log('newPathSelect', pathSelectTree2);
                if (pathSelectTree2.includes('.')) {
                    for (let i = pathSelectTree2.length - 1; i >= 0; i--) {
                        const currentChar = pathSelectTree2[i];
                        if (currentChar === '.') {
                            lastWordSelected = pathSelectTree2.substring(i + 1);
                            break;
                        }
                    }
                    console.log(lastWordSelected, 'lastWordSelected');
                }
                let modifiedJsonString;
                const regex = new RegExp(
                    `("${lastWordSelected}")\\s*:\\s*".*?",?\\s*`,
                    'g'
                );
                modifiedJsonString = this.objSelected.replace(regex, '');
                /*        let temp;
                        console.log(modifiedJsonString, 'befor');
                        debugger
                        //   modifiedJsonString = modifiedJsonString.replace(/,\s*}/g, '}');
                        temp = JSON.parse(modifiedJsonString);
                        var filteredArray = temp.filter(function (obj) {
                            return JSON.stringify(obj) !== '{}';
                        });
                        modifiedJsonString = JSON.stringify(filteredArray);
                        modifiedJsonString = this.prettyCode(modifiedJsonString)
                        debugger
                        console.log(modifiedJsonString);
                        // var filteredString = JSON.stringify(filteredArray)
                        /!* if ('[\n' +
                             '  {\n' +
                             '    },\n' +
                             '  {\n' +
                             '    },\n' +
                             '  {\n' +
                             '    }\n' +
                             ']' == modifiedJsonString)
                             modifiedJsonString = ''*!/
                        debugger
                        console.log(modifiedJsonString, 'after');*/
                this.objSelected = modifiedJsonString;
            }
        } else {
            this.notifierService.showError({
                detail: 'امکان حذف این نود وجود ندارد!',
                life: 3000,
            });
        }
    }

    checkProperty(obj: any): boolean {
        for (let item in obj) {
            /* if (item == selected) {

                 this.give = this.newPathSelect;

                 if ((JSON.stringify(eval("obj." + this.give))) != undefined) {
                     this.resultSliceObject = (JSON.stringify(eval("obj." + this.give)))
                     this.objSelected = this.prettyCode(this.resultSliceObject)
                     this.objSelected ? this.withJson = "247px" : this.withJson = "20px"
                 } else {
                     this.getSlice(obj[item], this.newPathSelect, orgObjs)
                 }
             }*/
            if (typeof obj[item] == 'object') {
                const propOwn = Object.getOwnPropertyNames(obj[item]);
                console.log(propOwn.length);
                if (propOwn.length == 1) {
                    return false;
                }
                this.checkProperty(obj[item]);
            } else if (Array.isArray(obj[item])) {
                this.checkProperty(obj[item]);
            } else {
                return true;
            }
        }
        return true;
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }
    /*  parseTree(test) {
        var data =
                test,
            tree = function (data, root) {
            debugger
                var t = {};
                data.forEach(({ parents, ...o }) => {
                    debugger
                    Object.assign(t[o._id] = t[o._id] || {}, o);
                    if (!parents.length) {
                        debugger
                        t[root] = t[root] || {};
                        t[root].children = t[root].children || [];
                        t[root].children.push(t[o._id]);
                        return;
                    }
                    parents.forEach(p => {
                        debugger
                        Object.assign(t[p._id] = t[p._id] || {}, p);
                        t[p._id].children = t[p._id].children || [];
                        t[p._id].children.push(t[o._id]);
                    });
                });
                return t[root].children;
            }(data);

        console.log(tree);


    };*/
    ngOnInit() {
        /*  this.parseTree([{
            code: 42,
            items: [{
                id: 1,
                name: 'foo'
            }, {
                id: 2,
                name: 'bar'
            }]
        }])*/
        this.scrollTop();
        this.outerPanel = document.querySelector('.outer-panel');
        this.innerTextarea = document.querySelector('.inner-textarea');
        this.detailsBreadObject = this.chooseBread('mediatorXml');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );

        if (this.inputListMedia != undefined) {
            this.accessBase = this.inputListMedia.accessBase;
            this.moduleBase = this.inputListMedia.moduleBase;
            this.clientBase = this.inputListMedia.clientBase;
            this.partyTitle = this.inputListMedia.partyTitle;
            this.clientName = this.inputListMedia.clientName;
            this.moduleTitle = this.inputListMedia.moduleTitle;
            this.detModuleTitle = this.inputListMedia.moduleTitle;
            this.apiiTitle = this.inputListMedia.apiTitle;
            this.detApiTitle = this.inputListMedia.apiTitle;
            this.apiId = this.inputListMedia.apiId;
            this.apiName = this.inputListMedia.apiName;
            this.detApiName = this.inputListMedia.apiName;

            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyTitle) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            this.showListFlag = true;
        }
    }

    adjustPanelHeight() {
        let tempSize = this.innerTextarea.getBoundingClientRect().height + 10;
        this.outerPanel.style.height = tempSize + 'px';
    }

    showAddValidation(): boolean {
        this.tempPath = this.getPath(this.selectedFileTree2);
        for (let i = 0; i < this.itemsList.length; i++) {
            if (
                this.itemsList[i].schemaName == this.tempPath &&
                this.itemsList[i].changeTypeId == 2
            ) {
                this.notifierService.showError({
                    detail: 'امکان افزودن نود برای نود حذف شده وجود ندارد!',
                    life: 3000,
                });
                return false;
            }
        }
        return true;
    }

    deleteValidation(): boolean {
        this.tempPath = this.getPath(this.selectedFileTree2);
        //   console.log('this.tempPath', this.tempPath)
        if (this.itemsList.length != 0) {
            for (let i = 0; i < this.itemsList.length; i++) {
                if (
                    this.itemsList[i].schemaName == this.tempPath &&
                    this.itemsList[i].changeTypeId == 2
                ) {
                    this.notifierService.showError({
                        detail: 'این نود قبلا به لیست تغییرات افزوده شده است!',
                        life: 3000,
                    });
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }

    showAddKey() {
        if (!this.selectedFileTree2.leaf) {
            if (this.showAddValidation()) {
                this.flagAddAndDeletedNode = true;
                this.tempPath = this.getPath(this.selectedFileTree2);
            }
        } else {
            this.notifierService.showError({
                detail: 'امکان افزودن به این نود وجود ندارد!',
                life: 3000,
            });
        }
    }

    onNodeSelect(e) {
        this.selectedTree = null;
        this.pathSelect = null;
        this.itemsListShow = [];
        this.itemsList = [];
        this.selectedTree = [...[this.selectedFile]];
        this.pathSelect = this.getPath(this.selectedFile);
        if (this.selectedFile.leaf) {
            this.notifierService.showError({
                detail: 'امکان انتخاب این نود وجود ندارد!',
                life: 3000,
            });
            this.selectedTree = null;
            this.pathSelect = null;
            this.objSelected = null;
            this.objSelected
                ? (this.withJson = '247px')
                : (this.withJson = '20px');
        } else {
            this.xmlToJson(this.xmlString, this.pathSelect, 0);
            this.objSelected
                ? (this.withJson = '247px')
                : (this.withJson = '20px');
            this.acceptDisable = false;
        }
    }

    uploadFile2(fileList: any): void {
        this.files = [];
        this.selectedTree = null;
        this.pathSelect = null;
        this.itemsListShow = [];
        this.itemsList = [];
        this.xmlString = '';
        this.objSelected = '';
        this.objSelected ? (this.withJson = '247px') : (this.withJson = '20px');
        let file: any;
        file = fileList.currentFiles[0];
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.xmlString = fileReader.result;
            this.test(fileReader.result);
        };
        fileReader.readAsText(file);
    }

    getConvertXmlToTreeNode() {}

    convertStringToTreeNodes(treeNodesString: string): TreeNode[] {
        return <TreeNode[]>JSON.parse(treeNodesString);
    }

    convertStringToObject(treeNodesString: string): object {
        return JSON.parse(treeNodesString);
    }

    test(conetnt: any) {
        let result: any;
        try {
            let counter: number = 0;
            let count = 30;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .mediatorTestConvert(conetnt)
                .subscribe(
                    (m) => {
                        this._primengProgressBarService.hide();
                        let files = <TreeNode[]>m.data;
                        //  console.log(files, 'files1')
                        if (files == null) {
                        } else {
                            this.files = [
                                {
                                    label: 'Root',
                                    children: files,
                                },
                            ];
                            //  console.log(files, 'files')
                        }
                        this.items = [
                            {
                                label: 'افزودن نود به خروجی',
                                icon: 'pi pi-plus',
                                command: (event) => this.showAddKey(),
                            },
                            {
                                label: 'حذف نود از خروجی',
                                icon: 'pi pi-trash',
                                command: (event) =>
                                    this.deleteNode(this.selectedFileTree2),
                            },
                        ];
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                        //  console.log(' reason.text', error.error.text)
                        result = error.error.text;
                        // console.log('error::::::', error)
                        if (result == '') {
                            return null;
                        } else {
                            while (counter < count) {
                                counter++;
                                try {
                                    let treeNode: TreeNode[];
                                    let tempObject = null;
                                    treeNode =
                                        this.convertStringToTreeNodes(result);
                                    tempObject =
                                        this.convertStringToObject(result);
                                    //   console.log("counter", counter)
                                    //   console.log("success convert", result)
                                    if (tempObject != null) {
                                        this._primengProgressBarService.show();
                                        this.messagesApiFacadeService
                                            .mediatorDownloadeConvertedFile(
                                                result
                                            )
                                            .subscribe(
                                                (v) => {
                                                    this._primengProgressBarService.hide();
                                                    let files = <TreeNode[]>(
                                                        v.data
                                                    );
                                                    //   console.log(files, 'files1')
                                                    if (files == null) {
                                                    } else {
                                                        this.files = [
                                                            {
                                                                label: 'Root',
                                                                children: files,
                                                            },
                                                        ];
                                                        //    console.log(files, 'files')
                                                    }
                                                    this.items = [
                                                        {
                                                            label: 'افزودن نود به خروجی',
                                                            icon: 'pi pi-plus',
                                                            command: (event) =>
                                                                this.showAddKey(),
                                                        },
                                                        {
                                                            label: 'حذف نود از خروجی',
                                                            icon: 'pi pi-trash',
                                                            command: (event) =>
                                                                this.deleteNode(
                                                                    this
                                                                        .selectedFileTree2
                                                                ),
                                                        },
                                                    ];
                                                },
                                                (error) => {
                                                    this._primengProgressBarService.hide();
                                                }
                                            );
                                    }
                                } catch (error) {
                                    //  console.log("error", error)
                                    result = result.substring(
                                        0,
                                        result.lastIndexOf(']}')
                                    );
                                    if (counter >= 30) {
                                        this.notifierService.showError({
                                            detail: 'محتوا فایل وارد شده استاندارد نمی باشد!',
                                        });
                                    }
                                }
                            }
                            return null;
                        }
                    }
                );
        } catch (error) {
            this.notifierService.showError({
                detail: 'فرمت فایل XML وارد شده با سامانه هماهنگ نمی باشد !',
                life: 3000,
            });
        }
        /* this.nodeService.getConvertXmlToTreeNode2(conetnt).then(files => {
             console.log(files, 'files1')
             if (files == null) {
             } else {
                 this.files = [{
                     label: 'Root',
                     children: files
                 }];
                 console.log(files, 'files')
             }
             this.items = [
                 {label: 'افزودن نود به خروجی', icon: 'pi pi-plus', command: (event) => this.showAddKey()},
                 {
                     label: 'حذف نود از خروجی',
                     icon: 'pi pi-trash',
                     command: (event) => this.deleteNode(this.selectedFileTree2)
                 }
             ];
         })
             .catch((error) => {
             this.notifierService.showError({detail: "فرمت فایل XML وارد شده با سامانه هماهنگ نمی باشد !", life: 3000})

         });*/
    }

    myUploader(event: any, fileUploaderRef: any): void {
        this.btnUploadFlag = false;
        fileUploaderRef.clear();
        fileUploaderRef.uploadedFileCount = 0;
    }

    confirmExit() {
        this.orgPath = this.getPath(this.selectedFile);
        this.appDate = '';
        this.rdate = '';
        this.btnNextFlag = false;
        this.isApproval = 1;
        const m = moment();
        const d = new Date();
        m.locale('fa');
        m.format('YY-MM-DD'); // it would be in jalali system
        let date;
        date = m.format('YYYYMMDDHHmmss');
        this.appDate = date + d.getMilliseconds();
        this.rdate = date + d.getMilliseconds();
        this.appDate = date;
        this.rdate = date;
        //console.log('date', date)
        this.notifierService.showSuccess({
            detail: 'تایید اولیه json انجام شد!',
            life: 3000,
        });
    }

    showSecond() {
        this.SecondFlag = false;
    }

    clearList() {
        this.itemsListShow = [];
        this.itemsList = [];
        // console.log(this.copyObjSelected, '******')
        this.objSelected = this.copyObjSelected;
    }

    showBack() {
        this.SecondFlag = true;
    }

    validation(): boolean {
        if (!this.title) {
            this.notifierService.showError({
                detail: 'لطفا عنوان مدیاتور را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.selectedApi && !this.showListFlag) {
            this.notifierService.showError({
                detail: 'لطفا Api  مدیاتور را انتخاب نمائید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationNode(): boolean {
        if (!this.keyNode) {
            this.notifierService.showError({
                detail: 'لطفا کلید را وارد نمائید!',
                life: 3000,
            });
            return false;
        }
        this.tempPath = this.getPath(this.selectedFileTree2);
        if (this.itemsList.length != 0) {
            for (let i = 0; i < this.itemsList.length; i++) {
                if (
                    this.itemsList[i].schemaName == this.tempPath &&
                    this.itemsList[i].keyNode == this.keyNode
                ) {
                    this.notifierService.showError({
                        detail: 'این نود قبلا به لیست تغییرات افزوده شده است!',
                        life: 3000,
                    });
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }

    registerFinal() {
        let registerObj = {
            apiId: null,
            isApproval: null,
            schemaName: '',
            title: '',
            appDate: '',
            rdate: '',
            status: null,
        };
        let registerChangeObj = {
            mediatorId: null,
            changeTypeId: null,
            nodeName: '',
            nodeValue: '',
            schemaName: '',
            status: 1,
        };
        //console.log(this.selectedFile.key)
        if (this.validation()) {
            registerObj.apiId = this.apiId;
            if (this.selectedFile.label == 'Root') {
                registerObj.schemaName = '*';
            } else {
                registerObj.schemaName = this.orgPath;
            }
            registerObj.title = this.title;
            registerObj.isApproval = this.isApproval;
            registerObj.appDate = this.appDate;
            registerObj.rdate = this.rdate;
            registerObj.status = 1;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .mediatorRegister(registerObj)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.mediatorId = a.mediatorId;
                        this.itemsList.forEach((item) => {
                            registerChangeObj.mediatorId = this.mediatorId;
                            registerChangeObj.nodeName = item.keyNode;
                            registerChangeObj.nodeValue = item.valueNode;
                            registerChangeObj.changeTypeId = item.changeTypeId;
                            registerChangeObj.schemaName = item.schemaName;
                            registerChangeObj.status = 1;
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .mediatorchangeRegister(registerChangeObj)
                                .subscribe(
                                    (b) => {
                                        this._primengProgressBarService.hide();
                                        this.itemsListShow = [];
                                        this.itemsList = [];
                                        this.keyNode = '';
                                        this.changeTypeId = '';
                                        this.valueNode = '';
                                        this.mediatorId = '';
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    }
                                );
                        });
                        if (this.itemsList.length == 0) {
                            this.isApproval = null;
                            this.appDate = '';
                            this.rdate = '';
                        }
                        this.SecondFlag = true;
                        this.title = '';
                        this.detModuleTitle = '';
                        this.detApiTitle = '';
                        this.detApiName = '';
                        this.files = [];
                        this.selectedTree = [];
                        this.objSelected = '';
                        this.withJson = '20px';
                        this.pathSelect = '';
                        this.objSelected
                            ? (this.withJson = '247px')
                            : (this.withJson = '20px');
                        this.notifierService.showSuccess({
                            detail: 'ثبت نهایی مدیاتور باموفقیت انجام شد!',
                            life: 3000,
                        });
                        if (this.showListFlag) {
                            this.close.emit('close');
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    showSelectApi() {
        this.searchApi();
        this.flagDialog = true;
    }

    selectApi(api) {
        let listApiMediator;
        let countLicense = 0;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.mediatorFindByApiId(api.apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                listApiMediator = a;
                if (Array.isArray(a)) {
                    listApiMediator = a;
                } else {
                    listApiMediator.push(a);
                }
                listApiMediator.forEach((item) => {
                    if (item.status || item.status == 1) {
                        countLicense += 1;
                    }
                });
                if (countLicense == 0) {
                    this.selectedApi = true;
                    this.detModuleTitle = api.moduleTitle;
                    this.detApiTitle = api.apiTitle;
                    this.detApiName = api.apiName;
                    this.apiId = api.apiId;
                    this.detModuleTitle.length > 22
                        ? (this.widthModuleTitle = 100)
                        : (this.widthModuleTitle = 50);
                    this.detApiTitle.length > 22
                        ? (this.widthApiTitle = 100)
                        : (this.widthApiTitle = 50);
                    this.detApiName.length > 22
                        ? (this.widthApiName = 100)
                        : (this.widthApiName = 50);
                    this.flagDialog = false;
                } else {
                    this.notifierService.showError({
                        detail: 'یک مدیاتور فعال برای این api وجود دارد!',
                        life: 3000,
                    });
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    onKeydown(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchApi();
        }
    }

    searchApi() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .apisearch(this.apiName, this.apiTitle, this.moduleTitle, '2')
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.apiList = a;
                    } else {
                        this.apiList.push(a);
                    }
                    for (let k = 0; k < this.apiList.length; k++) {
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            row: k + 1,
                        });
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    clearApi() {
        this.apiName = '';
        this.apiTitle = '';
        this.moduleTitle = '';
        this.searchApi();
    }

    deleteIDs(obj: any) {
        for (let item in obj) {
            if (item === 'ID') {
                delete obj[item];
            } else if (typeof obj[item] === 'object') {
                this.deleteIDs(obj[item]);
            }
        }
    }

    xmlToJson(xmlString2: any, pathSelect: string, typeOption: number) {
        /*const parser: xml2js.Parser = new xml2js.Parser({
            mergeAttrs: true,
            explicitRoot: true,
            explicitArray: false,
            strict: false,
            trim: true,
            ignoreAttrs: true,
        });
        parser.parseString(xmlString2, (err: any, result: any) => {
            this.objs = result;
            this.orgObjs = result;
            // console.log('result', result)
            this.deleteIDs(this.objs);
            this.sliceObject(this.objs, pathSelect, this.orgObjs, typeOption);
            //  console.log('this.objSelected', this.objSelected)
        });*/
    }

    getSlice(obj: any, selected: any, orgObjs: any) {
        if (
            this.pathSelect != undefined &&
            this.pathSelect != '' &&
            this.pathSelect != '*'
        ) {
            this.newPathSelect = this.pathSelect.slice(1);
            this.newPathSelect = this.newPathSelect.replace(/\//g, '.');
            this.newPathSelect = String.prototype.toUpperCase.call(
                this.newPathSelect
            );
            // console.log('newPathSelect', this.newPathSelect)
        }

        //console.log(this.give, 'this.give')

        if (JSON.stringify(eval('obj.' + this.give)) != undefined) {
            this.resultSliceObject = JSON.stringify(eval('obj.' + this.give));
            this.objSelected = this.prettyCode(this.resultSliceObject);
            this.objSelected
                ? (this.withJson = '247px')
                : (this.withJson = '20px');
        }
        for (let item in obj) {
            if (item == selected) {
                this.give = this.newPathSelect;

                if (JSON.stringify(eval('obj.' + this.give)) != undefined) {
                    this.resultSliceObject = JSON.stringify(
                        eval('obj.' + this.give)
                    );
                    this.objSelected = this.prettyCode(this.resultSliceObject);
                    this.objSelected
                        ? (this.withJson = '247px')
                        : (this.withJson = '20px');
                } else {
                    this.getSlice(obj[item], this.newPathSelect, orgObjs);
                }
            } else if (Array.isArray(obj[item])) {
                this.newPathSelect = this.newPathSelect.replace(/\.[^.]+$/, '');
                for (let i = 0; i < obj[item].length; i++) {
                    for (let childItem in obj[item][i]) {
                        if (childItem == selected) {
                            this.newPathSelect = this.newPathSelect.replace(
                                /\[\d+\]/,
                                ''
                            );
                            this.newPathSelect =
                                this.newPathSelect + '[' + i + ']';
                            //  console.log('zzzzzthis.newPathSelect', this.newPathSelect)

                            this.copiedPathSelect = '';
                        }
                    }
                }
                this.newPathSelect = this.newPathSelect + '.' + selected;
                this.give = this.newPathSelect;
                //  console.log(orgObjs, 'orgObjs.')
                // console.log(JSON.stringify(orgObjs.this.give),'orgObjs.')

                if (JSON.stringify(eval('orgObjs.' + this.give)) != undefined) {
                    this.resultSliceObject = JSON.stringify(
                        eval('orgObjs.' + this.give)
                    );
                    this.objSelected = this.prettyCode(this.resultSliceObject);
                    this.objSelected
                        ? (this.withJson = '247px')
                        : (this.withJson = '20px');
                    // console.log('zzzzzobjSelected', this.objSelected)
                }
            } else if (typeof obj[item] == 'object') {
                this.getSlice(obj[item], selected, orgObjs);
            }
        }
    }

    NavigationOnTheRightPath(obj: any, rightPath: string, selected) {}

    getCorrectPath2(
        obj: any,
        selected: any,
        orgObjs: any,
        newRemainingPath?: string
    ): string {
        // console.log(selected, 'selected')
        if (
            selected != undefined &&
            selected != '' &&
            selected != '*' &&
            newRemainingPath == undefined
        ) {
            this.newPathSelect = this.getPath(this.selectedFile);
            this.newPathSelect = this.newPathSelect.slice(1);
            this.newPathSelect = this.newPathSelect.replace(/\//g, '.');
            this.newPathSelect = String.prototype.toUpperCase.call(
                this.newPathSelect
            );
            // console.log('newPathSelect', this.newPathSelect)

            if (this.newPathSelect.includes('.')) {
                for (let i = this.newPathSelect.length - 1; i >= 0; i--) {
                    const currentChar = this.newPathSelect[i];
                    if (currentChar === '.') {
                        this.selectedNode = this.newPathSelect.substring(i + 1);

                        break;
                    }
                }
            }
        }
        if (newRemainingPath == undefined) {
            newRemainingPath = this.newPathSelect;
        }

        if (newRemainingPath.includes('.')) {
            for (let i = newRemainingPath.length - 1; i >= 0; i--) {
                const currentChar = newRemainingPath[i];
                if (currentChar === '.') {
                    this.lastWord = newRemainingPath.substring(i + 1);
                    break;
                }
            }
        }

        let firstWord;
        for (let i = 0; i < newRemainingPath.length; i++) {
            const currentChar = newRemainingPath[i];
            if (currentChar === '.') {
                firstWord = newRemainingPath.substring(0, i);
                newRemainingPath = newRemainingPath.substring(i + 1);
                i = -1;
                break;
            }
        }

        for (let item in obj) {
            if (item == firstWord) {
                // console.log(item, item)
                if (Array.isArray(obj[item])) {
                    let lastIndex = 0;
                    let nextWorld;

                    this.finalPath = this.finalPath + firstWord;
                    for (let i = 0; i < newRemainingPath.length; i++) {
                        const currentChar = newRemainingPath[i];
                        if (currentChar === '.') {
                            nextWorld = newRemainingPath.substring(0, i);
                            i = -1;
                            break;
                        }
                    }
                    for (let i = 0; i < obj[item].length; i++) {
                        for (let childItem in obj[item][i]) {
                            nextWorld == undefined
                                ? (nextWorld = this.lastWord)
                                : true;
                            if (childItem == nextWorld) {
                                if (i != 0) {
                                    this.finalPath = this.finalPath
                                        .replace(/\[\d+\]\.$/, '')
                                        .replace(/\.+$/, '');
                                }

                                this.finalPath =
                                    this.finalPath + '[' + i + '].';
                                // console.log('zzzzzthis.newPathSelect', this.finalPath)
                            }
                            lastIndex = i;
                        }
                    }

                    let firstTemp = this.getCorrectPath2(
                        obj[item][lastIndex],
                        firstWord,
                        orgObjs,
                        newRemainingPath
                    );
                    // console.log('firstTemp', firstTemp)
                    return firstTemp;
                } else if (typeof obj[item] == 'object') {
                    this.finalPath = this.finalPath + firstWord + '.';
                    let secTemp = this.getCorrectPath2(
                        obj[item],
                        firstWord,
                        orgObjs,
                        newRemainingPath
                    );
                    // console.log('secTemp', secTemp)
                    return secTemp;
                }
            }
        }

        this.finalPath = this.finalPath + this.lastWord;
        let threeTemp = this.finalPath;
        // console.log('threeTemp', threeTemp)

        return threeTemp;
    }

    getCorrectPath(
        obj: any,
        selected: any,
        orgObjs: any,
        newRemainingPath?: string
    ): string {
        if (
            this.pathSelect != undefined &&
            this.pathSelect != '' &&
            this.pathSelect != '*'
        ) {
            this.newPathSelect = this.pathSelect.slice(1);
            this.newPathSelect = this.newPathSelect.replace(/\//g, '.');
            this.newPathSelect = String.prototype.toUpperCase.call(
                this.newPathSelect
            );
            // console.log('newPathSelect', this.newPathSelect)
        }
        if (newRemainingPath == undefined) {
            newRemainingPath = this.newPathSelect;
        }

        if (newRemainingPath.includes('.')) {
            for (let i = newRemainingPath.length - 1; i >= 0; i--) {
                const currentChar = newRemainingPath[i];
                if (currentChar === '.') {
                    this.lastWord = newRemainingPath.substring(i + 1);
                    break;
                }
            }
        }

        let firstWord;
        for (let i = 0; i < newRemainingPath.length; i++) {
            const currentChar = newRemainingPath[i];
            if (currentChar === '.') {
                firstWord = newRemainingPath.substring(0, i);
                newRemainingPath = newRemainingPath.substring(i + 1);
                i = -1;
                break;
            }
        }

        for (let item in obj) {
            if (item == firstWord) {
                //  console.log(item, item)
                if (Array.isArray(obj[item])) {
                    let lastIndex = 0;
                    let nextWorld;

                    this.finalPath = this.finalPath + firstWord;
                    for (let i = 0; i < newRemainingPath.length; i++) {
                        const currentChar = newRemainingPath[i];
                        if (currentChar === '.') {
                            nextWorld = newRemainingPath.substring(0, i);
                            i = -1;
                            break;
                        }
                    }
                    for (let i = 0; i < obj[item].length; i++) {
                        for (let childItem in obj[item][i]) {
                            nextWorld == undefined
                                ? (nextWorld = this.lastWord)
                                : true;
                            if (childItem == nextWorld) {
                                if (i != 0) {
                                    this.finalPath = this.finalPath
                                        .replace(/\[\d+\]\.$/, '')
                                        .replace(/\.+$/, '');
                                }

                                this.finalPath =
                                    this.finalPath + '[' + i + '].';
                                //  console.log('zzzzzthis.newPathSelect', this.finalPath)
                            }
                            lastIndex = i;
                        }
                    }

                    let firstTemp = this.getCorrectPath(
                        obj[item][lastIndex],
                        firstWord,
                        orgObjs,
                        newRemainingPath
                    );
                    // console.log('firstTemp', firstTemp)
                    return firstTemp;
                } else if (typeof obj[item] == 'object') {
                    this.finalPath = this.finalPath + firstWord + '.';
                    let secTemp = this.getCorrectPath(
                        obj[item],
                        firstWord,
                        orgObjs,
                        newRemainingPath
                    );
                    // console.log('secTemp', secTemp)
                    return secTemp;
                }
            }
        }

        this.finalPath = this.finalPath + this.lastWord;
        let threeTemp = this.finalPath;
        // console.log('threeTemp', threeTemp)

        return threeTemp;
    }

    sliceObject(
        inputObj: any,
        pathSelect: string | undefined,
        orgObjs: any,
        typeOption: number
    ) {
        switch (typeOption) {
            case 0:
                let resultSliceObject = '';
                let newPathSelect = '';
                if (
                    pathSelect != undefined &&
                    pathSelect != '' &&
                    pathSelect != '*'
                ) {
                    newPathSelect = this.pathSelect.slice(1);
                    newPathSelect = newPathSelect.replace(/\//g, '.');
                    newPathSelect =
                        String.prototype.toUpperCase.call(newPathSelect);
                    //  console.log('newPathSelect', newPathSelect)
                    let pathSelectLast;
                    let give = newPathSelect;
                    let obj = inputObj;

                    try {
                        if (JSON.stringify(eval('obj.' + give)) != undefined) {
                            this.objSelected = this.prettyCode(
                                JSON.stringify(eval('obj.' + give))
                            );
                            this.copyObjSelected = this.objSelected;
                            this.objSelected
                                ? (this.withJson = '247px')
                                : (this.withJson = '20px');
                        } else {
                            this.finalPath = '';
                            pathSelectLast = newPathSelect.substring(
                                newPathSelect.lastIndexOf('.') + 1
                            );
                            this.getSlice(this.objs, pathSelectLast, orgObjs);
                        }
                    } catch (e) {
                        this.finalPath = '';
                        pathSelectLast = newPathSelect.substring(
                            newPathSelect.lastIndexOf('.') + 1
                        );

                        give = this.getCorrectPath(
                            this.objs,
                            pathSelectLast,
                            orgObjs
                        );
                        resultSliceObject = JSON.stringify(eval('obj.' + give));
                        this.objSelected = this.prettyCode(resultSliceObject);
                        this.copyObjSelected = this.objSelected;
                        this.selectedObject = this.objSelected;
                        this.objSelected
                            ? (this.withJson = '247px')
                            : (this.withJson = '20px');
                    }
                } else {
                    this.objSelected = this.prettyCode(
                        JSON.stringify(inputObj)
                    );
                    this.objSelected = this.prettyCode(
                        JSON.stringify(inputObj)
                    );
                    this.copyObjSelected = this.objSelected;
                    this.selectedObject = this.objSelected;
                    this.objSelected
                        ? (this.withJson = '247px')
                        : (this.withJson = '20px');
                }
                break;
            case 1:
                break;
            case 2:
                let resultSliceObject3 = '';
                let newPathSelect3 = '';
                newPathSelect3 = pathSelect.slice(1);
                const str = '/company/departments/department';
                const words = newPathSelect3
                    .split('/')
                    .map((word) => word.trim());
                words.forEach((x) => {
                    //  console.log(JSON.stringify(eval(x)))
                });
                //  console.log(words, 'words');

                /* if (pathSelect != undefined && pathSelect != "" && pathSelect != "*") {
                     newPathSelect3 = this.pathSelect.slice(1);
                     newPathSelect3 = newPathSelect3.replace(/\//g, '.');
                     newPathSelect3 = String.prototype.toUpperCase.call(newPathSelect3)
                     console.log('newPathSelect3', newPathSelect3)
                 } else {
                     this.objSelected = this.prettyCode(JSON.stringify(inputObj))
                 }*/
                let pathSelectLast3;
                let give3 = newPathSelect3;
                let obj3 = inputObj;
                resultSliceObject3 = JSON.stringify(eval('obj3.' + give3));
                if (resultSliceObject3 != undefined) {
                    if (typeof obj3 == 'object') {
                        obj3.forEach((obj) => {
                            // Delete the "EMPLOYEE" key from the object
                            //    delete (eval("obj3." + give3));
                        });
                        eval('obj3.' + give3);
                    }
                    this.objSelected = this.prettyCode(resultSliceObject3);
                    this.copyObjSelected = this.objSelected;
                    this.objSelected
                        ? (this.withJson = '247px')
                        : (this.withJson = '20px');
                } else {
                    pathSelectLast3 = newPathSelect3.substring(
                        newPathSelect3.lastIndexOf('.') + 1
                    );
                    this.getSlice(this.objs, pathSelectLast3, orgObjs);
                }
                break;
            default:
                let resultSliceObject2 = '';
                let newPathSelect2 = '';
                if (
                    pathSelect != undefined &&
                    pathSelect != '' &&
                    pathSelect != '*'
                ) {
                    newPathSelect2 = this.pathSelect.slice(1);
                    newPathSelect2 = newPathSelect2.replace(/\//g, '.');
                    newPathSelect2 =
                        String.prototype.toUpperCase.call(newPathSelect2);
                    //  console.log('newPathSelect2', newPathSelect2)
                } else {
                    this.objSelected = this.prettyCode(
                        JSON.stringify(inputObj)
                    );
                    this.copyObjSelected = this.objSelected;
                    this.objSelected
                        ? (this.withJson = '247px')
                        : (this.withJson = '20px');
                }
                let pathSelectLast2;
                let give2 = newPathSelect2;
                let obj2 = inputObj;
                resultSliceObject2 = JSON.stringify(eval('obj2.' + give2));
                if (resultSliceObject2 != undefined) {
                    this.objSelected = this.prettyCode(resultSliceObject2);
                    this.copyObjSelected = this.objSelected;
                    this.objSelected
                        ? (this.withJson = '247px')
                        : (this.withJson = '20px');
                } else {
                    pathSelectLast2 = newPathSelect2.substring(
                        newPathSelect2.lastIndexOf('.') + 1
                    );
                    this.getSlice(this.objs, pathSelectLast2, orgObjs);
                }
        }
    }

    prettyCode(myObject: any) {
        let formattedJsonString = myObject;
        let formattedJsonString2 = '';
        let indentationLevel2 = 0;
        for (let i = 0; i < formattedJsonString.length; i++) {
            let char = formattedJsonString[i];
            formattedJsonString2 += char;
            if (char === ',') {
                formattedJsonString2 +=
                    '\n' + ' '.repeat(indentationLevel2 * 2);
            }
            if (char === '{' || char === '[') {
                indentationLevel2++;
                formattedJsonString2 +=
                    '\n' + ' '.repeat(indentationLevel2 * 2);
            }
            if (
                formattedJsonString[i + 1] == '}' ||
                formattedJsonString[i + 1] == ']'
            ) {
                indentationLevel2--;
                formattedJsonString2 = formattedJsonString2.trimRight();
                formattedJsonString2 +=
                    '\n' + ' '.repeat(indentationLevel2 * 2);
            }
        }
        //  console.log(formattedJsonString2, 'formattedJsonString2')
        return formattedJsonString2;
    }

}

