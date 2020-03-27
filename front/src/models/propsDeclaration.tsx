import {GameModel} from "./gameModel";
import {GenderModel} from "./genderModel";

/** Fichier de déclaration des proprs utilisés dans les differents components */

export interface GameProps {
    game: GameModel
    hidden? : boolean
}

export interface GenderProps {
    genders: GenderModel[]
}
