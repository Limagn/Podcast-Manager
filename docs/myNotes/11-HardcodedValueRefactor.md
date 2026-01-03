# Refactor

## Refatorando as rotas para deixar de ser `texto flutuante`.
  
  - Textos como `"/api/list"` e `"/api/episode"` são considerados textos flutuantes pois estão "largados" no código, sem variável atribuída.
  - O ideal é deixar armazenado em algum lugar organizado, principalmente para manutenção.

  ```ts
    const server = http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {

        // query string
        // http://localhost:3333/api/episode?p=Podpah
        const [baseUrl, queryString] = req.url?.split("?") ?? ["", ""];

        // listar podcasts
        if (req.method === "GET" && baseUrl === "/api/list") {
          await getListEpisodes(req, res);
        }

        if (req.method === "GET" && baseUrl === "/api/episode") {
          await getFilterEpisodes(req, res);
        }
      }
    );
  ```
  
  ### Criar routes

  - Criar pasta `routes` e adicionar o arquivo `routes.ts` para armazenar as rotas.

  ### Criar enum

  - Criar um enum para armazenar as variáveis com os valores desejados.
  - Enum é como um objeto que tem uma chave de lista <-> valor.

  ```ts
    export enum Routes {
      LIST = "/api/list",
      EPISODE = "/api/episode",
    }
  ```

  ### Alterar o valor em `server.ts`

  - Substituir o valor digitado diretamente no server, para o enum desejado.

  ```ts
    const server = http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {

        // query string
        // http://localhost:3333/api/episode?p=Podpah
        const [baseUrl, queryString] = req.url?.split("?") ?? ["", ""];

        // listar podcasts
        if (req.method === "GET" && baseUrl === Routes.LIST) {
          await getListEpisodes(req, res);
        }

        if (req.method === "GET" && baseUrl === Routes.EPISODE) {
          await getFilterEpisodes(req, res);
        }
      }
    );
  ```

## Refatorando o "GET" para deixar de ser `texto flutuante`.

  ### Criar utils

  - Criar pasta `utils` e adicionar o arquivo `http-methods.ts` para armazenar os métodos utilizados.

  ### Criar enum

  - Criar um enum para armazenar as variáveis com os valores desejados.

  ```ts
    export enum HttpMethod {
      GET = "GET",
      POST = "POST",
      PUT = "PUT",
      PATCH = "PATCH",
      DELETE = "DELETE"
    }
  ```

  ### Alterar o valor em `server.ts`

  - Substituir o valor digitado diretamente no server, para o enum desejado.

  ```ts
    const server = http.createServer(
      async (request: http.IncomingMessage, response: http.ServerResponse) => {

        // query string
        // http://localhost:3333/api/episode?p=Podpah
        const [baseUrl, queryString] = request.url?.split("?") ?? ["", ""];

        // listar podcasts
        if (request.method === HttpMethod.GET && baseUrl === Routes.LIST) {
          await getListEpisodes(request, response);
        }

        if (request.method === HttpMethod.GET && baseUrl === Routes.EPISODE) {
          await getFilterEpisodes(request, response);
        }
      }
    );
  ```

  ## Refatorando os `status code` para deixar de ser `número mágico`.

  ### Criar utils

  - Adicionar o arquivo `status-code.ts` na pasta `utils` para armazenar os códigos de status utilizados.

  ### Criar enum

  - Criar um enum para armazenar as variáveis com os valores desejados.

    ```ts
      export enum StatusCode {
        OK = 200,
      }
    ```

  ### Alterar o valor em `podcasts-controller.ts`

  - Substituir o valor digitado diretamente no controller, para o enum desejado.

  ```ts
    export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      const content = await serviceListEpisodes();
      
      res.writeHead(StatusCode.OK, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(content)
      );
    };

    export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      
      const content = await serviceFilterEpisodes(req);

      res.writeHead(StatusCode.OK, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(content)
      );
    }
  ```

## Refatorar o Content-Type com os mesmos processos

  ```ts
    export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      const content = await serviceListEpisodes();
      
      res.writeHead(StatusCode.OK, { "Content-Type": ContentType.JSON });
      res.end(
        JSON.stringify(content)
      );
    };

    export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      
      const content = await serviceFilterEpisodes(req);

      res.writeHead(StatusCode.OK, { "Content-Type": ContentType.JSON });
      res.end(
        JSON.stringify(content)
      );
    }
  ```