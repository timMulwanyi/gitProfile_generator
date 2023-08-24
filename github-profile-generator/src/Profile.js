import  React from 'react';


async  function fetchUserProfile(username){
    try{
        const response = await fetch('https://api.github.com/users/${username}');
        if(!response.ok){
            throw new Error("User not found");
        }
        const data = await response.json();
        return data;
    }catch (error){
        throw error;
    }
}

function Profile({userData}){
    if(!userData){
        return null ;// display nothing if userData is null
    }

    return(
        <div>
            <h2>Github Profile</h2>
            <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
            <h3>{userData.name}</h3>
            <p>username:{userData.login}</p>
            <p>Followers:{userData.followers}</p>
            <p>Following:{userData.following}</p>
            <p>Public Repos:{userData.public_repos}</p>
            <p>Location:{userData.location}</p>
            <p>Website: <a href={userData.blog} target="_blank" rel="noopener noreferrer">{userData.blog}</a></p>

        </div>

    );
}

export default Profile;