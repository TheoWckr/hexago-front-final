import React from 'react';
import { Grid, Container, Box } from "@material-ui/core";
import {makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {EventService} from "../../../services/eventService";

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
  			//border: '1px solid grey',
  			backgroundColor: "#FFFFFF",
  			borderRadius: '10px',
  			boxShadow: '5px 5px 5px 0px silver',
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
    const [date, setDate] = React.useState(undefined);
    const [chipData, setChipData] = React.useState<ChipData[]>([]);
    const [events, setEvents] = React.useState([]);
    const [locationId, setLocationId] = React.useState(undefined);
    const [listGames, setListGames] = React.useState(undefined);
    const [showEventFull, setShowEventFull] = React.useState(undefined);
    const [limit, setLimit] = React.useState(0);
    const [offset, setOffset] = React.useState(0);
    
    useEffect(() => {
    	let filters = {
    		date: date,
		    locationId: locationId,
		    listGames: listGames,
		    showEventFull: showEventFull,
		    limit: limit,
		    offset: offset,
    	};
    	EventService.searchEvent(filters).then((res: any) => {
			setEvents(res);
		}).catch(() => {});
    }

	const handleDelete = (key: number) => {
  	  	let idx = 0;
  	  	let data = [];
  	  	for (let chip of chipData) {
  	  		if (chip.key != key) {
  	  			data.push({key: idx++, label: chip.label});
  	  		}
  	  	}
  	  	setChipData(data);
  	};

  	const handleChangeReleasedDate = (date: MaterialUiPickersDate) => {
    	if (date)
    		setDate(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
    };

    const handleGamePress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
        	let idx = 0;
            let data = [];
            let lstgame = [];
            for (let chip of chipData) {
            	data.push({key: idx++, label: chip.label});
            	lstgame.push(chip.label);
            }
            data.push({key: idx, label: e.target.value});
            setChipData(data);
            setListGames(lstgame);
            e.target.value = "";
        }
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
			      	<form noValidate autoComplete="off">
			        	<Grid container justify="center">
		            		<Grid key={0} className={classes.filter} xs={12} lg={3} item>
								 <TextField
								 	className={[classes.input, "purple-input"].join(' ')}
								 	id="location-input"
								 	label="Localisation"
								 	variant="outlined"
								 	onChange={(e) => setLocationId(e.target.value)}/>
		            		</Grid>
		            		<Grid key={1} className={classes.filter} xs={12} lg={3} item>
								 <KeyboardDatePicker
						            className={classes.input}
						            margin="normal"
						            id="date-input"
						            placeholder="Date de l'éventement (dd/mm/yyyy)"
						            format="MM/dd/yyyy"
						            value={date}
						            onChange={handleChangeReleasedDate}
						            KeyboardButtonProps={{
						                'aria-label': 'change birth date',
						            }}
						        />
		            		</Grid>
		            		<Grid key={2} className={classes.filter} xs={12} lg={3} item>
			            		<TextField 
			            			className={classes.input}
			            			id="game-input"
			            			label="Ajouter un jeu"
			            			variant="outlined"
			            			onKeyPress={(e) => {handleGamePress(e)}}
			            		/>
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
		            		</Grid>
		        		</Grid>
		        	</form>
		      	</Grid>
		      	<Grid item xs={12} className={classes.cards_container}>
		      		<Grid container>
		      			<h2>RESULTATS :</h2>
		      		</Grid>
		      		<Grid container>
		      		{if (events.length != 0) {
		      		events.map((event) => {
		      			if (!event.eventId)
		      				return (<p>Aucun evenement</p>);
		      			return (
			      			<Grid item key={event.eventId} className={classes.event_card}>
			      				<p className={classes.card_affiche_title}><u>A l'affiche :</u></p>
			      				<Grid container justify="center" spacing={2}>
			      				{event.listGames((game) => {
			      					return (
				      					<Grid item key={game} xs={4}>
				      						<Chip variant="outlined" className={classes.card_games} color="secondary" label={game}/>
				      					</Grid>
				      				);
			      				})}
			      				</Grid>
			      				<Grid container justify="center">
				      				<h2>{event.locationID}</h2>
				      			</Grid>
				      			<Grid container justify="center">
				      				<Box component="div" display="inline"><Avatar src="/broken-image.jpg" /></Box>
				      				<Box component="div" display="inline" className={classes.card_autor}>Crée par {event.owner} le {event.date}</Box>
				      			</Grid>
			      			</Grid>
			      		);
		      		})}}
		      		</Grid>
		      	</Grid>
		    </Grid>
		</Container>
	);
}

export default EventSearchPanel;
