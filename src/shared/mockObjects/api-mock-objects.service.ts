import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApiMockObjectsService {

    static getallproduct =
        [
            {
                'productId': 1100,
                'name': 'کیف پول شخصی سطح 1',
                'customerType': 1,
                'productType': 1,
                'minBalance': 0,
                'maxBalance': 2000000,
                'maxQuarterBalance': 10000000,
                'expireDuration': 1,
                'nameEn': 'PersonalLevel1',
                'description': 'کیف پول شخصی سطح 1',
                'status': 1,
                'authenticationStatus': 1,
                'currency': 'IRR',
            },
            {
                'productId': 1200,
                'name': 'کیف پول شخصی سطح 2',
                'customerType': 1,
                'productType': 1,
                'minBalance': 0,
                'maxBalance': 5000000,
                'maxQuarterBalance': 10000000000,
                'expireDuration': 1,
                'nameEn': 'PersonalLevel2',
                'description': 'کیف پول شخصی سطح 2',
                'status': 1,
                'authenticationStatus': 2,
                'currency': 'IRR',
            },
            {
                'productId': 1500,
                'name': 'کیف پول کارکنان سازمان توانیر',
                'customerType': 1,
                'productType': 1,
                'minBalance': 0,
                'maxBalance': 5000000,
                'maxQuarterBalance': 10000000000,
                'expireDuration': 1,
                'nameEn': 'WalletTavanir',
                'description': 'کیف پول کارکنان سازمان توانیر',
                'status': 1,
                'authenticationStatus': 1,
                'currency': 'IRR',
            },
            {
                'productId': 1400,
                'name': 'کیف پول مشتریان ',
                'customerType': 1,
                'productType': 1,
                'minBalance': 0,
                'maxBalance': 5000000,
                'maxQuarterBalance': 10000000000,
                'expireDuration': 1,
                'nameEn': 'WalletResalat',
                'description': 'کیف پول مشتریان ',
                'status': 1,
                'authenticationStatus': 1,
                'currency': 'IRR',
            },
            {
                'productId': 1600,
                'name': 'کیف پول کارکنان وزارت بهداشت',
                'customerType': 1,
                'productType': 1,
                'minBalance': 0,
                'maxBalance': 5000000,
                'maxQuarterBalance': 10000000000,
                'expireDuration': 1,
                'nameEn': 'WalletHealth',
                'description': 'کیف پول کارکنان وزارت بهداشت',
                'status': 1,
                'authenticationStatus': 1,
                'currency': 'IRR',
            },
            {
                'productId': 1700,
                'name': 'کیف پول کارکنان وزارت صنعت',
                'customerType': 1,
                'productType': 1,
                'minBalance': 0,
                'maxBalance': 5000000,
                'maxQuarterBalance': 10000000000,
                'expireDuration': 1,
                'nameEn': 'WalletIndustry',
                'description': 'گیف پول کارکنان وزارت صنعت',
                'status': 1,
                'authenticationStatus': 1,
                'currency': 'IRR',
            },
            {
                'productId': 1300,
                'name': 'کیف پول تجاری',
                'customerType': 2,
                'productType': 1,
                'minBalance': 0,
                'maxBalance': 10000000000,
                'maxQuarterBalance': 10000000000,
                'expireDuration': 1,
                'nameEn': 'Commercial',
                'description': 'کیف تجاری',
                'status': 1,
                'authenticationStatus': 2,
                'currency': 'IRR',
            },
        ];

    static defaultApiResult =
        {
            'result': {
                'reason': null,
                'errorDesc': null,
                'errorCode': 'OK',
                'httpStatus': 'OK',
                'type': null,
                'errorParams': null,
            },
            'data': [],
        };


    constructor() {
    }

}
