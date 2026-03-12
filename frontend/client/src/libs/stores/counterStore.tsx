import { makeAutoObservable } from "mobx";

export default class CounterStore {
    title = 'Counter store';
    count = 69;
    events: string[] = [
        `Initial: ${this.count}`
    ];

    constructor() {
        makeAutoObservable(this)
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Increment by ${amount} - count is now ${this.count}`)
    }

    decrease = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decrease by ${amount} - count is now ${this.count}`)
    }

    get eventCount() {
        return this.events.length;
    }
}