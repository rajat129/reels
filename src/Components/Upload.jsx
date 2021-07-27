import React, {useState, useContext} from 'react';
import {Card, Typography,Button,TextField,CardContent,CardActions, makeStyles} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { firebaseStorage,firebaseDB ,timeStamp} from '../Config/firebase';
import {uuid} from 'uuidv4';
import { AuthContext } from '../App';
import './Upload.css';
import ClearIcon from '@material-ui/icons/Clear';

const Upload = ({modal , togglemodal}) => {

    const [video,setvideo] = useState(null);
    const {user} = useContext(AuthContext);
    const [caption,setCaption] = useState(null);

    const handleinputvideo = (e) =>{
        let file = e.target.files[0];
        console.log(e.target,file);
        setvideo(file); 
    }

    const handleuploadvideo = async (e) =>{
        try{
            let uid = user.uid;
            const uploadvideo = firebaseStorage.ref(`/profilephotos/${uid}/${Date.now()}.jpg`).put(video);
            // console.log(uploadvideo);

            uploadvideo.on("state_changed" , fun1,fun2,fun3);
            function fun1(snapshot){
                //progress func
                let prog = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                // console.log(prog);
            }
            function fun2(error){
                //error handling
                console.log(error);
            }
            async function fun3(){
                //main func
                let pid = uuid();
                let videourl = await uploadvideo.snapshot.ref.getDownloadURL();
                console.log(videourl);
                firebaseDB.collection("posts").doc(pid).set({
                   pid:pid,
                   uid:uid,
                   comments:[],
                   likes:[],
                   videourl:videourl,
                   createdAt : timeStamp(),
                   caption : caption,
                });
                //pushing data into user about what videos he has psoted
                let doc = await firebaseDB.collection("users").doc(uid).get();
                let document = doc.data();
                // console.log(document);
                document.postsCreated.push(pid);
                await firebaseDB.collection("users").doc(uid).set(document);
            }
            togglemodal();
        }catch(err){

        }
    }

    let useStyles = makeStyles({
        flex : {
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"left",
        },
        margin: { 
            marginBottom : "20px",
        },
        card : {
            width : "500px",
        },
        cross : {
            marginLeft:"475px"
        },
        submit : {
            marginLeft:"277px"
        },
        caption : {
            marginRight:"277px"
        }
    })
 
    let classes = useStyles();

    return ( 
        <>
        {modal ? 
        <div className="container">
            <Card className={classes.flex , classes.margin , classes.card}>
                <ClearIcon onClick={togglemodal} className={classes.cross}></ClearIcon>
                <CardContent>
                    <Typography variant="h5">Share a memory !!!!</Typography>
                </CardContent>
                <CardActions className={classes.flex}>
                    <input type="file" accept="image/*" id="uploadfile" onChange={(e) => {handleinputvideo(e)}} className={classes.margin}/>
                    <TextField id="standard-basic" label="Add a Caption" id="standard-full-width" fullWidth className={classes.margin} value={caption} onChange={ (e) => {setCaption(e.target.value)}}/>
                    <Button onClick={handleuploadvideo} variant="contained" color="primary" className={classes.margin} startIcon={<PhotoCamera></PhotoCamera>}>Upload post</Button>
                </CardActions>
            </Card>
        </div> : <></>}
        </>
    );
}
 
export default Upload;