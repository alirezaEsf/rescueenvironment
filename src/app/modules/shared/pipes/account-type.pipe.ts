import { Pipe, PipeTransform } from '@angular/core';
import {Constants} from '../constants/Constants';

@Pipe({
    standalone: true,
    name: 'accountType',
})
export class AccountTypePipe implements PipeTransform {
    transform(groupId: number): string {
        if (groupId) {
            switch (groupId) {
                case 1:
                    return Constants.accountTypes.get('cash');
                case 2:
                    return Constants.accountTypes.get('bonus');
                case 3:
                    return Constants.accountTypes.get('loan');
                case 4:
                    return Constants.accountTypes.get('trust');
                case 5:
                    return Constants.accountTypes.get('score');
                case 6:
                    return Constants.accountTypes.get('credit');
            }
        } else {
            return null;
        }
    }
}
