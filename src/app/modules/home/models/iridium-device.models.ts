export class UpdateDeviceStatusRequest {
    status: string;
    imeis: string[];
}

export class UpdateDeviceStatusResponse {
    results: DeviceActivationResult[];
}

export class DeviceActivationResult {
    imei: string;
    status: string| null;
    message: string;
    isSuccessful: boolean;
}

export class ActivateDeviceRequest {
    imei: string;
}

export enum AccountStatusEnum {
    ACTIVE,
    PENDING,
    SUSPENDED,
    DEACTIVE,
    ERROR,
    INCOMPLETE,
    PREPAID_ERROR,
    REQUESTED
}

export class AbsSubscriberAccount {
    subscriberAccountNumber: string;
    accountStatus: AccountStatusEnum;
    statusDescription: string;
    createDate: string;
    updateDate: string;
}

export class IwsResponse {
    message: string;
}

export class ActivateSubscriberResponse extends IwsResponse {
    item: AbsSubscriberAccount;
}
