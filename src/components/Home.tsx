import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Snackbar,
  Typography,
  Link,
  CssBaseline,
  TextField,
  Box,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeStyles } from "@material-ui/core/styles";

import Service from "../service/service";
import { ListCountry } from "../assets/country";

export default function Home() {
  let [postCode, setPostCode] = useState("");
  let [open, setOpen] = useState(false);
  let [messageError, setMessageError] = useState("");
  let [listaddress, setListaddress] = useState([]);
  let [address, setAddress] = useState({});
  let [street, setStreet] = useState("");
  let [city, setCity] = useState("");
  let [country, setCountry] = useState(Object);

  useEffect(() => {}, []);

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="http://marangonijunior.com/">
          marangonijunior
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    find: {
      height: "100%",
    },
  }));
  const classes = useStyles();

  const getAddress = (postcode: string) => {
    if (postcode) {
      setAddress({});
      setListaddress([]);
      Service.getAddress(postcode)
        .then((item: any) => {
          if (item.addresses.length > 0) {
            setListaddress(item.addresses);
          } else {
            setMessageError("No address found");
            setOpen(true);
          }
        })
        .catch((error) => {
          setMessageError(error.response.data.Message);
          setOpen(true);
        });
    } else {
      setMessageError("Please inform your post code");
      setOpen(true);
    }
  };

  const handleAddress = (newValue: any) => {
    setAddress(newValue);
    setStreet(newValue.split(",")[0]);
    setCity(newValue.split(",")[newValue.split(",").length - 2]);
    setCountry({ name: "United Kingdom", code: "GB" });
    setListaddress([]);
  };

  return (
    <Container component="main" maxWidth="xs" data-test="home">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
        message={messageError}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add your address
        </Typography>
        <form className={classes.form} noValidate={false}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Postal Code"
                autoFocus
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.find}
                onClick={() => {
                  getAddress(postCode);
                }}
              >
                Find
              </Button>
            </Grid>
            {listaddress.length > 0 && (
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  options={listaddress}
                  value={address}
                  onChange={(event: any, newValue: any) => {
                    handleAddress(newValue);
                  }}
                  getOptionLabel={(option: any) => option}
                  style={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Pick your address"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={ListCountry}
                value={country}
                onChange={(event: any, newValue: any) => {
                  setCountry(newValue);
                }}
                getOptionLabel={(option: any) => option.name}
                style={{ width: "100%" }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "100%", height: "100%" }}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
