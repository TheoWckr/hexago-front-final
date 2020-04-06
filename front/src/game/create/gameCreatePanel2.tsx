
import { FormControlLabel, Grid, Slider, Switch} from "@material-ui/core";
import React, {useEffect} from "react";
import { GameProps} from "../../models/propsDeclaration";
import {marksGameAgeMin, marksGameDuration} from "../../models/gameModel";
import {useStylesPanelCreatePage} from "./gameCreatePage";
import GenderSelector from "../commons/GenderSelector";
import {genderMockList} from "../../data-mock/GenderMock";
import {useFormContext} from "react-hook-form";


export const GameCreatePanel2 = (props:GameProps ) => {
    function valueLabelFormat(value: number) {
        return marksGameDuration[marksGameDuration.findIndex(mark => mark.value === value)].hiddenLabel ;
    }
    const { register } = useFormContext();

    const [checkedAge, setCheckedAge] = React.useState(false);
    const [checkedDuration, setCheckedDuration] = React.useState(false);
    const [checkedNumPlayer, setCheckedNumPlayer] = React.useState(props.game.playerMin !== undefined);

    const [valueNumPlayer, setValueNumPlayer] = React.useState<number[]>([props.game.playerMin, props.game.playerMax]);
    const handleChangeNumPlayerValue = (event: any, newValue: number | number[]) => {
        setValueNumPlayer(newValue as number[]);
    };

    useEffect(() => {
        props.game.playerMin = valueNumPlayer[0];
    console.log('change player min ', props.game.playerMin);
    },[valueNumPlayer]);

    const handleChangeAge = () => {
        setCheckedAge(prev => !prev);
    };
    const handleChangeDuration = () => {
        setCheckedDuration(prev => !prev);
    };
    const handleChangeNumPlayer = () => {
        setCheckedNumPlayer(prev => !prev);
    };


    const classes = useStylesPanelCreatePage();
    return (
        <Grid
              container
              direction="column"
              className={classes.panel}
        >
             <FormControlLabel
                control={<Switch checked={checkedAge} onChange={handleChangeAge} />}
                label="Minimum Age"
            />
            <Slider
                name={'age'}

                disabled={!checkedAge}
                defaultValue={10}
                aria-labelledby="discrete-slider-custom"
                step={1}
                min={3}
                max={21}
                valueLabelDisplay={"on"}
                marks={marksGameAgeMin}
            />


            <FormControlLabel
                control={<Switch checked={checkedDuration} onChange={handleChangeDuration} />}
                label="Duration"
            />
            <Slider
                disabled={!checkedDuration}

                defaultValue={[30,60]}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                aria-labelledby="discrete-slider-restrict"
                marks={marksGameDuration}
                step={null}
                min={15}
                max={180}
            />


            <FormControlLabel
                control={<Switch checked={(props.game.playerMin !== undefined && checkedNumPlayer)} onChange={handleChangeNumPlayer} />}
                label="Number of player"
            />
            <Slider
                disabled={(props.game.playerMin === undefined || !checkedNumPlayer)}

                defaultValue={ props.game.playerMin ? [props.game.playerMin, props.game.playerMax] : [4,8]}
                onChange={handleChangeNumPlayerValue}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={1}
                max={16}
            />
            <GenderSelector genders={genderMockList}/>

        </Grid>


)


};
export default GameCreatePanel2;
