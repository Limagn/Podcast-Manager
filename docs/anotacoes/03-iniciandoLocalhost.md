# Iniciando a API

## Iniciar a API no localhost

### Ao tentar iniciar a API no navegador com o localhost na porta 3333, ocorre um erro de tipo inválido, pois o retorno está em JSON e o navegador espera ler um tipo string.

  - Converter o JSON do `getListEpisodes()` em texto com `JSON.stringify()`.`

  ```js
  export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
    name: "Gabriel",
  }));
  };
  ```

### Iniciando a API, irá funcionar retornando o conteúdo "name". Então agora é necessário colocar o conteúdo correto definido no app.md.

  - Incluir no `getListEpisodes()`.

  ```js
  export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(
        [{
          podcastName: "Aqueles Caras",
          episode: "QUEM É DO EXERCITO?",
          videoId: "3G0RVRCYemY",
          cover: "https://i.ytimg.com/vi/3G0RVRCYemY/hq720.jpg",
          link: "https://www.youtube.com/watch?v=3G0RVRCYemY",
          category: ["humor", "desafio", "adivinhacao"]
        },
        {
          podcastName: "Aqueles Caras",
          episode: "DETECTOR DE MENTIRAS",
          videoId: "RxnSGjLx-vI",
          cover: "https://i.ytimg.com/vi/RxnSGjLx-vI/hq720.jpg",
          link: "https://www.youtube.com/watch?v=RxnSGjLx-vI",
          category: ["humor", "desafio", "dinamica"]
        }]
      )
    );
  };
  ```

## Como há um padrão no cover e no link, utilizando o videoId, não é necessário incluí-los.

  - Retirar `cover` e `link`.

  ```js
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
  ```