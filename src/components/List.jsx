import React, { useCallback } from 'react';
import "../App.css";

export const List = ({ url, name, ds, checked, onChange, link, onUpdateLink }) => {
    const addCustomLink = useCallback(() => {
        const newLink = prompt("Введите вашу ссылку:", link);
        if (newLink) {
            onUpdateLink(newLink);
        }
    }, [link, onUpdateLink]);

    return (
        <div className={"list"}>
            <img alt={"ssdsdf"} src={url}/>
            <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "center"
            }}>
                <a href={link}>  <h2>{name}</h2></a>
                <img onClick={addCustomLink} className={"link"} alt={"link"} src={"./assets/link.png"}/>
            </div>
            <p>{ds}</p>
            <label className="container">
                <input
                    type={"checkbox"}
                    checked={checked}
                    onChange={onChange}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

