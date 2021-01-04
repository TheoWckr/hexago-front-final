import React, {useState} from "react";
import {GenreModel} from "../../../models/genreModel";
import {GenreService} from "../../../services/genreService";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {UtilsAxios} from "../../../utils/utilsAxios";

type FormGenre = {
    genre: string;
};
/**
 * Panel for creation of a
 * @constructor
 */
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
                    <Typography variant={'h5'}  style={{padding: '1.3em'}}>
                        Creer un nouveau genre
                    </Typography>
                        <TextField name={'genre'} style={{width: '50%', margin: "auto", marginBottom:'1em'}} label="Nouveau genre"
                                   variant="outlined"
                                   inputRef={register({required: true})}
                                   onChange={() => {
                                       if (created) setCreated(false)
                                   }}/>
                    <Button variant="outlined" color="primary" style={{width: '30%', margin: "auto", marginTop:'1em'}}
                            type="submit"
                    > Créer</Button>
                    <div style={{margin :"auto", padding:'1em'}}>
                    {errors.genre && <Typography> The name of the genre is mandatory</Typography>}
                    {created && <Typography > Genre successfully created</Typography>}
                    </div>
                </Grid>
            </form>
        </div>
    )
};