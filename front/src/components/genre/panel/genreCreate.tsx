import React, {useState} from "react";
import {GenreModel} from "../../../models/genreModel";
import {GenreService} from "../../../services/genreService";
import {Button, Divider, Grid, Input, InputLabel, TextField, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {UtilsAxios} from "../../../utils/utilsAxios";

type FormGenre = {
    genre: string;
};

export const GenreCreatePanel = () => {

    const {register, handleSubmit, errors} = useForm<FormGenre>();
    const [created, setCreated] = useState(false);
    const onSubmit = handleSubmit(({genre}) => {
        GenreService.createGenre(new GenreModel({genre: genre})).then((response) => {
            UtilsAxios.displayReponse(response);
            if (response.status === 200)
                setCreated(true);
        });
    });


    return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid container direction={"column"} >
                    <Typography variant={'h4'} style={{padding: '1.3em'}}>
                        Genre Creation
                    </Typography>
                        <TextField name={'genre'} style={{width: '50%', margin: "auto", marginBottom:'1em'}} label="New genre"
                                   variant="outlined"
                                   inputRef={register({required: true})}
                                   onChange={() => {
                                       if (created) setCreated(false)
                                   }}/>
                    <Button variant="outlined" color="primary" style={{width: '30%', margin: "auto", marginTop:'1em'}}
                            type="submit"
                    > Create</Button>
                    <div style={{margin :"auto", padding:'1em'}}>
                    {errors.genre && <Typography> The name of the genre is mandatory</Typography>}
                    {created && <Typography > Genre successfully created</Typography>}
                    </div>
                </Grid>
            </form>
        </div>
    )
};