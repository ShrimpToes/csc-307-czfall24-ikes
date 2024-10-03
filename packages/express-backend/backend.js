import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "James",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const findUsersByNameAndJob = (name, job) => {
    console.log(`${name}, ${job}`)
    console.log(users["users_list"])
    return users["users_list"].filter((user) => (user["name"] === name) && (user["job"] === job));
}

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

const delUser = (id) => {
    users["users_list"] = users["users_list"].filter((user) => user.id !== id);
}

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    }
    else {
        res.send(result);
    }
});

app.get("/users/:name/:job", (req, res) => {
   const name = req.params["name"];
   const job = req.params["job"];
   res.send(findUsersByNameAndJob(name, job));
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    res.send(addUser(userToAdd));
});

app.delete("/users/:id", (req, res) => {
    delUser(req.params["id"]);
    res.status(200).send();
});

app.listen (port, () => {
    console.log(
        "listening at http://localhost:" + port
    );
});
