export class Task {
    constructor(
        public id: number,
        public name: string,
        public date: string,
        public startHour: number,
        public endHour: number
    ){}
}