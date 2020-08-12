import React from "react";
import InputContainer from "../../components/Input-container/Input-container";
import Header from "../../components/Header/Header";
import Job from "../../components/Job/Job.js";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import { OnSearch } from "../../App";
import { ApiDatas } from "../../App";
import { OnLocation } from "../../App";
import { OnFulltime } from "../../App";
import { OnJobsPerPage } from "../../App";
import { OnJobsPaginate } from "../../App";
import { OnJobs } from "../../App";

export const ApiData = React.createContext();

function HomePage() {
  const jobs = React.useContext(ApiDatas);
  const OnSearchHandler = React.useContext(OnSearch);
  const setLocationHandler = React.useContext(OnLocation);
  const setFullTime = React.useContext(OnFulltime);
  const jobsPerPage = React.useContext(OnJobsPerPage);
  const paginate = React.useContext(OnJobsPaginate);
  const jobsData = React.useContext(OnJobs);

  return (
    <div className="main-container">
      <Header />
      <InputContainer handler={OnSearchHandler} />
      <div className="main-content-container">
        <div className="left-div">
          <div className="fulltime-checkbox-container">
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              value="Bike"
              onClick={(e) => setFullTime(e.target.checked)}
            />
            <label htmlFor="vehicle1"> Full time</label>
          </div>
          <div className="location-input-container">
            <h5 className="location-text">LOCATION</h5>
            <input
              className="location-input"
              type="text"
              placeholder="city,state,zip code or country"
              onChange={(e) => setLocationHandler(e.target.value)}
            />
          </div>
        </div>
        <div className="jobs-container">
          {jobs.length === 0 ? (
            <Loading />
          ) : (
            <>
              {jobs.map((job) => (
                <ApiData.Provider value={job} key={job.id}>
                  <Job />
                </ApiData.Provider>
              ))}
            </>
          )}
          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={jobsData.length}
            paginate={paginate}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
