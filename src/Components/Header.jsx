import React, { useContext, useEffect ,useState} from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { Avatar, CardMedia ,Button ,makeStyles, Menu, MenuItem } from '@material-ui/core';
import logo from '../Logo.png';
import AddIcon from '@material-ui/icons/Add';
import { AuthContext } from '../App';
import { firebaseDB } from '../Config/firebase';
import {Link} from 'react-router-dom';

const Header = (props) => {

    let useStyles = makeStyles({
        flex : {
            display : "flex",
            justifyContent : "space-evenly",
            alignItems : "center"
        },
        margin : {
            marginRight: "15px"
        }
    })

    let classes = useStyles();
    let [username,setusername] = useState(null)
    let {signout,user} = useContext(AuthContext);

    useEffect(async () => {
        console.log("here");

        let uid = user.uid;
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let temp = doc.data();
        console.log(temp);
        setusername(temp);
    } , []);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlesignout = async () => {
        await signout();
        props.props.history.push("/login");
    }

    return ( 
    <div className="header" className={classes.flex}>
        <div className="left" >
            <CardMedia image={logo} style={{height:"50px" , width:"150px"}}></CardMedia>
        </div>
        <div className="right" className={classes.flex}>
            <Link to="/">
                <HomeIcon className={classes.margin} style={{fontSize:"35px" , color :"black"}}></HomeIcon>
            </Link>
            {props ?<AddIcon className={classes.margin} style={{fontSize:"35px"}} onClick={props.togglemodal}></AddIcon> : <></>}
            <Avatar src={username ? username.profileimageurl : ""} className={classes.margin} onClick={handleClick}></Avatar>
            <Menu id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
                <MenuItem >
                    <Link to="/profile" style={{color:"black" , textDecoration:"none"}}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handlesignout}>signout</MenuItem>
            </Menu>
        </div>
    </div>
    );
}
 
export default Header;