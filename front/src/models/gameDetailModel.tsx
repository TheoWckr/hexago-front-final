type gameDetailModel = {
    _id: string,
    gameLengthMax: number,
    editor: string,
    releaseDate: string,
    author: string[],
    gameLengthMin: number,
    popularity: number,
    minAge: number,
    name: string,
    playerMax: number,
    playerMin: number,
    distributor: string,
    genre: string[],
    description: string
}

export default gameDetailModel;
