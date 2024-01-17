export const postJoke = async (currentState) => {
  const newJoke = { text: currentState, told: false };
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJoke),
  };

  const response = await fetch("http://localhost:8088/jokes", postOptions);
};

export const getAllJokes = async () => {
  const jokes = await fetch("http://localhost:8088/jokes").then((res) =>
    res.json()
  );
  return jokes;
};

const result = await getAllJokes();

console.log(result);

export const editJoke = async (joke) => {
  let editedJoke = {
    id: joke.id,
    text: joke.text,
    told: !joke.told,
  };
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editedJoke),
  };
  const response = await fetch(
    `http://localhost:8088/jokes/${joke.id}`,
    putOptions
  );
};

export const deleteJoke = async (joke) => {
  const deleteOptions = {
    method: "DELETE",
  };
  const response = await fetch(
    `http://localhost:8088/jokes/${joke.id}`,
    deleteOptions
  );
};
