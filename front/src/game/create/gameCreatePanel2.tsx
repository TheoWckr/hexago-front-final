
import { FormControlLabel, Grid, Slider, Switch} from "@material-ui/core";
import React, {useEffect} from "react";
import {GameEditProps, GameProps} from "../../models/propsDeclaration";
import {marksGameAgeMin, marksGameDuration} from "../../models/gameModel";
import {useStylesPanelCreatePage} from "./gameCreatePage";
import GenderSelector from "../commons/GenderSelector";
import {genderMockList} from "../../data-mock/GenderMock";
import {useFormContext} from "react-hook-form";


export const GameCreatePanel2 = (props:GameEditProps ) => {
    function valueLabelFormat(value: number) {
        return marksGameDuration[marksGameDuration.findIndex(mark => mark.value === value)].hiddenLabel ;
    }

    const [checkedAge, setCheckedAge] = React.useState(false);
    const [checkedDuration, setCheckedDuration] = React.useState(false);
    const [checkedNumPlayer, setCheckedNumPlayer] = React.useState(props.game.playerMin !== undefined);


    const handleChangeNumberOfPlayer = (event: any, newValue: number | number[]) => {
        if (newValue as number[]) {
            props.changeGameState('playerMin', (newValue as number[])[0]);
            props.changeGameState('playerMax', (newValue as number[])[1]);
        }
    };

    const handleChangeMinimumAge = (event: any, newValue: number | number[]) => {
      console.log(newValue);
        if (newValue as number) {
            props.changeGameState('minAge',newValue );
        }
    };

    const handleChangeGameLength= (event: any, newValue: number | number[]) => {
        if (newValue as number[]) {
            props.changeGameState('gameLengthMin', (newValue as number[])[0]);
            props.changeGameState('gameLengthMax', (newValue as number[])[1]);
        }
    };



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
                onChange={handleChangeMinimumAge}
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
                onChange={handleChangeGameLength}
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
                onChange={handleChangeNumberOfPlayer}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={1}
                max={16}
            />
            <GenderSelector genders={props.game.genres}/>
        </Grid>


)


};
export default GameCreatePanel2;
