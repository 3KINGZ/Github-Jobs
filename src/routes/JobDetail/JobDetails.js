import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import moment from "moment";
import globe from "../../images/google-earth.svg";
import time from "../../images/watch.svg";
import back from "../../images/left-arrow.svg";
import "../../App.js";
import "./JobDetail.css";

function JobDetail({ match }) {
  const [job, setJob] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getJob();
    // eslint-disable-next-line
  }, []);

  function getJob() {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/${match.params.id}.json`
    )
      .then((res) => res.json())
      .then((json) => {
        setJob(json);
      })
      .catch((e) => {
        setError("an occurred while trying to fetch jobs");
      });
  }

  console.log(job);

  return (
    <div className="main-container">
      <Header />
      <div>
        {error ? (
          <h2>An errror occurred while fetching job</h2>
        ) : !job ? (
          <Loading />
        ) : (
          <div className="main-content-container-details">
            <div className="bold">
              <div>
                <Link
                  to={`/${job.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#4b5788",
                    cursor: "hover",
                  }}
                >
                  <img src={back} alt="back-arrow" className="jb-icon" />
                  Back to search
                </Link>
              </div>
              <div className="how-to-apply">
                <h4 className="fade">How to apply</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
                  style={{
                    maxWidth: "2px",
                    display: "block",
                  }}
                />
              </div>
            </div>
            <div>
              <header>
                <h1>
                  {job.title} <span className="job-type-text">{job.type}</span>
                </h1>
                <div className="flexxx">
                  <img src={time} alt="clock" className="jb-icon" />
                  <div className="fade">{moment(job.created_at).fromNow()}</div>
                </div>
              </header>
              <div className="flexxx space-up">
                <div className="company-image-container">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company + " logo"}
                      className="company-image"
                    />
                  ) : (
                    <div className="not-found">not found</div>
                  )}
                </div>
                <div>
                  <h3>{job.company}</h3>
                  <div className="fade">
                    <img src={globe} alt="globe" className="jb-icon" />{" "}
                    {job.location}
                  </div>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: job.description }}
                className="description"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
