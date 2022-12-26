import React, { Fragment, useContext, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import { Repos } from "../components/Repos";
import { GithubContext } from "../context/github/GithubContext";

export const Profile = () => {
  const match = useMatch('/profile/:name')

  const {getUser, getRepos, loading, users, repos} = useContext(GithubContext)
  const urlname = match.params.name

  useEffect(() => {
    getUser(urlname)
    getRepos(urlname)
    //eslint-disable-next-line
  }, [])

  if(loading) {
    return <p className="text-center">Loading...</p>
  }

  const {
    name, company, avatar_url, location, bio, blog, 
    login, html_url, followers, following,
    public_repos, public_gists
  } = users

  return (
    <Fragment>
      <Link to={`/`} reloadDocument className='btn btn-link'>To main</Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img 
                src={avatar_url} 
                alt={name} 
                style={{width: '150px'}}
              />
              <h1>{name}</h1>
              {location && <p>Location: {location}</p>}
            </div>
            <div className="col">
              {
                bio && <Fragment>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </Fragment>
              }
              <a href={html_url} rel="noopener noreferrer" target="_blank" className="btn btn-dark" >Open profile</a>
              <ul>
                {login && <li>
                  <strong>Username: </strong> {login}
                </li>}
                {company && <li>
                  <strong>Company: </strong> {company}
                </li>}
                {blog && <li>
                  <strong>Website: </strong> {blog}
                </li>}
              </ul>

              <div className="badge bg-primary">Followers: {followers}</div>
              <div className="badge bg-success">Followed: {following}</div>
              <div className="badge bg-info">Repos: {public_repos}</div>
              <div className="badge bg-dark">Gists: {public_gists}</div>
            </div>
          </div>
        </div>
      </div>
      
      <Repos repos={repos} />
    </Fragment>
  )
}