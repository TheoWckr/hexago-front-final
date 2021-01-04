export default interface EventDisplayType {
    listPlayers: string[],
    listGames:{_id : string, name : string}[],
    _id : string,
    duration: number,
    date:Date,
    minPlayers:number,
    maxPlayers:number,
    phone: string,
    details:string
    locationId: string
    owner:{_id: string,username: string},
    currentPlayers : number
}