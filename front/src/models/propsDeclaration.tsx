import {GameModel} from "./gameModel";
import {GenderModel} from "./genderModel";
import {imageModel} from "./shared/imageModel";
import {FormContextValues} from "react-hook-form/dist/contextTypes";

/** Fichier de déclaration des proprs utilisés dans les differents components */

export interface GameProps {
    game: GameModel,
    hidden? : boolean
}

export interface GameEditProps {
    game : GameModel,
    changeGameState: any
}

export interface GenderProps {
    genders: GenderModel[]
}
export interface ImageProps {
    images: imageModel[]
}
