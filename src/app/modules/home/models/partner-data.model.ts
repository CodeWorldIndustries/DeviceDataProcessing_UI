export class PartnerData {
    partnerId: number;
    partnerName: string;
    trackers: Tracker[];
}

export class Tracker {
    id: number;
    model: string;
    shipmentStartDtm: string;
    sensors: Sensor[];
}

export class Sensor {
    id: number;
    name: string;
    crumbs: Crumbs[];
}

export class Crumbs {
    createdDtm: string;
    value: number;
}
