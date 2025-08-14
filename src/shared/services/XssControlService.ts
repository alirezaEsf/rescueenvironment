import { Injectable } from '@angular/core';

export const whiteListChars: string = '\\p{L}\\p{N}\\s_\\-:,،=@?\\*.\\]\\[\u200C'
export const whiteListDateChars: string = '\\p{L}\\p{N}\\s_\\-:,،=@?\\*.\\]\\[\u200C\\/'

@Injectable()
export class XssControlService{
    constructor() {

    }

    public getXssWhiteListCharacters(): string {
        return whiteListChars;
    }

    public getXssDateWhiteListCharacters(): string {
        return whiteListDateChars;
    }

}
