import React, { Component, useContext, useState } from 'react';
import { firebaseDB, firebaseStorage } from '../Config/firebase';
import { AuthContext } from '../App';
import {Card, CardMedia, Container, Grid, Paper, TextField,CardContent, CardActions, Button, Typography,Link, makeStyles} from '@material-ui/core';
import logo from '../Logo.png';
import front1 from '../front1.webp';

const Signup = (props) => {

    const [user,setuser] = useState("");
    const [email,setemail] = useState(""); 
    const [pass,setpass] = useState(""); 
    const [image,setimage] = useState(null); 
    const {signin} = useContext(AuthContext);

    const handleOnChange = (e) => {
        let file = e.target.files[0];
        setimage(file);
    }

    const handleSignUp = async () => {
        try{
            let response = await signin(email,pass);
            let uid = response.user.uid;

            const uploadimage = firebaseStorage.ref(`/profilephotos/${uid}/image.jpg`).put(image);

            uploadimage.on("state_changed" , fun1,fun2,fun3);
            function fun1(snapshot){
                //progress func
                let prog = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(prog);
            }
            function fun2(error){
                //error handling
                console.log(error);
            }
            async function fun3(){
                //main func
                console.log("in fun3");
                let profileimageurl = await uploadimage.snapshot.ref.getDownloadURL();
                console.log(profileimageurl);
                firebaseDB.collection("users").doc(uid).set({
                    email : email,
                    username : user,
                    userid : uid,
                    profileimageurl : profileimageurl, 
                    postsCreated:[],
                });
                props.history.push("/");

            }

        }catch(err){
            console.log(err.message);
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
            marginTop : "50px",
        }
    });

    let classes = useStyles();

    return ( 
        <Container>
            <Grid container spacing={2} className={classes.margintop}>
                <Grid item sm={5}>
                    <CardMedia image={front1} style={{height:"30rem" ,backgroundSize:"contain"}}></CardMedia>

                </Grid>
                <Grid item sm={4}>
                    <Card className={classes.margin}>
                        <CardMedia image={logo} style={{height:"5rem" ,backgroundSize:"contain"}}></CardMedia>
                        <CardContent className={classes.centerElem} style={{marginLeft:"15px" , marginRight:"15px"}}>
                            <TextField className={classes.margin} size="small" label="Username" type="text" variant="outlined" value={user} onChange={(e) => {setuser(e.target.value)}}></TextField>
                            <TextField className={classes.margin} size="small" label="Email" type="email" variant="outlined" value={email} onChange={(e) => {setemail(e.target.value)}}></TextField>
                            <TextField className={classes.margin} size="small" label="Password" type="password" variant="outlined" value={pass} onChange={(e) => {setpass(e.target.value)}}></TextField>
                        </CardContent>
                        <CardActions className={classes.centerElem}>
                            <input type="file" accept="image/*" id="uploadfile"  onChange={(e) => {handleOnChange(e)}}/>
                        </CardActions>
                        <CardActions className={classes.centerElem}>
                            <Button onClick={handleSignUp} variant="contained" color="primary">Sign Up</Button>
                        </CardActions>
                    </Card>
                    <Card style={{marginTop:"10px" ,height:"50px"}}>
                        <Typography className={classes.margin , classes.textalign} style={{marginTop:"10px"}}>
                            Already have an account ? 
                            <Link href="/login">
                                Log in
                            </Link>
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default Signup;