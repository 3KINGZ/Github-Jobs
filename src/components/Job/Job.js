import React from "react";
import { Link } from "react-router-dom";
import { ApiData } from "../../routes/HomePage/HomePage";
import globe from "../../images/google-earth.svg";
import time from "../../images/watch.svg";
import moment from "moment";
import "./Job.css";

function Job() {
  const job = React.useContext(ApiData);

  return (
    <div className="job">
      <div>
        <div className="job-image-container">
          {job.company_logo ? (
            <img src={job.company_logo} alt={job.company + " logo"} />
          ) : (
            <div className="not-found">not found</div>
          )}
        </div>
      </div>
      <div>
        <div>
          <h4 style={{ marginTop: "6%" }}>
            <Link
              to={`/${job.id}`}
              style={{ color: "#4b5788", cursor: "hover" }}
            >
              {job.company}
            </Link>
          </h4>
        </div>
        <h3 className="jb-title">{job.title}</h3>
        <div className="job-type">
          <div className="job-type-texxt">{job.type}</div>
          <div className="job-time-location">
            <div>
              <img
                src={globe}
                alt={job.location}
                className="icon-img"
                width={20}
              />
              {job.location}
            </div>
            <div>
              <img src={time} alt="watch" width={20} className="icon-img" />
              {moment(job.created_at).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;
