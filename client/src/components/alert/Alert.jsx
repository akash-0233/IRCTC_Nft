import React from 'react';
import "./Alert.css";

export default function Alert(props) {
    return (
        props.alert && (
            <div className={`alert alert-${props.alert.type}`}  >
                <strong>{props.alert.type.toUpperCase()} </strong> {props.alert.msg}
            </div>
        )
    );
}
