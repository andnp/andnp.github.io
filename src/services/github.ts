import { invokeProp } from "../utils/fp";

export const projectReadmeUrl = (username: string, project: string) => {
  return `https://rawgit.com/${username}/${project}/master/README.md`;
};

export const projectReadme = (username: string, project: string) => {
  const url = projectReadmeUrl(username, project);
  
  return fetch(url).then(invokeProp('text'));
};