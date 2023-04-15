import PropietyParams from "./propietyParams";
export default interface Propiety {
    id: number,
    dbId: string,
    name: string,
    class: string,
    owner: string,
    ownerColor: string,
    levelParams: PropietyParams[],
    currentLevel: number,
    profit: number,
}