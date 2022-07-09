import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css"


export default function LandingPage(){
    return(
        <div className={s.total}>
        <div className={s.body}>
            <h1 className={s.h1}>Dogs</h1>
            <Link to = "/home">
                <button>Ingresar</button>
            </Link>
        </div>
        </div>
    )
}