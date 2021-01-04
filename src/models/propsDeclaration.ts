import {GameModel} from "./gameModel";
import {GenreModel} from "./genreModel";
import {imageModel} from "./shared/imageModel";
import {Dispatch, SetStateAction} from "react";

/** Fichier de déclaration des proprs utilisés dans les differents components */

export interface GameProps {
    game: GameModel,
    hidden? : boolean
}

export interface GameEditProps {
    game : GameModel,
    changeGameState: any,
}

export interface GenreProps {
    genres: GenreModel[],
    changeGenreState: any
}

export interface ImageProps {
    images: imageModel[]
}