import { IncomingMessage } from "http";
import { repositoryPodcast } from "../repositories/podcasts-repository"
import { PodcastTransferModel } from "../models/filter-podcast-model";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (
  podcastName: IncomingMessage
): Promise<PodcastTransferModel> => {

  // define contrato
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: []
  }

  const queryString = podcastName.url?.split("?p=")[1] ?? "";

  // Decodificando para pesquisar com espaço
  const decodedQuery = decodeURIComponent(queryString);

  // busca os dados
  const data = await repositoryPodcast(decodedQuery);

  // verifica o tipo de resposta
  responseFormat.statusCode = 
    data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT

  responseFormat.body = data; 

  return responseFormat;
}