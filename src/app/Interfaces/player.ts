import Propieties from "./propiety";
export default interface Player {
    id: string,
    name: string,
    money: string,
    turn: boolean,
    propieties: Propieties[],
}