import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../show.css";

export default function Show() {
  let { id } = useParams();

  const [show, setShow] = useState();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        setShow(data);
      });
  }, [id]);

  if (show) {
    return (
      <>
        <img
          src={show.image.original}
          alt="cover of the show"
        />
        <div>
          <h2>{show.name}</h2>
          <p>{show.language}</p>
        </div>

        <Link to="/">Accueil</Link>
      </>
    );
  } else {
    return "chargement...";
  }
}
