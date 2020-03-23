import React from "react";
import { Link } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 12
    },
    title: {
        fontSize: 25,
        fontWeight: 600
    },
    grid: {
        marginTop: 12
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 300
    }
});

const ListCard = ({data}: any) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.grid}>
            {data.map((value: any) =>
                <Grid item xs={12} sm={6} xl={4}>
                    <Card className={classes.root}>
                        <CardActionArea component={Link} to={value.gameDetailsId}>
                            <CardMedia
                                className={classes.media}
                                image={value.mainImage}
                                title={value.name}
                            />
                            <CardContent>
                                <Typography className={classes.title}>
                                    {value.name}
                                </Typography>
                                <Typography>
                                    {value.author}
                                </Typography>
                                <Typography>
                                    {value.gameGenre.map((genre: string) =>
                                        genre
                                    ).reduce((prev:string, curr:string) => [prev, ', ', curr])}
                                </Typography>
                                <Typography>
                                    {(new Intl.DateTimeFormat('fr-FR').format(new Date(value.releaseDate)))}
                                </Typography>
                                <Rating name="read-only" value={value.popularity} readOnly />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
};

export default ListCard;

