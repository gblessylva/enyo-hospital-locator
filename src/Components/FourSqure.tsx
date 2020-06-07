import * as React from 'react'
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import {Container, Paper, MenuItem, TextField, Grid, Card, Button, CardHeader, CardContent, Typography, Avatar} from '@material-ui/core';

const radius = [
  {
    value: 100,
    label: '100 KM',
  },
  {
    value: 2000,
    label: '200 KM',
  },
  {
    value: 500,
    label: '500 KM',
  },
  {
    value: 1000,
    label: '1000 KM',
  },
  {
    value: 5000,
    label: '5000 KM',
  },
  {
    value: 10000,
    label: '10000 KM',
  },
  {
    value: 50000,
    label: '50000 KM',
  },
  {
    value: 100000,
    label: '100000 KM',
  },
];

  let clientID: string = 'SKUVHAAYYNTRKMRTO5L4TFSDOWP0RB3V1DU4SSWTZROQFYS0';
  let clientSecret: string = '1FAQRYK1DZYN21RGKQW3QOZEJSR1S1FAH2NG0LHIM2QLCML2';  
  let limit:  number = 20;
  let query : string = 'hospital';
 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    card: {
      padding: theme.spacing(2),
      textAlign: 'left',
      margin: '1rem',
      color: theme.palette.text.secondary,
    },
    formContainer: {
      width:'100%',
      padding: theme.spacing(2),
      textAlign: 'left',
      margin: '1rem',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    input: {
      width:'60%',
      fontSize: '2rem',
    },
    select:{
      width:"30%",
      fontSize: '1.8rem',
    },
    centeredItem: {
      textAlign:'center',
      color: blue[400],
      marginTop:'6rem',
    },
    avatar: {
      backgroundColor: blue[500],
    },
  }),
);

export const FoursquareDemo: React.FC = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true)
  const [venues, updateLocation] = React.useState<any[]>([])
  const [radi, setRadius] = React.useState('100');
  let [location, setLocation]  = React.useState('lagos');
  const url = `https://api.foursquare.com/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20200606&near=${location}&intent=checkin&radius=${radi}&query=${query}&limit=${limit}`



  const sendGetRequest = async () => {
    const res = await axios({
      url: url,
      method: 'get'
    });
    const { venues } = res.data.response;
    // console.log(venues)
    return venues;
  };
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(event.target.value);
  };
  const handleLoctionChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    console.log(location)
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    sendGetRequest().then((venues: React.SetStateAction<any[]>) => updateLocation(venues));
    setLocation('lagos');
  }
   


    return (
      <React.Fragment>
      
      <CssBaseline />
      <Container>
        <Grid className={classes.centeredItem}>
          <h1>Search for Hospitals Near You</h1>
        </Grid>

      <form onSubmit={handleSubmit} className={classes.formContainer} noValidate autoComplete="off">
        <TextField 
        className={classes.input}
        onChange={handleLoctionChange} 
        id="outlined-basic" label="Enter your search term" variant="outlined" />
        <TextField 
          className={classes.select}
          id="standard-select-currency"
          select
          label="Select"
          value={radi}
          helperText="Choose Radius"
          onChange={handleChange}
        >
          {radius.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      
        </TextField>
        <Button type='submit' variant="contained" color="primary" > Check </Button>
      </form>
        
        {venues.map(venue => {
          const {name, location, id, categories} = venue
          const { formattedAddress} = location;
         
          return (
            <Grid key={id}>
              <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="name" className={classes.avatar}>
                    {name.charAt(0)}
                  </Avatar>
                }
                title={name}
              />
               <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Full Address: {formattedAddress.join(' ')}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Category: {categories.map((category: { name: any; }) =>{
                    return category.name
                  })}
                </Typography>
              </CardContent>
              </Card>
            </Grid>
          );
        })
      }
       </Container>
    </React.Fragment>
  )

}
