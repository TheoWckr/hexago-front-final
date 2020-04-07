import {GameModel} from "./gameModel";
import {GenreModel} from "./genreModel";
import {imageModel} from "./shared/imageModel";
import {FormContextValues} from "react-hook-form/dist/contextTypes";

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
    genres: GenreModel[]
    changeGenderState: any
}
export interface ImageProps {
    images: imageModel[]
}
