import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiGatewayService {

    private approvalStageObjHub = new BehaviorSubject({
        hubId: null,
        dbEngineId: null,
        driverName: null,
        ip: null,
        portNumber: null,
        objectName: null,
        commandTypeId: null,
        userName: null,
        password: null,
        messageId4X: null,
        messageId5X: null,
        dbNam: null,
        isTestConnection: null,
        isTestQuery: null,
        autoCommit: null,
        canCommit: null,
        isFinal: null,
        dataHubStaticElementDomains: [],
        messageId2X: null});
    currentApprovalStageObjHub = this.approvalStageObjHub.asObservable();

    private approvalStageApiIdSeq = new BehaviorSubject(0);
    currentApprovalStageApiIdSeq = this.approvalStageApiIdSeq.asObservable();

    private approvalStageCode = new BehaviorSubject("");
    currentApprovalStageCode = this.approvalStageCode.asObservable();

    private approvalStageEndpointIdHeader = new BehaviorSubject("");
    currentApprovalStageEndpointIdHeader = this.approvalStageEndpointIdHeader.asObservable();

    private approvalStageEndpoint = new BehaviorSubject("");
    currentApprovalStageEndpoint = this.approvalStageEndpoint.asObservable();

    private approvalStageParty = new BehaviorSubject("");
    currentApprovalStageParty = this.approvalStageParty.asObservable();

    private approvalStageModuleId = new BehaviorSubject("");
    currentApprovalStageModuleId = this.approvalStageModuleId.asObservable();

    private approvalStageModuleObject = new BehaviorSubject({});
    currentApprovalStageModuleObject = this.approvalStageModuleObject.asObservable();

    private approvalStageApiId = new BehaviorSubject({});
    currentApprovalStageApiId = this.approvalStageApiId.asObservable();

    private approvalStageApiName = new BehaviorSubject({});
    currentApprovalStageApiName = this.approvalStageApiName.asObservable();

    private approvalStageRuleId = new BehaviorSubject({});
    currentApprovalStageRuleId = this.approvalStageRuleId.asObservable();

    private approvalStageClientId = new BehaviorSubject('');
    currentApprovalStageClientId = this.approvalStageClientId.asObservable();

    private approvalStageApiUrl = new BehaviorSubject({});
    currentApprovalStageApiUrl = this.approvalStageApiUrl.asObservable();


    private approvalStageClientObject= new BehaviorSubject({
        clientId: null,name:"",apikey:"",mobileNo:"",baseClientFlag:null
    });
    currentApprovalStageClientObject = this.approvalStageClientObject.asObservable();

    private approvalStageRequestlogid= new BehaviorSubject("");
    currentApprovalStageRequestlogid = this.approvalStageRequestlogid.asObservable();

   /* private approvalStageDetailsBreadObject= new BehaviorSubject([]);
    currentApprovalStageDetailsBreadObject = this.approvalStageDetailsBreadObject.asObservable();
*/
    private approvalStageDetailsBreadObject = new BehaviorSubject<any[]>([]);
    currentApprovalStageDetailsBreadObject = this.approvalStageDetailsBreadObject.asObservable();


    private approvalStagemoduleBase= new BehaviorSubject([]);
    currentApprovalStagemoduleBase = this.approvalStagemoduleBase.asObservable();

    private approvalStageFoad= new BehaviorSubject([]);
    currentApprovalStageFoad = this.approvalStageFoad.asObservable();

    constructor() {

    }
    updateApprovalObjHub(hub: any) {
        this.approvalStageObjHub.next(hub)
    }
    updateApprovalEndpointIdHeader(code: string) {
        this.approvalStageEndpointIdHeader.next(code)
    }
    updateApprovalApiIdSeq(apiId: number) {
        this.approvalStageApiIdSeq.next(apiId)
    }
    updateApprovalEndpointIdClient(code: string) {
        this.approvalStageCode.next(code)
    }
    updateApprovalEndpoint(temp: any) {
        this.approvalStageEndpoint.next(temp)
    }
    updateApprovalParty(temp: any) {
        this.approvalStageParty.next(temp)
    }
    updateApprovalModuleId(temp: any) {
        this.approvalStageModuleId.next(temp)
    }
    updateApprovalModuleObject(temp: any) {
        this.approvalStageModuleObject.next(temp)
    }
    updateApprovalmoduleBase(temp: any) {
        this.approvalStagemoduleBase.next(temp)
    }
    updateApprovalApiId(temp: any) {
        this.approvalStageApiId.next(temp)
    }
    updateApprovalApiName(temp: any) {
        this.approvalStageApiName.next(temp)
    }
    updateApprovalApiUrl(temp: any) {
        this.approvalStageApiUrl.next(temp)
    }
    updateApprovalRuleId(temp: any) {
        this.approvalStageRuleId.next(temp)
    }
    updateApprovalClientId(temp: any) {
        this.approvalStageClientId.next(temp)
    }
    updateApprovalClientObject(temp: any) {
        this.approvalStageClientObject.next(temp)
    }
    updateApprovalRequestlogid(temp: any) {
        this.approvalStageRequestlogid.next(temp)
    }
    /*updateApprovalDetailsBreadObject(temp: any) {
        this.approvalStageDetailsBreadObject.next(temp)
    }*/
    updateApprovalDetailsBreadObject(data: any): void {
      /*  const breadcrumbObjects = data.map((item: any) => new BreadcrumbService(item));  // تبدیل داده‌ها به شی Breadcrumb
        this.approvalStageDetailsBreadObject.next(breadcrumbObjects);  // ارسال داده‌ها به اشتراک
   */ if (data && Array.isArray(data)) {
            this.approvalStageDetailsBreadObject.next(data);
        } else {
            console.error('Received data is not valid:', data);
        }
    }
    updateApprovalFoad(temp: any) {
        this.approvalStageFoad.next(temp)
    }
}
