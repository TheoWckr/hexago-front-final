import {GameModel} from "./gameModel";
import {GenderModel} from "./genderModel";

/** Fichier de déclaration des proprs utilisés dans les differents components */

export interface GameProps {
    game: GameModel
}

export interface GenderProps {
    genders: GenderModel[]
}
