import "./Settings.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { 
  Grid, Paper, TextField, Typography, FormControl, Button, Link
} from "@mui/material";

const Settings = (props) => {
  const [formValues, setFormValues] = useState({});
  const url = "https://my.api.mockaroo.com/user?key=d685d830"; 
  
  useEffect(() => {
    async function fetchData() {
      const result = await axios(url);
      setFormValues(result.data);
    }
    fetchData();
  }, []);


  const onChange = e => {
    const {name, value} = e.target; 
    setFormValues({
      ...formValues, 
      [name] : value
    }); 
  }; 

  // when confirm password field changes, make sure the passwords match
  const onConfirmPasswordChange = e => {
    const {name, value} = e.target; 
    if (formValues["password"] !== value) {
      setFormValues({
        ...formValues, 
        ["passwordError"] : "Passwords do not match!"
      }); 
    }
    else {
      setFormValues({
        ...formValues, 
        ["confirmPassword"] : value, 
        ["passwordError"] : ""
      }); 
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues); 
  }

  return <Grid className="settingsPage" align="center">
    <Paper elevation={10} className="pageWrapper">
      <Grid className="settingsPageHeader">
        <Typography variant="h4">Settings<b/></Typography>
      </Grid>

      <form onSubmit={handleSubmit} className="settingsForm">
        <FormControl className="settingsFormField">
          <Typography className="formLabel">Reset Username</Typography>
          <TextField label={formValues.username} placeholder={formValues.username} type="text" onChange={onChange} name="username"/>

          <Typography className="formLabel">Reset Email</Typography>
          <TextField label={formValues.email} placeholder={formValues.email} type="email" onChange={onChange} name="email"/>

          <Typography className="formLabel">Reset Password</Typography>
          <TextField label={formValues.password} placeholder={formValues.password} onChange={onChange} name="password" type="password"/>

          <Typography className="formLabel">Confirm Password Reset</Typography>
          <TextField label={formValues.passwordConfirm} placeholder={formValues.passwordConfirm} type="password" name="confirmPassword"
            onChange={onConfirmPasswordChange}
            error={formValues["passwordError"] !== ""}
            helperText={formValues["passwordError"]}
          /> 

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>

    </Paper>
  </Grid>
};

export default Settings;
