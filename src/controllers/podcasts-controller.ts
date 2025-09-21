import { IncomingMessage, ServerResponse } from "http";


export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(
      [{
        podcastName: "Aqueles Caras",
        episode: "QUEM É DO EXERCITO?",
        videoId: "3G0RVRCYemY",
        category: ["humor", "desafio", "adivinhacao"]
      },
      {
        podcastName: "Aqueles Caras",
        episode: "DETECTOR DE MENTIRAS",
        videoId: "RxnSGjLx-vI",
        category: ["humor", "desafio", "dinamica"]
      }]
    )
  );
};