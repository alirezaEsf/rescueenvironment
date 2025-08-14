import {FeeDetailDomainsDto} from "./feeDetailDomainsDto";
import {FeeHeaderDto} from "./feeHeaderDto";

export class HeaderWageDto
{
    title: string;
    feeTypeId: number;
    fromDate: number;
    toDate: number;
    feeDetailDomains:FeeDetailDomainsDto[];
}