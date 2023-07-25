import React, { useState, useEffect } from 'react';
import GridLayout from "react-grid-layout";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import axios from 'axios';
import RepoDetails from './RepoDetails';

const GitHubFeatures = ({username}) => {

  const [mData, setMData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [profilePic, setProfilePic] = useState();
  //const [languagesResponse, setLanguagesResponse] = useState({});

  username = username + ''; // converting username to a string

  const metaData = "https://api.github.com/users/" + username;
  const repositories = "https://api.github.com/users/" + username + "/repos";

  const { avatar_url, name, blog, hireable, company, email, followers, public_repos } = mData; // For metadata of user
  const { url, languages_url } = repos;

  useEffect(() => {

    // Fetch contributions
    axios
      .get(metaData)
      .then((response) => {
        setMData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contributions:', error);
      });

    // Fetch repositories
    axios
      .get(repositories)
      .then((response) => {
        const sortedRepos = response.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedRepos);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching repositories:', error);
      });


  }, [username]);


  return (
    <div key="GitHub">
      <h2>User Profile</h2>
      <img src={avatar_url} alt="Avatar" />
      <p>Name: {name}</p>
      <p>Blog: {blog}</p>
      <p>Hireable: {hireable ? 'Yes' : 'No'}</p>
      <p>Company: {company}</p>
      <p>Email: {email}</p>
      <p>Followers: {followers}</p>
      <p>Public Repos: {public_repos}</p>

      <b>Repositories</b>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <p>Repository Name: {repo.name}</p>
            <p>URL: {repo.html_url}</p>
            <RepoDetails userName = {username} repoName={repo.name} />
          </li>
        ))}
      </ul>

      <h2>Languages</h2>


    </div>
  );
};

export default GitHubFeatures;
