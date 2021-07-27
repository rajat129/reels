import React, { useEffect, useState ,useContext } from 'react';
import { firebaseDB } from '../Config/firebase';
import {Container, Card, Avatar, Typography, TextField ,Button, makeStyles} from '@material-ui/core';
import { AuthContext } from '../App';
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const Videopost = (props) => {

    let [username,setuser] = useState(null);
    let [commentList,setcommentList] = useState([]);
    let [comment,setComment] = useState(null);
    let {user} = useContext(AuthContext);
    let [isLiked , setisLiked] = useState(false);
    let [likesCount,setlikesCount] = useState(0);

    useEffect(async () => {
        let uid = props.postObj.uid;
        let doc = await firebaseDB.collection("users").doc(uid).get()
        let user = doc.data();
        setuser(user);

        let commentlist = props.postObj.comments;
        let updatedList = [];

        for(let i=0;i<commentlist.length;i++){
            let doc = await firebaseDB.collection("users").doc(commentlist[i].uid).get();
            let profileimg = doc.data().profileimageurl;
            updatedList.push({profilePic : profileimg , comment : commentlist[i].comment});
        }

        // console.log(updatedList);
        setcommentList(updatedList);
        // console.log(props.postObj.likes , user.userid);
        if(props.postObj.likes.includes(user.userid)){
            console.log("here");
            setisLiked(true);
            setlikesCount(props.postObj.likes.length-1);
        }else{
            setlikesCount(props.postObj.likes.length);
        }
        

    } , [])

    const addComment = async (e) => {
        console.log(commentList.length);
        if(commentList.length==4){
            return;
        }

        let doc = await firebaseDB.collection("users").doc(user.uid).get();
        let profilepic = doc.data().profileimageurl;

        let updatedcommentlist = [...commentList , {profilePic : profilepic , comment : comment}];
        props.postObj.comments.push({uid : user.uid , comment : comment});
        await firebaseDB.collection("posts").doc(props.postObj.pid).set(props.postObj);
        setcommentList(updatedcommentlist);
        setComment("");
    }

    const togglelike = async () => {
        if(isLiked){
            let updatedlikes = props.postObj.likes.filter(uid => {
                if(uid==user.uid){
                    return false;
                }else{
                    return true;
                }
            })
            props.postObj.likes = updatedlikes;
            // console.log(props.postObj,user);
            await firebaseDB.collection("posts").doc(props.postObj.pid).set(props.postObj);
            setisLiked(false);
            // setlikesCount(likesCount-1);
        }else{

            props.postObj.likes.push(user.uid);
            // console.log(props.postObj);
            await firebaseDB.collection("posts").doc(props.postObj.pid).set(props.postObj);
            setisLiked(true);
            
            
        }
    }

    let useStyles = makeStyles({
        card : {
            marginTop:"20px",
            marginLeft : "100px",
            height : "550px",
            width: "600px"
        },
        header : {
            display:"flex",
            margin : "10px",
            alignItems:"center",
        },
        name : {
            fontWeight : "bold",
            marginLeft : "5px",
        },
        post : {
            marginLeft : "10px",
            display : "flex"
        }
    })

    let classes = useStyles();

    return ( 
        <Container>
            <Card className={classes.card}>
                <div className={classes.header}>
                    <Avatar src={username ? username.profileimageurl : ""}></Avatar>
                    <Typography className={classes.name}>{username ? username.username : ""}</Typography>
                </div>
                <div className={classes.post}>
                    <div>
                        <Vidtag src={props.src} uid={props.postObj.uid}></Vidtag>
                        <Typography>{props.postObj.caption}</Typography>
                        {isLiked ? <Favorite style={{color: "red"}} onClick={togglelike}></Favorite> : <FavoriteBorder onClick={togglelike}></FavoriteBorder>}
                        {likesCount!=0 ? (
                            <Typography variant="p">Liked by {likesCount} others </Typography>
                        ) : <></>}
                        <br></br>
                        <TextField label="Add a Comment ... " type="text" size="small" value={comment} onChange={(e) => {setComment(e.target.value)}}></TextField>
                        <Button color="primary" onClick={addComment} size="small" style={{marginTop:"15px" , fontWeight:"bold"}}>Post</Button>
                    </div>
                    <div style={{backgroundColor:"whitesmoke" ,width:"225px" , height : "400px",marginLeft : "10px"}}>
                        <h3 style={{marginLeft:"15px",marginTop:"15px"}}>All Comments !!!</h3>
                        {commentList.length==0 ? 
                            <div style={{marginTop:"150px" , marginLeft:"15px"}}>No comments to show !!!!</div> 
                            : 
                            commentList.map((commentObj) => {
                            return <div style={{marginTop:"5px" ,marginLeft:"15px"}}>
                                <Avatar src={commentObj.profilePic}></Avatar>
                                <Typography>{commentObj.comment}</Typography>
                            </div>
                        })}
                    </div>
                </div>


                
                
            </Card>
        </Container>
     );
}

function Vidtag(props){

    return (<div className="video-div" key={props.uid}>
        <img src={props.src} style={{height : "300px" , width : "350px" , objectFit : "contain"}} className="video-tag">
        </img>
    </div>
    );
}
 
export default Videopost;