import { IncomingMessage } from "http";
import { repositoryPodcast } from "../repositories/podcasts-repository"


export const serviceFilterEpisodes = async (podcastName: IncomingMessage) => {

  const queryString = podcastName.url?.split("?p=")[1] ?? "";

  // Decodificando para pesquisar com espaço
  const decodedQuery = decodeURIComponent(queryString);

  const data = await repositoryPodcast(decodedQuery);

  return data;
}