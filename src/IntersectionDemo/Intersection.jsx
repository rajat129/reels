import React, { useEffect } from 'react';
import v1 from './vid1.mp4';
import v2 from './vid2.mp4';
import v3 from './vid3.mp4';
import v4 from './vid4.mp4';
import './inter.css';

const Intersection = () => {

    let conditionobj = {
        root:null,
        threshold : "0.9",
    };

    function cb(entries){
        console.log(entries);
        // entries.forEach(entry => {
        //     let child = entry.target.children[0];

        //     child.play().then(function(){
        //         if(child.isIntersecting == false){
        //             child.pause();
        //         }
        //     })
        // })
    }

    useEffect(() => {

        let observerobj = new IntersectionObserver(cb, conditionobj);
        let elem = document.querySelectorAll(".video-div");

        elem.forEach((el) => {
            observerobj.observe(el);
        });
    }, []);

    return ( <div>

        <Vidtag src={v1}></Vidtag>
        <Vidtag src={v2}></Vidtag>
        <Vidtag src={v3}></Vidtag>
        <Vidtag src={v4}></Vidtag>

    </div> );
}
 
function Vidtag(props){

return (<div className="video-div">
    <video controls muted={true} className="video-tag">
        <source src={props.src} type="video/mp4"/>
    </video>
</div>
);
}

export default Intersection;