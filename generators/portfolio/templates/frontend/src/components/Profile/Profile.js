import React from 'react'
import Typewriter from 'typewriter-effect';
import FeatherIcon from "feather-icons-react";

function Profile() {
    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <img className="m-3" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg" alt="" style={{borderRadius:"50%",backgroundColor:"black",width:"200px",height:"200px"}} />
            <h2 className="my-2">Hey, I am Anjali.</h2>
            <h2 className="my-2">
            <Typewriter
                options={{
                    strings: ['Programmer', 'Student', 'Developer'],
                    autoStart: true,
                    loop: true,
                }}
            />
            </h2>
            <h2>
                <a href="https://www.twitter.com" className="social_icons" target="_blank">
                    <FeatherIcon className="user__icon p-1" icon="twitter"/>
                </a>
            <a href="https://www.linkedin.com" className="social_icons" target="_blank">
                <FeatherIcon className="user__icon p-1" icon="linkedin"/>
            </a>

            <a href="https://www.github.com" className="social_icons" target="_blank">
                <FeatherIcon className="user__icon p-1" icon="github"/>
            </a>

            <a href="https://www.facebook.com" className="social_icons" target="_blank">
                <FeatherIcon className="user__icon p-1" icon="facebook"/>
            </a>

            <a href="https://www.instagram.com" className="social_icons" target="_blank">
                <FeatherIcon className="user__icon p-1" icon="instagram"/>
            </a>
            </h2>
        </div>
    )
}

export default Profile
