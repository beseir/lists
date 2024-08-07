import React, { useState, useEffect, useCallback } from 'react';
import "./App.css";

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

function App() {
    const [lists, setLists] = useState([]);
    const [sortOption, setSortOption] = useState("default");

    useEffect(() => {
        const savedLists = JSON.parse(localStorage.getItem('lists')) || [
            { name: "Backloggd", url: "./assets/bl.jpg", ds: "Список игр", checked: false, link:"https://backloggd.com/" },
            { name: "AniList", url: "./assets/al.png", ds: "Список аним и манг", checked: false, link:"https://anilist.co/" },
            { name: "Letterboxd", url: "./assets/lb.png", ds: "Список фильмов сериалов", checked: false, link:"https://letterboxd.com/" },
            { name: "Hardcover", url: "./assets/hc.png", ds: "Список книг", checked: false, link:"https://hardcover.app/" },
            { name: "Serializd", url: "./assets/sl.jpg", ds: "Список сериалов шоу", checked: false, link:"https://www.serializd.com/" },
            { name: "Rate Your Music", url: "./assets/rym.jpg", ds: "Список музыки", checked: false, link:"https://rateyourmusic.com/" },
            { name: "Кинориум", url: "./assets/kr.jpg", ds: "Ещё один список фильмов", checked: false, link:"https://ru.kinorium.com/" },
            { name: "Shikimori", url: "./assets/sh.png", ds: "Энциклопедия аниме и манги", checked: false, link:"https://shikimori.one/?utm_source=homescreen" },
            { name: "Mangalib", url: "./assets/ml.png", ds: "База манги", checked: false, link:"https://mangalib.me/" },
        ];
        const savedSortOption = localStorage.getItem('sortOption') || "default";
        setLists(savedLists);
        setSortOption(savedSortOption);
    }, []);

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

    useEffect(() => {
        localStorage.setItem('sortOption', sortOption);
    }, [sortOption]);

    const handleCheckboxChange = (index) => {
        const newLists = [...lists];
        newLists[index].checked = !newLists[index].checked;
        setLists(newLists);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleUpdateLink = (index, newLink) => {
        const newLists = [...lists];
        newLists[index].link = newLink;
        setLists(newLists);
    };

    const sortLists = (lists) => {
        const sortedLists = [...lists];
        switch (sortOption) {
            case "checked":
                return sortedLists.filter(list => list.checked);
            case "unchecked":
                return sortedLists.filter(list => !list.checked);
            case "name":
                return sortedLists.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sortedLists;
        }
    };

    return (
        <div className={"app"}>
            <h2>List of Lists</h2>
            <div>
                <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                    <option value="default">Все</option>
                    <option value="checked">Только избранные</option>
                    <option value="name">По алфавиту</option>
                </select>
            </div>
            <div className={"listOfLists"}>
                {sortLists(lists).map((list, index) => (
                    <List
                        key={index}
                        name={list.name}
                        url={list.url}
                        ds={list.ds}
                        checked={list.checked}
                        onChange={() => handleCheckboxChange(index)}
                        link={list.link}
                        onUpdateLink={(newLink) => handleUpdateLink(index, newLink)}
                    />
                ))}
            </div>
            <p>Ждите обновления!</p>
        </div>
    );
}

export default App;