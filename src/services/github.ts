import { invokeProp } from "../utils/fp";

export const projectReadme = (username: string, project: string) => {
  const url = `https://rawgit.com/${username}/${project}/master/README.md`;

  return fetch(url).then(invokeProp('text'));
};