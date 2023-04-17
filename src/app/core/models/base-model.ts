export class Base {
    id: string;
    createdDate: string;
    deletedDate: string | null;
}

// @ts-ignore
export class ResponseModel2 {
    errored: boolean;
    errorMessage: string;
}

// @ts-ignore
export class ResponseModel<TReturn> extends ResponseModel2 {
    data: TReturn;
}
