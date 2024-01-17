import { useEffect, useState } from "react";
import "./App.css";
import {
  postJoke,
  getAllJokes,
  editJoke,
  deleteJoke,
} from "./services/jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  let [currentJokeInput, updateState] = useState([]);
  let [allJokes, setAllJokes] = useState([]);
  let [untoldJokes, setUntoldJokes] = useState([]);
  let [toldJokes, setToldJokes] = useState([]);

  const compileJokes = () => {
    getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr);
    });
  };

  useEffect(() => {
    compileJokes();
    console.log("jokes set :)");
  }, [currentJokeInput]);

  useEffect(() => {
    let untoldJokeArray = [];
    let toldJokeArray = [];
    allJokes.map((joke) => {
      if (joke.told === false) {
        untoldJokeArray.push(joke);
      } else {
        toldJokeArray.push(joke);
      }
    });
    setUntoldJokes(untoldJokeArray);
    setToldJokes(toldJokeArray);
  }, [allJokes]);

  return (
    <div className="app-container">
      <header className="app-heading ">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </header>
      <section>
        <h2>Add Joke</h2>
        <br></br>
        <div className="joke-add-form">
          <input
            className="joke-input joke-input:focus::placeholder"
            type="text"
            placeholder="New One Liner"
            value={currentJokeInput}
            onChange={(event) => {
              console.log(event); // What's the value of event?
              updateState(event.target.value);
            }}
          />
          <button
            className="joke-input-submit joke-input-submit:hover joke-input-submit:active"
            id="add"
            onClick={() => {
              postJoke(currentJokeInput);
              currentJokeInput = "";
              updateState(currentJokeInput);
            }}
          >
            Add
          </button>
        </div>
      </section>
      <section className="joke-lists-container">
        <section className="joke-list-container">
          <h2>
            <i className="fa-regular fa-face-meh"></i>
            Untold
            <span className="told-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div
                    className="joke-list-action-delete"
                    onClick={() => {
                      deleteJoke(joke);
                      compileJokes();
                    }}
                  >
                    <i className="fa-regular fa-trash-can joke-list-action-delete"></i>
                  </div>
                  <div
                    className="joke-list-action-toggle"
                    onClick={() => {
                      editJoke(joke);
                      compileJokes();
                    }}
                  >
                    <i
                      className="fa-regular fa-face-laugh-beam"
                      data-told={joke.told}
                      data-id={joke.id}
                      data-text={joke.text}
                    ></i>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="joke-list-container">
          <h2>
            <i className="fa-regular fa-face-laugh-beam"></i>
            Told
            <span className="untold-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div
                    className="joke-list-action-delete"
                    onClick={() => {
                      deleteJoke(joke);
                      compileJokes();
                    }}
                  >
                    <i className="fa-regular fa-trash-can "></i>
                  </div>
                  <div
                    className="joke-list-action-toggle"
                    onClick={() => {
                      editJoke(joke);
                      compileJokes();
                    }}
                  >
                    <i
                      className="fa-regular fa-face-meh"
                      data-told={joke.told}
                      data-id={joke.id}
                      data-text={joke.text}
                    ></i>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </div>
  );
};
