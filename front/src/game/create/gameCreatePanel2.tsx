
import { FormControlLabel, Grid, Slider, Switch} from "@material-ui/core";
import React from "react";
import {GameProps} from "../../models/propsDeclaration";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {gameAgeMinMarks, gameDurationMarks} from "../../models/gameModel";
import {useStylesPanelCreatePage} from "./gameCreatePage";
import GenderSelector from "../commons/GenderSelector";
import {genderMockList} from "../../data-mock/GenderMock";


export const GameCreatePanel2 = (props:GameProps) => {
    function valueLabelFormat(value: number) {
        return gameDurationMarks[gameDurationMarks.findIndex(mark => mark.value === value)].hiddenLabel ;
    }

    const [checkedAge, setCheckedAge] = React.useState(false);
    const [checkedDuration, setCheckedDuration] = React.useState(false);
    const [checkedNumPlayer, setCheckedNumPlayer] = React.useState(false);


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
                disabled={!checkedAge}
                defaultValue={10}
                aria-labelledby="discrete-slider-custom"
                step={1}
                min={3}
                max={21}
                valueLabelDisplay={"on"}
                marks={gameAgeMinMarks}
            />


            <FormControlLabel
                control={<Switch checked={checkedDuration} onChange={handleChangeDuration} />}
                label="Duration"
            />
            <Slider
                disabled={!checkedDuration}

                defaultValue={30}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                aria-labelledby="discrete-slider-restrict"
                marks={gameDurationMarks}
                step={null}
                min={15}
                max={180}
            />


            <FormControlLabel
                control={<Switch checked={checkedNumPlayer} onChange={handleChangeNumPlayer} />}
                label="Number of player"
            />
            <Slider
                disabled={!checkedNumPlayer}

                defaultValue={[5,8]}
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
