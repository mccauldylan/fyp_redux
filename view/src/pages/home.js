import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const rows = [
    "1",
    "2"
]

export class home extends Component {

    render() {
        return (
            <Grid 
            container 
            direction="column"
            justify="flex-end"
            alignItems="center">
                <Grid item xs ={6}>
                    <Paper>
                        <Button variant="outlined" color="primary">
                            1 Register Info
                        </Button>
                    </Paper>
                </Grid> 
                <Grid item xs ={6}>
                    <Paper>
                        <Button variant="outlined" color="primary">
                            27 Sleeping
                        </Button>
                    </Paper>
                </Grid>   
            </Grid>
               
                

            
        )
    }
}

export default home
