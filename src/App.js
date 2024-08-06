import "./App.css"
import {List} from "./List.jsx";

function App() {
  return (
      <div className={"app"}>
        <h2>Список списков</h2>
        <List name={"Backloggd"} url={"./assets/bl.jpg"} ds={"Список игр"}/>
        <List name={"AniList"} url={"./assets/al.png"} ds={"Список аним и манг"}/>
        <List name={"Letterboxd"} url={"./assets/lb.png"} ds={"Список фильмов сериалов"}/>
        <List name={"Hardcover"} url={"./assets/hc.png"} ds={"Список книг"}/>
        <List name={"Serializd"} url={"./assets/sl.jpg"} ds={"Список сериалов шоу"}/>
        <List name={"Rate Your Music"} url={"./assets/rym.jpg"} ds={"Список музыки"}/>
        <List name={"Кинориум"} url={"./assets/kr.jpg"} ds={"Ещё один список фильмов"}/>
        <p>Ждите обновления!</p>
      </div>
  )
}

export default App
