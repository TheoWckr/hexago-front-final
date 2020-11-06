import React from 'react';
import { Grid, Container, Box } from "@material-ui/core";
import {makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

interface ChipData {
  key: number;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
  		filters: {
  			marginTop: '1rem',
  		},
  		filter: {
  			textAlign: 'center',
  		},
  		input: {
  			width: '90%',
  		},
  		game_selection: {
  			width: '90%',
  			display: 'flex',
	      	justifyContent: 'center',
	      	flexWrap: 'wrap',
	      	listStyle: 'none',
	      	padding: '0em',
	      	marginTop: '0.5em',
	      	marginLeft: 'auto',
	      	marginRight: 'auto',
  		},
  		pageTitle: {
  			fontWeight: 'normal',
  			color: '#994277',
  		},
  		cards_container: {
  		},
  		event_card: {
  			border: '1px solid grey',
  			borderRadius: '10px',
  			boxShadow: '5px 5px 5px 0px grey',
  			padding: '1em 1.5em',
  		},
  		card_autor: {
  			alignSelf: "center",
  			marginLeft: '0.5em',
  		},
  		card_affiche_title: {
  			marginTop: '0px',
  			marginBottom: '0.5em',
  		},
  		card_games: {
  			borderRadius: '0.3em'
  		},
  		game_chip: {
  			margin: '0.1em'
  		}
	})
);

const EventSearchPanel = () => {
    const classes = useStyles()
    const [chipData, setChipData] = React.useState<ChipData[]>([
	    { key: 0, label: 'Angular' },
	    { key: 1, label: 'jQuery' },
	    { key: 2, label: 'Polymer' },
	    { key: 3, label: 'React' },
	    { key: 4, label: 'Vue.js' },
	]);

	const handleDelete = (key: number) => {
  	  	let idx = 0;
  	  	let data = [];
  	  	for (let chip of chipData) {
  	  		if (chip.key != key) {
  	  			data.push({key: idx++, label: chip.label});
  	  		}
  	  	}
  	  	console.log("data :", data);
  	  	setChipData(data);
  	};

    return (
    	<Container fixed>
	      	<Grid container className={classes.filters}>
	      		<Grid item xs={12}>
	      			<Grid container justify="center">
	      				<h1 className={classes.pageTitle}>EVENEMENTS EN COURS :</h1>
	      			</Grid>
	      		</Grid>
		      	<Grid item xs={12}>
		        	<Grid container justify="center">
	            		<Grid key={0} className={classes.filter} xs={12} lg={3} item>
	              			<form noValidate autoComplete="off">
							  <TextField className={[classes.input, "purple-input"].join(' ')} id="location-input" label="Localisation" variant="outlined" />
							</form>
	            		</Grid>
	            		<Grid key={1} className={classes.filter} xs={12} lg={3} item>
	              			<form noValidate autoComplete="off">
							  <TextField className={classes.input} id="date-input" label="Date de l'évenement" variant="outlined" />
							</form>
	            		</Grid>
	            		<Grid key={2} className={classes.filter} xs={12} lg={3} item>
	              			<form noValidate autoComplete="off">
							  <TextField className={classes.input} id="game-input" label="Ajouter un jeu" variant="outlined" />
								<Grid container justify="center" component="ul" className={classes.game_selection}>
							      {chipData.map((data) => {
							        return (
							          <li key={data.key}>
							            <Chip
									        variant="outlined"
									        color="secondary"
									        size="small"
									        className={classes.game_chip}
									        label={data.label}
									        onDelete={() => {handleDelete(data.key)}}
									      />
							          </li>
							        );
							      })}
							    </Grid>
							</form>
	            		</Grid>
		        	</Grid>
		      	</Grid>
		      	<Grid item xs={12} className={classes.cards_container}>
		      		<Grid container>
		      			<h2>RESULTATS :</h2>
		      		</Grid>
		      		<Grid container>
		      			<Grid item key={0} className={classes.event_card}>
		      				<p className={classes.card_affiche_title}><u>A l'affiche :</u></p>
		      				<Grid container justify="center" spacing={2}>
		      					<Grid item key={0} xs={4}>
		      						<Chip variant="outlined" className={classes.card_games} color="secondary" label="Monopoly"/>
		      					</Grid>
		      					<Grid item key={1} xs={4}>
		      						<Chip variant="outlined" className={classes.card_games} color="secondary" label="Time's Up"/>
		      					</Grid>
		      					<Grid item key={2} xs={4}>
		      						<Chip variant="outlined" className={classes.card_games} color="secondary" label="Dominos"/>
		      					</Grid>
		      				</Grid>
		      				<Grid container justify="center">
			      				<h2>Paris</h2>
			      			</Grid>
			      			<Grid container justify="center">
			      				<Box component="div" display="inline"><Avatar src="/broken-image.jpg" /></Box>
			      				<Box component="div" display="inline" className={classes.card_autor}>Crée par Jacob Dubois le 28/09/2020</Box>
			      			</Grid>
		      			</Grid>
		      		</Grid>
		      	</Grid>
		    </Grid>
		</Container>
	);
}

export default EventSearchPanel;
