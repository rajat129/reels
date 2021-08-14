import React, { Component, useContext, useState ,useEffect} from 'react';
import { AuthContext } from '../App';
import { firebaseStorage ,firebaseDB, timeStamp} from '../Config/firebase';
import Videopost from './Videopost';
import Header from './Header'; 
import Upload from './Upload';

const Feeds = (props) => {   

    let {signout} = useContext(AuthContext);
    
    const [posts,setposts] = useState([]);
    let user = useContext(AuthContext);
    const [modal,setmodal] = useState(false);

    const togglemodal = () => {
        setmodal(!modal);
    }

   

    useEffect(() => {
        firebaseDB.collection("posts").orderBy("createdAt", "desc").get().then((snapshots) => {
            let allposts = snapshots.docs.map((post) => {
                return post.data();
            })
            setposts(allposts);
            console.log(allposts,"all posts");
        });
    },[]);

    return ( 
    <div>

        <Header props={props} togglemodal={togglemodal}></Header>

        {/* <div className="upload-video">
            <input type="file" onClick={handleinputvideo}/>
            <label>
                <Button onClick={handleuploadvideo} variant="contained" color="secondary" startIcon={<PhotoCamera></PhotoCamera>}>Upload</Button>
            </label>
        </div> */}
        <Upload modal={modal} togglemodal={togglemodal} ></Upload>
        {!modal ? <div>
           { posts.map((post) => {
               return <Videopost src={post.videourl} postObj={post}></Videopost>
            }) } 
            
        </div> : <></>}
        

    </div> );
}
 
export default Feeds;