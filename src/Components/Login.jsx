import React, { useContext, useState ,useEffect} from 'react';
import { AuthContext } from '../App';
import {Card, CardMedia, Container, Grid, Paper, TextField,CardContent, CardActions, Button, Typography,Link, makeStyles} from '@material-ui/core';
import {} from '@material-ui/icons';
import logo from '../Logo.png';
import front1 from "../front1.webp";

const Login = (props) => {
    let obj = useContext(AuthContext);
    
    const [email,setemail] = useState("");
    const [pass,setpass] = useState("");    
    const [msg,setmsg] = useState("");

    const onLogin = async (e) => {
        try{
            await obj.login(email,pass);
            props.history.push("/");
        }catch(err){
            setmsg(err.message);
            setemail("");
            setpass("");
        }
        
    }

    let useStyles = makeStyles({
        centerDivs : {
            height : "100px",
            display : "flex",
            justifyContent : "center",
            width : "100vh"
        },
        crousal : {
            height : "10rem",
            backgroundColor : "lightgrey"
        },
        centerElem : {
            display:"flex",
            flexDirection : "column",
        },
        margin : {
            marginBottom : "0.5rem",
        },
        textalign : {
            textAlign : "center",
        },
        margintop : {
            marginTop : "150px",
        }
    });
    let classes = useStyles();

    useEffect(()=>{
        // console.log(props);
        if(props.user){
            props.history.push("/");
        }
    },[props.user])

    return ( 
    <div>
        <Container>
            <Grid container spacing={2} className={classes.margintop}>
                <Grid item sm={5}>
                    <CardMedia image={front1} style={{height:"30rem" ,backgroundSize:"contain"}}></CardMedia>
                </Grid>
                <Grid item sm={4}>
                    <Card className={classes.margin}>
                        <CardMedia image={logo} style={{height:"5rem" ,backgroundSize:"contain"}}></CardMedia>
                        <CardContent className={classes.centerElem} style={{marginLeft:"15px" , marginRight:"15px"}}>
                            <TextField className={classes.margin} label="Email" type="email" variant="outlined" value={email} onChange={(e) => setemail(e.target.value)} size="small"></TextField>
                            <TextField className={classes.margin} label="Password" type="password" variant="outlined" value={pass} onChange={(e) => setpass(e.target.value) } size="small"></TextField>
                        </CardContent>
                        <CardActions className={classes.centerElem}>
                            <Button onClick={onLogin} variant="contained" color="primary">Login</Button>
                        </CardActions>
                    </Card>
                    <Card style={{marginTop:"10px" ,height:"50px"}}>
                        <Typography className={classes.textalign} style={{marginTop:"10px"}}>
                            Dont have an account ? 
                            <Link href="/signup">
                                Signup
                            </Link>
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </div>
    );
}
 
export default Login;