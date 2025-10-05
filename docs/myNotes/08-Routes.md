# Criando Rotas

## Criando rotas no `server.ts`

  ### Acrescentar condições

  - Acrescentar condições de rota `req.url` com texto específico no `if` que chama o GET List.
  - Para o Get List, utilizar `"/api/list"`.

  ```js
    const server = http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {

        if (req.method === "GET" && req.url === "/api/list") {
          await getListEpisodes(req, res);
        }
      }
    );
  ```

  ### Criar nova condição

  - Criar uma nova condição parecida, mas que retorne o Get Filter.
  - Para o Get Filter, utilizar `"/api/episode"`.

  ```js
    const server = http.createServer(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {

        if (req.method === "GET" && req.url === "/api/list") {
          await getListEpisodes(req, res);
        }

        if (req.method === "GET" && req.url === "/api/episode") {
          await getFilterEpisodes(req, res);
        }
      }
    );
  ```