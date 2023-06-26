import React from "react";

import style from "./About.module.css"
import iconoClose from "../Assets/IconoClose.jpg"
import { Link } from "react-router-dom";

export default function About (){
    return(
        <div className={style.textContainer}>
            <div>
                <Link to='/Home'><img src={iconoClose} alt="close" width='35px' height='35px'/></Link>
            </div>

            <h1 className={style.title}>About Us</h1>

            <div>
                <p className={style.text}>
                My name is Sara Marulanda.
                </p>

                <p className={style.text}>
                    I created this page from an api that has more than 500,000 video games, so that people who enjoy them can consult, access, learn and update themselves on the popular ones of the moment and of course create their own.
                    </p>

                    <p className={style.text}>
                        It started as a project to finish one of my Bootcam labs, but spending so much time building something makes you want to see it give more.
                    </p>

                    <p className={style.text}> 
                        I hope you enjoy browsing and get good results.
                    </p>

                    <p className={style.text}>
                    You can contact me at saramarulanda12@gmail.com and leave me your suggestions.
                    </p>

                    <p className={style.text}>
                    It is a website created for you and we can always improve it together
                    </p>
            </div>

        </div>
    )
}