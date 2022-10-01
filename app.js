const express = require("express");

const app = express();

//! Habilita el recibir datos en formato JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Server OK!",
    all: "http://127.0.0.1:9000/todos/"
  });
});

const database = [
  {
    id: 1,
    title: "Este es un asdkfjbsdljkfb",
    is_completed: false,
    url: "http://127.0.0.1:9000/todos/1"
  },
  {
    id: 2,
    title: "Este es otro titulo",
    is_completed: false,
    url: "http://127.0.0.1:9000/todos/2"
  },
];

// GET INITIAL INDEX /todos
app.get("/todos", (req, res) => {
  res.status(200).json({
    pageInitial: "http://127.0.0.1:9000/",
    database,
  });
});


// to USE PARAMS
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id)

  const data = database.filter(todo => todo.id === id)

  {
    !data[0] ?
    res.status(404).json({
      all: "http://127.0.0.1:9000/todos", 
      my_id: id, message: "ID does not exist"})
    : 
    res.status(200).json({
      all: "http://127.0.0.1:9000/todos",
      my_id: id, data: data[0]})
  }
})


app.post("/todos", (req, res) => {
  
  //? req = request = Petición
  //? res = response = Respuesta

  const { id, title } = req.body;

  //* valores falsy
  //? null
  //? undefined
  //? ''
  //? 0
  //? false

  //* valores truty
  //? 'skdjfbskdjf'
  //? 1
  //? {}
  //? []
  //? true

  if (!id && !title) {
    res.status(400).json({ message: "Missing Data" });
  } else {

    database.push({
      id,
      title,
      is_completed: false,
    });
    res.status(200).json(database);
  }
});


//SERVER LISTEN

const PORT = 9000
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});