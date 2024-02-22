import { useState } from "react";
import "../../home.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        setShows(data);
      });
  };

  return (
    <>
      <header>
        <h1>My TV Channels 📺</h1>
      </header>

      <form>
        <label htmlFor="query">What are you looking for ?</label>
        <input
          value={query}
          onChange={handleChange}
          type="text"
          name="query"
          id="query"
        />
        <button
          type="submit"
          onClick={handleClick}
        >
          🔎
        </button>
      </form>

      <main>
        <section className="showList">
          {shows.length > 0
            ? shows.map((show, index) => {
                return (
                  <article
                    className="article"
                    key={index}
                  >
                    <img
                      src={show.show.image && show.show.image.original}
                      alt="cover of the show"
                    />
                    <div>
                      <h2>{show.show.name}</h2>
                      <p>{show.show.language && show.show.language}</p>
                    </div>
                    <Link to={`show/${show.show.id}`}>View show page</Link>
                  </article>
                );
              })
            : "⬆️ You are just at one search from you next favorite TV show ! ⬆️"}
        </section>
      </main>
    </>
  );
}
