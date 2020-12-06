import React, {useEffect, useState} from "react";
import {GenreModel} from "../../../models/genreModel";
import {GenreService} from "../../../services/genreService";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {UtilsAxios} from "../../../utils/utilsAxios";

type FormGenre = {
    genre: string;
};

export const GenreUpdatePanel = (props: { genreState: GenreModel, setGenreState :any}) => {
    const [newGenreValue, setNewGenreValue] = useState(props.genreState.genre);
    const {register, handleSubmit, errors} = useForm<FormGenre>();
    const [edited, setEdited] = useState(false);
    const [deleted, setDeleted] = useState(false);
useEffect(() => {
    setDeleted(false);
    setNewGenreValue(props.genreState.genre);
}, [props.genreState]);
    const deleteState = () => {
        GenreService.deleteGenre(props.genreState._id).then(
            (response) => {
                if (response.status === 200)
                    setDeleted(true);
            });
    };
    const onSubmit = handleSubmit(({genre}) => {
        let genreToEdit = props.genreState;
        genreToEdit.genre = genre;
        GenreService.updateGenre(genreToEdit).then((response) => {
            UtilsAxios.displayReponse(response);
            if (response.status === 200)
                setEdited(true);
        });

        props.setGenreState((prevValue: { genre: any; }) => {
                prevValue.genre = genre;
                return prevValue;
            }
        );

    });

   if(props.genreState._id.length !== 0 && !deleted) return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid container direction={"column"}>
                    <Typography variant={'h5'}  style={{padding: '1.3em'}}>
                        Edition
                    </Typography>
                    <Grid container direction={"row"}>
                        <TextField label={'Nouvelle valeur'} variant={"outlined"} name={'genre'}
                                   value={newGenreValue}
                                   style={{margin: 'auto', width: '40%', marginBottom:'1em'}}
                                   inputRef={register({required: true})}
                                   onChange={(event ) => {
                                       setNewGenreValue(
                                           event.target.value
                                       );
                                       if (edited) setEdited(false)
                                   }}  />
                    </Grid>
                    <Grid container direction={"row"} style={{padding: '1.3em'}}>
                        <Button variant="outlined" color="primary" style={{width: '40%', margin: 'auto'}}
                                type="submit"
                        >Modifier</Button>
                        <Button variant="outlined" color="secondary" style={{width: '40%', margin: 'auto'}}
                                onClick={deleteState}
                        >Supprimer </Button>
                    </Grid>
                    <div style={{margin: "auto"}}>
                        {errors.genre && <Typography> The name of the genre is mandatory</Typography>}
                        {edited && <Typography> Genre successfully edited</Typography>}
                    </div>
                </Grid>
            </form>
        </div>
    );

    else if(props.genreState._id.length !== 0 && deleted) return (
       <Typography variant={'h4'} style={{padding: '1.3em'}}>
           Genre successfully deleted
       </Typography>
   );

    else return (<div/>)
};