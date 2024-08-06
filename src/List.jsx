
export const List = ({url, name, ds}) => {
    return (
        <div className={"list"}>
            <img alt={"ssdsdf"} src={url}/>
            <h2>{name}</h2>
            <p>{ds}</p>
            <input type={"checkbox"}/>
        </div>
    )
}