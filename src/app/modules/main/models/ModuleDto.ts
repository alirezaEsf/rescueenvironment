export class ModuleDto{
    partyId?: number;
    moduleId?:number;
    moduleTitle?: string;
    moduleType?: number;
    moduleGroup?: number;
    moduleAuthMode?: number;
    esbMode?: number;
    status?: number;
    description?: string;
    retryCount?: number;
    delayRetryTime?: number;
    limitForPeriod?: number;
    limitRefreshPeriod?: number;
}