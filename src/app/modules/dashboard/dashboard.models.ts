export class GetDataSummaryRequest {
    from: string | null;
    to: string | null;
}

export class DataSummaryViewModel {
    date: string;
    totalBytes: number;
}
