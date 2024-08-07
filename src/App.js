import React, { useState, useEffect } from 'react';
import "./App.css";
import { List } from "./components/List";

function App() {
    const [lists, setLists] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [newList, setNewList] = useState({ name: "", url: "", ds: "", link: "" });

    useEffect(() => {
        const savedLists =
            JSON.parse(localStorage.getItem("lists")) || [
                { name: "Backloggd", url: "./assets/bl.jpg", ds: "Список игр", checked: false, link: "https://backloggd.com/" },
                { name: "AniList", url: "./assets/al.png", ds: "Список аним и манг", checked: false, link: "https://anilist.co/" },
                { name: "Letterboxd", url: "./assets/lb.png", ds: "Список фильмов сериалов", checked: false, link: "https://letterboxd.com/" },
                { name: "Hardcover", url: "./assets/hc.png", ds: "Список книг", checked: false, link: "https://hardcover.app/" },
                { name: "Serializd", url: "./assets/sl.jpg", ds: "Список сериалов шоу", checked: false, link: "https://www.serializd.com/" },
                { name: "Rate Your Music", url: "./assets/rym.jpg", ds: "Список музыки", checked: false, link: "https://rateyourmusic.com/" },
                { name: "Кинориум", url: "./assets/kr.jpg", ds: "Ещё один список фильмов", checked: false, link: "https://ru.kinorium.com/" },
                { name: "Shikimori", url: "./assets/sh.png", ds: "Энциклопедия аниме и манги", checked: false, link: "https://shikimori.one/?utm_source=homescreen" },
                { name: "Mangalib", url: "./assets/ml.png", ds: "База манги", checked: false, link: "https://mangalib.me/" },
            ];
        const savedSortOption = localStorage.getItem("sortOption") || "default";
        setLists(savedLists);
        setSortOption(savedSortOption);
    }, []);

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(lists));
    }, [lists]);

    useEffect(() => {
        localStorage.setItem("sortOption", sortOption);
    }, [sortOption]);

    const handleCheckboxChange = (index) => {
        setLists((prevLists) => {
            const newLists = [...prevLists];
            newLists[index].checked = !newLists[index].checked;
            return newLists;
        });
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleUpdateLink = (index, newLink) => {
        setLists((prevLists) => {
            const newLists = [...prevLists];
            newLists[index].link = newLink;
            return newLists;
        });
    };

    const sortLists = () => {
        let sortedLists = [...lists];
        if (sortOption === "checked") {
            sortedLists = sortedLists.filter((list) => list.checked);
        }
        return sortedLists;
    };


    const handleCloseModal = () => {
        setNewList({ name: "", url: "", ds: "", link: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewList((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewList = () => {
        setLists((prevLists) => [...prevLists, { ...newList, checked: false }]);
        handleCloseModal();
    };

    const sortedLists = sortLists();

    return (
        <div className={"app"}>
            <h2>List of Lists</h2>
            {(
                <div className="modal">
                    <div className="modal-content">
                        <h3>Добавить новый список</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название"
                            value={newList.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="url"
                            placeholder="URL изображения"
                            value={newList.url}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="ds"
                            placeholder="Описание"
                            value={newList.ds}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="link"
                            placeholder="Ссылка"
                            value={newList.link}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleAddNewList}>Добавить</button>
                        <button onClick={handleCloseModal}>Отмена</button>
                    </div>
                </div>
            )}
            <div>

                <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                    <option value="default">Все</option>
                    <option value="checked">Только избранные</option>
                </select>
            </div>
            <div className={"listOfLists"}>
                {sortedLists.length > 0 ? (
                    sortedLists.map((list) => (
                        <List
                            key={list.name}
                            name={list.name}
                            url={list.url}
                            ds={list.ds}
                            checked={list.checked}
                            onChange={() => handleCheckboxChange(lists.findIndex(item => item.name === list.name))}
                            link={list.link}
                            onUpdateLink={(newLink) => handleUpdateLink(lists.findIndex(item => item.name === list.name), newLink)}
                        />
                    ))
                ) : (
                    <p>Избранных списков нет</p>
                )}
            </div>
            <p>Ждите обновления!</p>


        </div>
    );
}

export default App;