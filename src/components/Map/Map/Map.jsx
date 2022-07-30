import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from "./styles";

const coordinates = { lat: 0, lng: 0 };

const Map = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = { lat: 0, lng: 0 };

	return (
        <div className={classes.mapContainer}>
            <h1>Map</h1>    
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCIOvPLN20q8N_wfVi3Jwlov9SZ12OxChc'}}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={14}
                    margin={[50, 50, 50, 50]}
                    options={""}
                    onChange={""}
                    onChildClick={""}
                >

                </GoogleMapReact>
        </div>
    );
};

export default Map;
