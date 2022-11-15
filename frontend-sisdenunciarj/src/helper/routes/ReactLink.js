import * as React from "react";
import {Navigate} from "react-router-dom";
import {useState} from "react";

export default function ReactLink(props) {
    const [navigate, setNavigate] = useState(<span/>);
    return (
    <div style={{cursor: "pointer"}}
                onClick={() => setNavigate(<Navigate to={props.to}/>)}>
        {navigate}
        {props.children}
    </div>
    );
}