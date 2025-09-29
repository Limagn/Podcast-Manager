# Criando Services

## Criando a Service do List Episodes

  - Não é função do controller devolver dados. Ele só deve controlar as requisições. (GET, POST, etc).
  - A responsabilidade de processar, verificar é da Service.

  ### Criar constante

  - Criar uma arrow function `serviceListEpisodes` para o service.

    ```js
    export const serviceListEpisodes = () => {}
    ```

  - Criar dentro deste service uma constante que irá conter o conteúdo que estava no `JSON` do `res.end()` no controller `getListEpisode()` e retirar de lá.

    ```js
    export const serviceListEpisodes = async () => {
      const data = [
        {
          podcastName: "Aqueles Caras",
          episode: "QUEM É DO EXÉRCITO?",
          videoId: "3G0RVRCYemY",
          category: ["humor", "desafio", "adivinhacao"]
        },
        {
          podcastName: "Aqueles Caras",
          episode: "DETECTOR DE MENTIRAS",
          videoId: "RxnSGjLx-vI",
          category: ["humor", "desafio", "dinamica"]
        }
      ]
    }
    ```

  ### Importar service no controller

  - Com a service criada, é preciso importá-la no controller.
  - Criar uma constante dentro de `getListEpisodes()` para recebê-la.

  ````js
    import { IncomingMessage, ServerResponse } from "http";
    import { serviceListEpisodes } from "../services/list-episodes-service";

    export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      const content = await serviceListEpisodes();
      
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(content)
      );
    };
  ```
