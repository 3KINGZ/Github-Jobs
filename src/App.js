import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import JobDetail from "./routes/JobDetail/JobDetails";
import HomePage from "./routes/HomePage/HomePage";
import "./App.css";

export const ApiDatas = React.createContext();
export const OnSearch = React.createContext();
export const OnFulltime = React.createContext();
export const OnLocation = React.createContext();
export const GetResult = React.createContext();
export const OnJobsPerPage = React.createContext();
export const OnJobsPaginate = React.createContext();
export const OnJobs = React.createContext();

function App() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [fullTime, setFullTime] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  function onHandleChange(e) {
    setSearch(e.target.value);
  }

  function getSearchResult() {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${search}&full_time=${fullTime}&location=${location}`
    )
      .then((res) => res.json())
      .then((json) => {
        setJobs(json);
      })
      .catch((e) => {
        setError("an occurred while trying to fetch jobs");
      });
  }

  useEffect(() => {
    fetch("https://jobs.github.com/positions.json")
      .then((res) => res.json())
      .then((json) => {
        setJobs(json);
      })
      .catch((e) => {
        setError("an occurred while trying to fetch jobs");
      });
  }, []);

  console.log(error);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <OnJobsPaginate.Provider value={paginate}>
            <OnJobsPerPage.Provider value={jobsPerPage}>
              <GetResult.Provider value={getSearchResult}>
                <OnLocation.Provider value={setLocation}>
                  <OnFulltime.Provider value={setFullTime}>
                    <OnSearch.Provider value={onHandleChange}>
                      <ApiDatas.Provider value={currentPosts}>
                        <OnJobs.Provider value={jobs}>
                          <HomePage />
                        </OnJobs.Provider>
                      </ApiDatas.Provider>
                    </OnSearch.Provider>
                  </OnFulltime.Provider>
                </OnLocation.Provider>
              </GetResult.Provider>
            </OnJobsPerPage.Provider>
          </OnJobsPaginate.Provider>
        </Route>
        <Route path="/:id" exact component={JobDetail} />
      </Switch>
    </Router>
  );
}

export default App;
