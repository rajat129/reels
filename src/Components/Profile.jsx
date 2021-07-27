import { Avatar, Button, makeStyles, Typography,Card } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useContext, useEffect,useState } from 'react';
import { AuthContext } from '../App';
import { firebaseDB } from '../Config/firebase';
import Header from './Header';

const Profile = () => {
    
    let {user} = useContext(AuthContext);
    let [userData,setUserData] = useState(null);
    let [posts,setPosts] = useState([]);

    let useStyle = makeStyles({
        large : {
            width: "150px",
            height: "150px",
        },
        head : {
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            width : "100vw",
            marginTop: "50px"
        },
        single : {
            width : "50%",
            // alignItems : "center",
            marginLeft : "170px"
        },
        right : {
            width : "50%"
        },
        posts: { 
            display : "flex",
            marginTop:"50px",
            justifyContent : "center" , 
            AlignItems: "center"
        }
    })

    let classes = useStyle();

    useEffect(async () => {
        let uid = user.uid;
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let data = doc.data();
        setUserData(data);
        
        let postbyuser =  data.postsCreated.map(async (pid) => {
            let doc = await firebaseDB.collection("posts").doc(pid).get();
            let x = await doc.data()
            return x;
        })
        let ans =  await Promise.all(postbyuser)
        setPosts(ans);    

    },[])

    return ( 
    <div>
        <Header></Header>
        <div className="head" className={classes.head}>
            <div className="left" className={classes.single}>
                <Avatar src={userData ? userData.profileimageurl : ""} className={classes.large}></Avatar>
            </div>
            <div className="right" className={classes.right}>
                <h1>{userData ? userData.username : ""}</h1>
                <h2>{userData ? userData.postsCreated.length : ""}  posts</h2>
                <Button variant="outlined" color="secondary" style={{marginTop:"10px"}}>Edit Profile</Button>
            </div>
        </div>
        <div className="posts" className={classes.posts}>
            
            {posts.map((post) => {
                return  (<div>
                    <Card style={{height:"300px" , width:"300px" , margin:"50px"}}>
                        <img src={post.videourl} style={{objectFit : "contain" ,height : "250px" , width:"290px",marginLeft:"5px"}}></img>
                        <Typography style={{marginLeft:"5px"}}>{post.caption}</Typography>
                    </Card>
                </div>)
            })}
        </div>
    </div>
    );
}
 
export default Profile;