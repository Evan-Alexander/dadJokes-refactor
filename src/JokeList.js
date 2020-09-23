import React, { useState, useEffect } from 'react'
import './JokeList.css';
import Joke from './Joke';
import axios from 'axios';

const url = 'https://icanhazdadjoke.com/'
function JokeList() {
  const jokesToGet = 10;
  const [jokes, setJokes] = useState([]);
  const [seenJokes, setSeenJokes] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      let jokes = [];
      while(jokes.length < jokesToGet) {
        const response = await axios.get(url,{ headers: {Accept: "application/json"}})
        jokes.push({ id: response.data.id, text: response.data.joke, votes: 0});
      }
      setJokes(jokes);
      window.localStorage.setItem("jokes", JSON.stringify(jokes));
    }
    // return request;
    fetchData()
  }, [])

  const handleVotes = (id, delta) => {
    const votedJokes = [...jokes].map(j => j.id === id ? {...j, votes: j.votes + delta } : j)
    setJokes(votedJokes)
  }
  const handleClick = (jokes) => {
    setSeenJokes(jokes);
    console.log('clicked');
  }
  return (
    <div className="jokeList">
      <div className="jokeList__sidebar">
      <h1 className='jokeList__title'>
            <span>Dad</span> Jokes
          </h1>
        <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="joke icon"/>
        <button onClick={() => handleClick(jokes)} className="jokeList__getmore">New Jokes</button>
      </div>

      <div className="jokeList__jokes">
        {jokes && jokes.map((j) => (
          <Joke 
            key={j.id} 
            votes={j.votes} 
            text={j.text} 
            upvote={() => handleVotes(j.id, 1)}
            downvote={() => handleVotes(j.id, -1)}
          />
        ))}
      </div>
    </div>
  )
}

export default JokeList
