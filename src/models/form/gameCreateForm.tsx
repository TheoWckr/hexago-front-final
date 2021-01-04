import {GenreModel} from "../genreModel";

export interface GameCreateForm {
    releaseDate: string;
    popularity: number;
    name: string ;
    description: string ;
    playerMax: number ;
    playerMin: number;
    minAge?: number;
    gameLengthMin?: number;
    author?: string;
    gameLengthMax?: number;
    distributor?: string;
    editor?: string;
    baseGameId? :string;
    genres: string[];
    image? : File;
}
export const gameCreateFormDefault : GameCreateForm = {
    releaseDate: "",
    popularity: 0,
    name: "",
    description: "",
    playerMax: 4,
    playerMin: 8,
    genres: []
}