import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesApiFacadeService } from '../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../@fuse/services/loading';
import { ApiGatewayService } from '../services/api-gateway.service';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { UIChart } from 'primeng/chart';
import { ButtonDirective } from 'primeng/button';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MatTooltip } from '@angular/material/tooltip';
import { LogReportsComponent } from '../components/log-reports/log-reports.component';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Chart } from 'chart.js';
import { FsProgressSpinnerComponent } from '../../shared/components/fs-progress-spinner/fs-progress-spinner.component';
import { Tooltip } from 'primeng/tooltip';
import { ProgressSpinner } from 'primeng/progressspinner';
import { MoreChar19Pipe } from '../../shared/pipes/moreChar19.pipe';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    providers: [DialogService, DynamicDialogRef],
    imports: [
        BreadcrumbsComponent,
        NgIf,
        UIChart,
        ButtonDirective,
        TableModule,
        Menu,
        Ripple,
        LogReportsComponent,
        TranslocoPipe,
        FsProgressSpinnerComponent,
        Tooltip,

        /*
        NgStyle,
        Panel,
        MatTooltip,
        Toast,
        NgClass,
        ProgressSpinner,*/
        TranslocoDirective,
        MoreChar19Pipe,
        Toast,
    ],
})
export class HomeComponent implements OnInit {
    @ViewChild(Chart) chart: Chart;
    /*  @HostListener('window:resize', ['$event'])
      onResize(event) {
              // هنگام تغییر اندازه صفحه، چارت را مجدداً رندر می‌کنیم
              this.chart?.render();
      }*/
    a = true;
    valueOfDelayDaily = [];
    valueOfLastFailTable = [];
    valueOfDailyTable = [];
    detailsBreadObject: any = null;
    itemsDaily: any[] = [];
    itemsSuccess: any[] = [];
    itemsFail: any[] = [];
    apiListDaily: any[] = [];
    apiListSuccess: any[] = [];
    apiListfailed: any[] = [];
    apiListDailyCount: any[] = [];
    apiListSuccessCount: any[] = [];
    apiListfailedCount: any[] = [];
    tempLog;
    serviceLog;
    dataLog;
    chartDataLineDaily;
    chartBarDelayDaily;
    chartBarDelayYesterday;
    chatDataPieDaily;
    chatDataBarfailed;
    chatDataBarSuccess;
    barOptionDaily;
    PieOptionDaily;
    barOptionfailed;
    barOptionSuccess;
    sumSuccess;
    entries;
    emptyDailyFlag: boolean = false;
    emptyDelayDailyFlag: boolean = false;
    emptyDelayYesterdayFlag: boolean = false;
    chartFlag: boolean = true;
    DailyCallFlag: boolean = false;
    successCallFlag: boolean = false;
    dailyCallSpinnerFlag: boolean = false;
    delayDailySpinnerFlag: boolean = false;
    showBackButtonFlag: boolean = false;
    delayDailyYesterdaySpinnerFlag: boolean = false;
    failCallFlag: boolean = false;
    logDto;
    chartDelayYesterdayOptions;
    chartBarDelayDailyOptions;
    day = 7;

    constructor(private route: ActivatedRoute,
                private messagesApiFacadeService: MessagesApiFacadeService,
                private _primengProgressBarService: FuseLoadingService,
                private transloco: TranslocoService,
                private apiGatewayService: ApiGatewayService,
                private dialogService: DialogService,
                private messageService: MessageService,
                private ref: DynamicDialogRef) {
    }

    calChartWeekly(condition) {
        if (condition == 1) {
            this.day = this.day + 1;
        } else {
            this.day = this.day - 1;
        }
        this.delayDailySpinnerFlag = true;
        this.messagesApiFacadeService.compareToDay(this.day).subscribe(response => {
            debugger

            if (response.length == 0) {
                debugger
                this.delayDailySpinnerFlag = false;
                this.emptyDelayDailyFlag = true;
            } else {
                this.entries = response;
                this.delayDailySpinnerFlag = this.entries.length === 0;
                const barThicknessty = 20; /*= response.length > 10 ? 10 : 20;*/
                const maxBarThicknessty = 10;/*= response.length > 10 ? 5 : 10;*/
                this.chartBarDelayDaily = {
                    labels: response.map(entry => `${entry.title} `),  // لیبل‌ها
                    datasets: [
                        {
                            type: 'line',
                            label: 'میانگین پاسخ دهی امروز',
                            fill: false,
                            borderWidth: 2,
                            data: response.map(entry => entry.valueOne),
                            borderColor: '#b96fc9',
                            backgroundColor: '#cb8dd9',
                            barThickness: barThicknessty,
                            maxBarThickness: maxBarThicknessty,
                        },
                        {
                            type: 'line',
                            label: 'میانگین پاسخ دهی' + this.day + ' روز گذشته',
                            fill: false,
                            borderWidth: 2,
                            data: response.map(entry => entry.valueTwo),
                            borderColor: '#c9ba6f',
                            backgroundColor: '#d9c18d',
                            barThickness: barThicknessty,
                            maxBarThickness: maxBarThicknessty,
                        },
                    ],
                };
                console.log('Mapped valueTwo:', response.map(entry => entry.valueTwo)); // بررسی مقدار valueTwo
                this.chartBarDelayDailyOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            categoryPercentage: 0.2,  // فضای بین ستون‌ها
                            barPercentage: 0.2,  // عرض ستون‌ها
                        },
                    },
                };
                this.delayDailySpinnerFlag = false;
            }

        }, error => {
            this.delayDailySpinnerFlag = false;
        });
    }

    showLog(log) {
        this.dataLog = {

            apiTtile: '',
            apiid: null,
            chartFlag: null,
            clientid: null,
            failedcount: null,
            moduleId: null,
            moduleTitle: '',
            partyId: null,
            partyTtile: '',
            successcount: null,
            homeBase: null,
        };
        this.dataLog = log;
        this.dataLog.homeBase = true;


        this.serviceLog = true;

    }

    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    onClose(event: any) {
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('dayCalls');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);

        this.showBackButtonFlag = true;
        if (event == 'close') {
            this.serviceLog = false;
        }
        this.valueOfLastFailTable = [];
        this.valueOfDelayDaily = [];
        this.valueOfDailyTable = [];
        /*   this.messagesApiFacadeService.lastSucess().subscribe(response => {
               this.valueOfLastSuccessTable = response
           })*/

        /* this.messagesApiFacadeService.lastFail().subscribe(response => {
             this.valueOfLastFailTable = response
         })*/
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getstatistictoday().subscribe(response => {
            this._primengProgressBarService.hide();
            this.valueOfDailyTable = response;
        }, error => {
            this._primengProgressBarService.hide();
        });
    }

    setRecordDaily(log) {
        this.tempLog = log;
    }

    setRecordSuccess(log) {
        this.tempLog = log;
    }

    setRecordFail(log) {
        this.tempLog = log;
    }

    BeforeButton() {
        this.detailsBreadObject = this.chooseBread('home');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.showBackButtonFlag = false;
        this.DailyCallFlag = false;
        this.successCallFlag = false;
        this.failCallFlag = false;
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'home':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.home'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: true,
                    },

                    { label_index1: null, label_Detail_index1: null },
                    { label_index2: null, label_Detail_index2: null }, {
                        label_index3: null,
                        label_Detail_index3: null,
                    },
                    { label_index4: null, label_Detail_index4: null }, {
                        label_index5: null,
                        label_Detail_index5: null,
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'dayCalls':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.home'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dayCalls'),
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/chart.png',
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

    /* handleChartClick(event: any) {
         debugger


         /!*  if (this.chart && (this.chart as any).chart) {
               const chartInstance = (this.chart as any).chart;
               const canvas = chartInstance.canvas;
               const rect = canvas.getBoundingClientRect();

               // محاسبه مختصات نسبی نسبت به canvas
               const eventX = event.clientX - rect.left;
               const eventY = event.clientY - rect.top;

               // ایجاد شیء event سفارشی با مختصات درست
               const adjustedEvent = Object.assign({}, event, {
                   offsetX: eventX,
                   offsetY: eventY
               });

               const elements = chartInstance.getElementsAtEventForMode(
                   adjustedEvent,
                   'nearest',
                   { intersect: true },
                   true
               );

               console.log('Found elements:', elements);

               if (elements.length > 0) {
                   debugger
                   const datasetIndex = elements[0].datasetIndex;
                   const dataIndex = elements[0].index;
                   const dataPoint = chartInstance.data.datasets[datasetIndex].data[dataIndex];
                   console.log('داده نقطه کلیک شده:', dataPoint);
                   alert(`مقدار این نقطه: ${dataPoint}`);
               } else {
                   console.warn('هیچ نقطه‌ای در نزدیکی کلیک یافت نشد.');
               }
           } else {
               console.error('Chart instance is not available.');
           }*!/
         if (this.chart && (this.chart as any).chart) {
             const chartInstance = (this.chart as any).chart;
             const elements = chartInstance.getElementsAtEventForMode(event, 'nearest', {intersect: true}, true);
             if (elements.length > 0) {
                 const dataIndex = elements[0].index;
                 const selectedEntry = this.entries[dataIndex];
                 console.log('داده نقطه کلیک شده:', selectedEntry);
                 debugger
                 debugger
                 debugger
                 debugger
                 this.multipleapiDto = {
                     logCount: selectedEntry.logCount,
                     apiId: selectedEntry.apiId,
                     diffSecond: selectedEntry.diffSecond,
                     diffAvg: selectedEntry.diffAvg,
                     typeChart: this.typeChart,
                     delay:selectedEntry.diffSecond,
                     logDate : selectedEntry.logDate.replace(/-/g, ""),
                     //  logDate: '14031128',
                     name: selectedEntry.name,
                     title: selectedEntry.title,
                 };
                 debugger
                 debugger
                 debugger
                 debugger
                 this.multipleApiFlag = true
             } else {
                 console.warn('هیچ نقطه‌ای در نزدیکی کلیک یافت نشد.');
             }
         } else {
             console.error('Chart instance is not available.');
         }

     }*/
    handleChartClick(e) {
        this.detailsBreadObject = this.chooseBread('dayCalls');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);

        this.showBackButtonFlag = true;
        this.DailyCallFlag = true;

    }

    showSuccessCall() {
        this.successCallFlag = true;
    }

    showFailedCall() {
        this.failCallFlag = true;
    }

    ngOnInit() {
        debugger
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        this.detailsBreadObject = this.chooseBread('home');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.valueOfLastFailTable = [];
        this.valueOfDelayDaily = [];
        this.valueOfDailyTable = [];
        this.dailyCallSpinnerFlag = false;
        this.delayDailySpinnerFlag = false;
        this.emptyDelayYesterdayFlag = false;


        this.dailyCallSpinnerFlag = true;
        this.messagesApiFacadeService.getstatistictoday().subscribe(response => {
            this.valueOfDailyTable = response;
            let sumSuccessDaily = 0;
            let sumfailedDaily = 0;

            this.emptyDailyFlag = this.valueOfDailyTable.length === 0;
            for (let i = 0; (i < this.valueOfDailyTable.length); i++) {
                this.apiListDaily.push(this.valueOfDailyTable[i].apiTtile);
                let temp = this.valueOfDailyTable[i].successcount + this.valueOfDailyTable[i].failedcount;
                sumfailedDaily = sumfailedDaily + this.valueOfDailyTable[i].failedcount;
                sumSuccessDaily = sumSuccessDaily + this.valueOfDailyTable[i].successcount;
                this.apiListDailyCount[i] = temp;
            }
            this.chatDataPieDaily = {
                labels: ['موفق', 'ناموفق'],
                datasets: [
                    {
                        data: [sumSuccessDaily, sumfailedDaily],
                        fill: false,
                        borderColor: [

                            '#367c5c',
                            '#c5593d',
                        ],
                        backgroundColor: [

                            '#A8C799',
                            '#c56f73',
                        ],
                        hoverBackgroundColor: [
                            '#81C784',
                            '#c54535',
                        ],
                        tension: .4,
                    },

                ],
            };
            this.PieOptionDaily = {
                plugins: {
                    legend: {
                        labels: {
                            color: '#ebedef',
                        },
                    },
                },
            };
            this.chartDataLineDaily = {
                labels: this.apiListDaily,
                datasets: [
                    // {
                    //      label: null,
                    //     data: this.apiListDailyCount,
                    //     fill: false,
                    //     borderColor: '#53347c',
                    //     backgroundColor: '#773ec5',
                    //     tension: .4
                    // },
                    {
                        label: 'موفق',
                        data: this.apiListDailyCount,
                        fill: false,
                        borderColor: '#53347c',
                        backgroundColor: '#773ec5',
                        tension: .4,
                    },

                ],
            };
            this.barOptionDaily = {
                plugins: {
                    legend: {
                        display: false,
                    },

                },
                scales: {

                    x: {
                        offset: true,
                        ticks: {
                            color: '#495057',
                            minRotation: 90,
                            maxRotation: 90,
                        },
                        grid: {
                            color: '#ebedef',
                        },
                        font: {
                            size: 5,
                        },
                    },
                    y: {
                        ticks: {
                            color: '#495057',
                        },
                        grid: {
                            color: '#ebedef',
                        },
                    },
                },
            };
            this.dailyCallSpinnerFlag = false;
        }, error => {
            this.dailyCallSpinnerFlag = false;
        });
        this.delayDailySpinnerFlag = true;
        this.messagesApiFacadeService.compareToDay(this.day).subscribe(response => {
            debugger

            if (response.length == 0) {
                debugger
                this.delayDailySpinnerFlag = false;
                this.emptyDelayDailyFlag = true;
            } else {
                this.entries = response;
                this.delayDailySpinnerFlag = this.entries.length === 0;
                const barThicknessty = 20; /*= response.length > 10 ? 10 : 20;*/
                const maxBarThicknessty = 10;/*= response.length > 10 ? 5 : 10;*/
                this.chartBarDelayDaily = {
                    labels: response.map(entry => `${entry.title} `),  // لیبل‌ها
                    datasets: [
                        {
                            type: 'line',
                            label: this.transloco.translate('home.chart.averageResponseToday'),
                            fill: false,
                            borderWidth: 2,
                            data: response.map(entry => entry.valueOne),
                            borderColor: '#b96fc9',
                            backgroundColor: '#cb8dd9',
                            barThickness: barThicknessty,
                            maxBarThickness: maxBarThicknessty,
                        },
                        {
                            type: 'line',
                            label: this.transloco.translate('home.chart.averageResponseToday') + this.day + this.transloco.translate('home.chart.Yesterday'),
                            fill: false,
                            borderWidth: 2,
                            data: response.map(entry => entry.valueTwo),
                            borderColor: '#c9ba6f',
                            backgroundColor: '#d9c18d',
                            barThickness: barThicknessty,
                            maxBarThickness: maxBarThicknessty,
                        },
                    ],
                };
                console.log('Mapped valueTwo:', response.map(entry => entry.valueTwo));
                this.chartBarDelayDailyOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            categoryPercentage: 0.2,  // فضای بین ستون‌ها
                            barPercentage: 0.2,  // عرض ستون‌ها
                        },
                    },
                };
                this.delayDailySpinnerFlag = false;
            }

        }, error => {
            this.delayDailySpinnerFlag = false;
        });


        this.delayDailyYesterdaySpinnerFlag = true;


        this.itemsDaily = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.servicePerformanceReport'),
                        icon: '',
                        command: (): void => {
                            this.showLog(this.tempLog);
                        },
                    },
                ],
            },
            {
                label: '____________________________',
                items: [{
                    label: this.transloco.translate('contextMenu.cancel'),

                }],
            },
        ];
        this.itemsFail = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.servicePerformanceReport'),
                        icon: '',
                        command: (): void => {
                            this.showLog(this.tempLog);
                        },
                    },
                ],
            },
            {
                label: '____________________________',
                items: [{
                    label: this.transloco.translate('contextMenu.cancel'),

                }],
            },
        ];
        this.itemsSuccess = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.servicePerformanceReport'),
                        icon: '',
                        command: (): void => {
                            this.showLog(this.tempLog);
                        },
                    },
                ],
            },
            {
                label: '____________________________',
                items: [{
                    label: this.transloco.translate('contextMenu.cancel'),

                }],
            },
        ];
    }
}
