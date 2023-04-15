import Propieties from "./propiety";
export default interface Player {
    id: string,
    room: string,
    name: string,
    color: string,
    img: string,
    position: number,
    money: number,
    turn: boolean,
    jail: number,
    bankrupt: boolean,
    pairs: number,
    propieties: number,
    ports: number,
}