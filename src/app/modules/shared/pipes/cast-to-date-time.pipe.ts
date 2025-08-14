import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'castToDateTime'
})
export class CastToDateTimePipe implements PipeTransform {

    transform(args: string): any {

        if (args)
            if (args.toString().length === 8) {

                let tempArgs8: string;
                tempArgs8 = args.toString().slice(0, 4) + '/' + args.toString().slice(4, 6) + '/' + args.toString().slice(6, 8);
                return tempArgs8;
            } else if(args.toString().length >= 15 && args.toString().length <= 17) {
                let tempArgs17: string;
                tempArgs17 = args.toString().slice(0, 4) + '/' + args.toString().slice(4, 6) + '/' + args.toString().slice(6, 8)
                    +" "+args.toString().slice(8, 10)+":"+args.toString().slice(10, 12)+":"+args.toString().slice(12, 14)+":"+
                    args.toString().slice(14, args.length);
                return tempArgs17;
            }else {
                return null;
            }
    }

}
