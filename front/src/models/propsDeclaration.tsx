import {GameModel} from "./gameModel";
import {GenderModel} from "./genderModel";

/** Fichier de déclaration des proprs utilisés dans les differents components */

export type GameProps = {
    game: GameModel
}

export type GenderProps = {
    genders: GenderModel[]
}
