import { Rule } from "./rule"

export class Level {
    constructor(public rules: Rule[], public skewers: number, public spots: number = 9) { }
}