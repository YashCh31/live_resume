import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RepoDetails = ( {userName, repoName} ) => {
	const [rData, setRData] = useState([]);

	userName = userName + '/';
	repoName = repoName + '';

	const repoLink = "https://api.github.com/repos/" + userName + repoName;

	useEffect(() => {

    // Fetch contributions
    axios
      .get(repoLink)
      .then((response) => {
        setRData(response.data);
        console.log()
      })
      .catch((error) => {
        console.error('Error fetching contributions:', error);
      });

    }, [repoLink]);

    return (
    	<div>

    	{rData.description && <p>Description: {rData.description}</p>}
    	<p>Stargazers Count: {rData.stargazers_count}</p>
            <p>Watchers Count: {rData.watchers_count}</p>
            <p>Forks Count: {rData.forks_count}</p>
            <p>Language: {rData.language} </p>

    	</div>

    );
};

export default RepoDetails;