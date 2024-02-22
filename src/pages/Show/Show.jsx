import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../show.css";

export default function Show() {
  let { id } = useParams();

  const [show, setShow] = useState();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        if (response.ok) return response.json();
        else {
          alert("No match");
        }
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
        <div className="text">
          <h2>{show.name}</h2>
          <p>{show.language}</p>
          <p>{show.summary.slice(4, -4)}</p>

          <Link
            to={show.officialSite}
            target="_blank"
          >
            Visit the official website for this show
          </Link>
        </div>

        <Link to="/">Homepage</Link>
      </>
    );
  } else {
    return (
      <>
        <p>"chargement..."</p>
        <Link to="/">Homepage</Link>
      </>
    );
  }
}
