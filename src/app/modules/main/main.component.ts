import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    ResolveEnd,
    Router,
    RouterOutlet,
} from '@angular/router';

import {NgClass, NgForOf, NgIf, ViewportScroller} from '@angular/common';

import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTab, MatTabGroup, MatTabLabel, MatTabsModule} from '@angular/material/tabs';
import { ButtonDirective } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { filter, pairwise } from 'rxjs/operators';
import { MessagesApiFacadeService } from './services/messages-api-facade.service';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import { CheckTabValidService } from './services/check-tab-valid.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports: [
        MatTabGroup,
        MatTab,
        NgForOf,
        MatTabLabel,
        MatIcon,
        ButtonDirective,
        NgClass,
        Menu,
        TranslocoPipe, MatTabsModule, MatIconModule, NgIf
    ],
    standalone: true,
})
export class MainComponent implements OnInit, AfterContentChecked {
    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
    tabs: Array<{ name: string; route: string }> = [
        { name: 'صفحه اصلی', route: '/main/home' },
    ];
    dynamicClasses = 'moreBtn';
    counter: number = 0;
    items = [];
    history;
    tabMessageFlag: boolean = true;
    tabRulesFlag: boolean = true;
    tabHomeFlag: boolean = true;
    tabPartyFlag: boolean = false;
    tabModuleBaseFlag: boolean = false;
    tabClientFlag: boolean = false;
    tabWageServicesFlag: boolean = false;
    tabAccessListFlag: boolean = false;
    tabMediatorsFlag: boolean = false;
    tabMediatorsXmlFlag: boolean = false;
    tabMediatorsJsonFlag: boolean = false;
    tabUsersFlag: boolean = false;
    tabRolesFlag: boolean = false;
    tabLogReportsFlag: boolean = false;
    tabCallServicesReportFlag: boolean = false;
    tabChartReportFlag: boolean = false;
    tabFactorFlag: boolean = false;
    tabCostsFlag: boolean = false;
    tabDataHubFlag: boolean = false;
    tabAlertsFlag: boolean = false;
    tabChangeRequested = false;
    tabResponseRateFlag: boolean = false;
    //   tabs: Tab[] = []; // آرایه‌ای از تب‌های باز
    selectedTabIndex: number = 0; // ایندکس تب فعال
    title: string = ''; // ایندکس تب فعال

    constructor(
        private route: ActivatedRoute,
        private viewContainerRef: ViewContainerRef,
        private notifierService: MessagesApiFacadeService,
        private viewportScroller: ViewportScroller,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
         private transloco :TranslocoService,
        private checkTabValidService: CheckTabValidService,
        public router: Router
    ) {
        console.log(router.events);
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                pairwise() // این عملیات باعث می‌شود رویداد قبلی و رویداد جدید را به عنوان آرایه به دست آورید
            )
            .subscribe(([previous, current]) => {
                console.log(
                    '*****************************************************'
                );
                const previousRoute = (previous as NavigationEnd).url;
                const currentRoute = (current as NavigationEnd).url;
                this.checkTabValidService.previousRoute = previousRoute;
            });

        router.events.forEach((event: any) => {
            if (
                event.urlAfterRedirects != undefined &&
                event.urlAfterRedirects != '/main/about'
            ) {
                this.checkTabValidService.currentUrl = event.urlAfterRedirects;
                if (event instanceof ResolveEnd) {
                    console.log('NavigationEnd');
                    this.handleNavigation(event.url);
                }
            }
        });
    }

    ngAfterContentChecked() {
        this.cdr.detectChanges();
    }

    handleRoute(route: any) {
        switch (route) {
            case '/main/home': {
                this.selectedTabIndex = 0;
            }
            case '/main/messages-management': {
                return 'پیام‌ ها';
            }
            case '/main/rules': {
                return 'قواعد';
            }
            case '/main/party': {
                return 'سازمان';
            }
            case '/main/moduleBase': {
                return 'ماژول';
            }
            case '/main/client': {
                return 'کلاینت';
            }
            case '/main/wage-services': {
                return 'کارمزد سرویس';
            }
            case '/main/access-list': {
                return 'لیست دسترسی';
            }
            case '/main/mediators': {
                return 'لیست مدیاتور ها';
            }
            case '/main/mediatorsXml': {
                return 'مدیاتور xml';
            }
            case '/main/mediatorsJson': {
                return 'مدیاتور json';
            }
            case '/main/users': {
                return 'کاربران';
            }
            case '/main/roles': {
                return 'نقش ها';
            }
            case '/main/log-reports': {
                return 'گزارش ریز کارکرد سرویس';
            }
            case '/main/call-services-report': {
                return 'گزارش فراخوانی تجمیعی سرویس ها';
            }
            case '/main/chart-report': {
                return 'گزارش نموداری';
            }
            case '/main/factor': {
                return 'فاکتور';
            }
            case '/main/costs': {
                return 'هزینه ها';
            }
            case '/main/data-hub': {
                return 'هاب داده';
            }
            case '/main/alerts': {
                return 'آلارم های سیستم';
            }
        }
    }

    handleNavigation(url: string) {
        console.log('first this.tabs', this.tabs);
        // در صورتی که تعداد تب‌ها کمتر از حد مجاز باشد
        this.checkTabValidService.limitedOpenTab = false;
        this.checkTabValidService.lengthTab = this.tabs.length;
        this.checkTabValidService.tabs = this.tabs;
        this.ngZone.run(() => {
            const index = this.tabs.findIndex((tab) => tab.route === url);
            if (index >= 0) {
                this.selectTab(index);
            } else {
                // اضافه کردن تب جدید اگر موجود نباشد
                this.addTab({ name: this.getTabName(url), route: url });
                this.selectTab(this.tabs.length - 1);
            }
            this.cdr.detectChanges(); // فقط در صورت لزوم
        });
    }

    getTabName(url) {
        switch (url) {
            case '/main/home': {
                return 'صفحه اصلی';
            }
            case '/main/messages-management': {
                return 'پیام‌ ها';
            }
            case '/main/rules': {
                return 'قواعد';
            }
            case '/main/party': {
                return 'سازمان';
            }
            case '/main/moduleBase': {
                return 'ماژول';
            }
            case '/main/client': {
                return 'کلاینت';
            }
            case '/main/wage-services': {
                return 'کارمزد سرویس';
            }
            case '/main/access-list': {
                return 'لیست دسترسی';
            }
            case '/main/mediators': {
                return 'لیست مدیاتور ها';
            }
            case '/main/mediatorsXml': {
                return 'مدیاتور xml';
            }
            case '/main/mediatorsJson': {
                return 'مدیاتور json';
            }
            case '/main/users': {
                return 'کاربران';
            }
            case '/main/roles': {
                return 'نقش ها';
            }
            case '/main/log-reports': {
                return 'گزارش ریز کارکرد سرویس';
            }
            case '/main/call-services-report': {
                return 'گزارش فراخوانی تجمیعی سرویس ها';
            }
            case '/main/chart-report': {
                return 'گزارش نموداری';
            }
            case '/main/factor': {
                return 'فاکتور';
            }
            case '/main/costs': {
                return 'هزینه ها';
            }
            case '/main/data-hub': {
                return 'هاب داده';
            }
            case '/main/alerts': {
                return 'آلارم های سیستم';
            }
            case '/main/bill-store': {
                return 'کارتابل صورتحساب';
            }
            case "/main/response-rate": {
                return "میزان پاسخ‌دهی"
            }
        }
    }

    ngAfterViewChecked() {
        if (this.tabChangeRequested) {
            this.cdr.detectChanges();
            this.tabChangeRequested = false;
        }
    }

    ngOnInit() {
        this.items = [
            {
                label: 'بستن همه',
                icon: 'pi pi-times',
                command: () => {
                    // this.router.navigate(['main/messages-management']);
                    this.tabs = null;
                    setTimeout(()=>{
                        this.tabs = this.checkTabValidService.closeAllTabs();
                        this.router.navigate(['main/home']);
                    })
                },
            },
        ];
        this.viewportScroller.scrollToAnchor('section');
    }

    selectTab(index: number) {
        this.selectedTabIndex = index;
        window.localStorage.setItem(
            'lastTabIndex',
            this.selectedTabIndex.toString()
        );
    }

    onTabChange(index: any) {
        this.selectedTabIndex = index;
        const selectedRoute = this.tabs[index].route;
        this.router.navigate([selectedRoute]);
        console.log('selectedRoute ', selectedRoute);
        this.tabChangeRequested = true; // تغییرات در چرخه بعدی اعمال می‌شوند
        this.cdr.detectChanges(); // بررسی تغییرات به‌صورت دستی
        this.router.navigate([selectedRoute]);
        const selectedTab = this.tabGroup._tabs.toArray()[index];
    }

    addTab(newTab: { name: string; route: string }) {
        // چک کردن اینکه تب تکراری نباشد

        if (!this.tabs.some((tab) => tab.route === newTab.route)) {
            this.tabs.push(newTab);
        }
        console.log('this.tabs', this.tabs);
    }

    removeTab(index: number) {
        if (index != 0 && this.selectedTabIndex != index) {
            this.tabs.splice(index, 1);
            this.cdr.detectChanges(); // بررسی تغییرات به‌صورت دستی
        } else if (index != 0 && this.selectedTabIndex == index) {
            this.tabs.splice(index, 1);
            // مسیری که باید روت آن باز شود
            const selectedRoute = this.tabs[index - 1].route;
            // اینجا می‌توانید از `Router` Angular برای هدایت به روت مربوطه استفاده کنید

            this.router.navigate([selectedRoute]);
            this.cdr.detectChanges(); // بررسی تغییرات به‌صورت دستی
        }
    }

    activateTab(url: any) {
        let time = 2000;
        // بررسی مسیر روت و انتخاب تب مربوطه
        switch (url) {
            case '/main/home':
                this.tabHomeFlag = true;
                this.selectedTabIndex = 0;
                this.title = 'صفحه اصلی';
                break;
            case '/main/messages-management':
                this.tabMessageFlag = true;
                this.selectedTabIndex = 1;
                this.title = 'پیام‌ ها';
                break;
            case '/main/rules':
                this.tabRulesFlag = true;
                this.selectedTabIndex = 2;
                this.title = 'قواعد';
                break;
            case '/main/data-hub':
                this.tabDataHubFlag = true;
                this.selectedTabIndex = 3;
                this.title = 'هاب داده';
                break;
            case '/main/party':
                this.tabPartyFlag = true;
                this.selectedTabIndex = 4;
                this.title = 'سازمان';
                break;
            case '/main/moduleBase':
                this.tabModuleBaseFlag = true;
                this.tabModuleBaseFlag = true;
                this.selectedTabIndex = 5;
                this.title = 'ماژول';
                break;
            case '/main/client':
                this.tabClientFlag = true;
                this.selectedTabIndex = 6;
                this.title = 'کلاینت';
                break;
            case '/main/wage-services':
                this.tabWageServicesFlag = true;
                this.selectedTabIndex = 7;
                this.title = 'کارمزد سرویس';
                break;
            case '/main/access-list':
                this.tabAccessListFlag = true;
                this.selectedTabIndex = 8;
                this.title = 'لیست دسترسی';
                break;
            case '/main/mediators':
                this.tabMediatorsFlag = true;
                this.selectedTabIndex = 9;
                this.title = 'لیست مدیاتور ها';
                break;
            case '/main/mediatorsXml':
                this.tabMediatorsXmlFlag = true;
                this.selectedTabIndex = 10;
                this.title = 'مدیاتور های xml';
                break;
            case '/main/mediatorsJson':
                this.tabMediatorsJsonFlag = true;
                this.selectedTabIndex = 11;
                this.title = 'مدیاتور های Json';
                break;
            case '/main/users':
                this.tabUsersFlag = true;
                this.selectedTabIndex = 12;
                this.title = 'کاربران';
                break;
            case '/main/roles':
                this.tabRolesFlag = true;
                this.selectedTabIndex = 13;
                this.title = 'نقش ها';
                break;
            case '/main/costs':
                this.tabCostsFlag = true;
                this.selectedTabIndex = 14;
                this.title = 'هزینه ها';
                break;
            case '/main/alerts':
                this.tabAlertsFlag = true;
                this.selectedTabIndex = 15;
                this.title = 'آلارم های سیستم';
                break;

            case '/main/log-reports':
                this.tabLogReportsFlag = true;
                this.selectedTabIndex = 16;
                this.title = 'گزارش ریز کارکرد سرویس';
                break;
            case '/main/call-services-report':
                this.tabCallServicesReportFlag = true;
                this.selectedTabIndex = 17;
                this.title = 'گزارش فراخوانی تجمیعی سرویس ها';
                break;
            case '/main/chart-report':
                this.tabChartReportFlag = true;
                this.selectedTabIndex = 18;
                this.title = 'گزارش نموداری';
                break;
            case '/main/factor':
                this.tabFactorFlag = true;
                this.selectedTabIndex = 19;
                this.title = 'فاکتور';
                break;
            case '/main/bill-store':
                this.tabFactorFlag = true;
                this.selectedTabIndex = 20;
                this.title = 'کارتابل صورتحساب';
                break;
            case '/main/response-rate':
                this.tabResponseRateFlag = true;
                this.selectedTabIndex = 21;
                this.title = 'میزان پاسخ‌دهی'
                break;
            default:
                this.selectedTabIndex = 0;
        }
    }
}

interface Tab {
    title: string;
    index: number;
    isOpen: boolean;
}
