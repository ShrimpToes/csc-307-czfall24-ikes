import React, {useEffect, useState} from "react";
import Table from "./Table";
import Form from "./Form";

function fetchUsers() {
    return fetch("http://localhost:8000/users");
}

function postUser(person) {
    return fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
    });
}

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => console.log(error));
    }, []);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    function updateList(person) {
        postUser(person)
            .then((res) => (res.status === 201) ? res.json() : res.error())
            .then((json) => setCharacters([...characters, json]))
            .catch((error) => console.log(error));
    }

    // form -> person -> characters -> Table.jsx
    return (
        <div className="container">
            <Table 
                characterData={characters}
                removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList}/>
        </div>
    );
}

export default MyApp;

