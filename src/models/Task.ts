export class Task {
    constructor(
        public id: number,
        public name: string,
        public date: string,
        public startTime: number,
        public durationTime: number
    ){}
}