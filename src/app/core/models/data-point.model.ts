export class DataPoint<T> {
    x: T;
    y: number;

    constructor(x: T, y: number) {
        this.x = x;
        this.y = y;
    }
}
