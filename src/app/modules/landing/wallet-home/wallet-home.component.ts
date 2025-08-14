import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Button, ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Rating } from 'primeng/rating';
import { Select } from 'primeng/select';
import {
    TableModule,
    TableRowCollapseEvent,
    TableRowExpandEvent,
} from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Toast } from 'primeng/toast';
import { SaffronInputComponent } from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_01-saffron-input/saffron-input.component';
import { SaffronButtonTypes } from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_03-saffron-button/models/saffron-button-types';
import { SaffronButtonComponent } from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_03-saffron-button/saffron-button.component';
import { SaffronInputLabelComponent } from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_05-saffron-input-label/saffron-input-label.component';
import { SaffronSelectModel } from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_09-saffron-select/models/saffron-select.model';
import { SaffronSelectComponent } from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_09-saffron-select/saffron-select.component';
import {
    SaffronMessageModel,
    SaffronSuccessMessage,
} from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_22-saffron-message/models/saffrom-message-types';
import { SaffronMessageService } from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_22-saffron-message/services/saffron-message.service';
import { Ripple } from 'primeng/ripple';
import { MatIcon } from '@angular/material/icon';
import { FileUpload } from 'primeng/fileupload';
import { InputNumber } from 'primeng/inputnumber';
import { RadioButton } from 'primeng/radiobutton';
import { ProgressBar } from 'primeng/progressbar';
import { Calendar } from 'primeng/calendar';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'app-wallet-home',
    standalone: true,
    imports: [
        SaffronInputLabelComponent,
        SaffronInputComponent,
        SaffronSelectComponent,
        ReactiveFormsModule,
        SaffronButtonComponent,
        AutoComplete,
        Checkbox,
        FormsModule,
        MultiSelect,
        Toast,
        Button,
        ConfirmPopupModule,
        TableModule,
        Rating,
        Tag,
        CurrencyPipe,
        InputText,
        Select,
        ButtonDirective,
        Ripple,
        NgIf,
        MatIcon,
        FileUpload,
        InputNumber,
        RadioButton,
        ProgressBar,
        Calendar,
        Card,
        Dialog,
    ],
    providers: [ConfirmationService, MessageService],
    templateUrl: './wallet-home.component.html',
    styleUrl: './wallet-home.component.scss',
})
export class WalletHomeComponent {
    products!: any;
    products2!: any;

    expandedRows = {};

    walletTypes: SaffronSelectModel[] = [
        { value: '1', title: 'حقیقی' },
        { value: '2', title: 'حقوقی' },
    ];
    formGroup = this.fb.group({
        walletType: [null],
        walletNo: [null],
        walletAmount: [null],
    });
    successMessage: SaffronMessageModel = SaffronSuccessMessage;
    statuses: any;
    clonedProducts: { [s: string]: any } = {};

    constructor(
        private fb: FormBuilder,
        private messageService: SaffronMessageService,
        private confirmationService: ConfirmationService,
        private messageService2: MessageService
    ) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
        setTimeout(() => {
            this.products = [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'bamboo-watch.jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                    orders: [
                        {
                            id: '1000-0',
                            productCode: 'f230fh0g3',
                            date: '2020-09-13',
                            amount: 65,
                            quantity: 1,
                            customer: 'David James',
                            status: 'PENDING',
                        },
                    ],
                },
            ];
            this.products2 = [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'bamboo-watch.jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5,
                },
            ];
            this.statuses = [
                { label: 'In Stock', value: 'INSTOCK' },
                { label: 'Low Stock', value: 'LOWSTOCK' },
                { label: 'Out of Stock', value: 'OUTOFSTOCK' },
            ];
        }, 1000);
    }

    protected readonly onsubmit = onsubmit;

    onSubmit(e: any) {
        console.log(e);
        console.log(this.formGroup.value);
        this.messageService.showMessage(this.successMessage);
    }

    protected readonly SaffronButtonTypes = SaffronButtonTypes;
    filteredCountries: any[];
    checked: any;
    value1: any;
    cities: any;
    message: any;
    quantity: any;
    selectedOption: any;
    dateValue: any;
    display: boolean | WritableSignal<boolean>;

    filterCountry($event: AutoCompleteCompleteEvent) {}

    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Save',
            },
            accept: () => {
                this.messageService2.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                    life: 3000,
                });
            },
            reject: () => {
                this.messageService2.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000,
                });
            },
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },
            accept: () => {
                this.messageService2.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'Record deleted',
                    life: 3000,
                });
            },
            reject: () => {
                this.messageService2.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000,
                });
            },
        });
    }

    expandAll() {
        this.expandedRows = this.products.reduce(
            (acc, p) => (acc[p.id] = true) && acc,
            {}
        );
    }

    collapseAll() {
        this.expandedRows = {};
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'PENDING':
                return 'warn';
            case 'DELIVERED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
        }
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService2.add({
            severity: 'info',
            summary: 'Product Expanded',
            detail: event.data.name,
            life: 3000,
        });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService2.add({
            severity: 'success',
            summary: 'Product Collapsed',
            detail: event.data.name,
            life: 3000,
        });
    }

    onRowEditInit(product: any) {
        this.clonedProducts[product.id as string] = { ...product };
    }

    onRowEditSave(product: any) {
        if (product.price > 0) {
            delete this.clonedProducts[product.id as string];
            this.messageService2.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is updated',
            });
        } else {
            this.messageService2.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Invalid Price',
            });
        }
    }

    onRowEditCancel(product: any, index: number) {
        this.products[index] = this.clonedProducts[product.id as string];
        delete this.clonedProducts[product.id as string];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
