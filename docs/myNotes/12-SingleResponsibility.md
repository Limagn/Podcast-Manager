# Responsabilidade Única

## Refatorando os arquivos para ter uma única responsabilidade.
  
  - Separar o `server` em 2 partes: Onde configura as portas / Configurações da aplicação.
  
  ### Criar app.ts

  - Criar o arquivo `app.ts` na raiz do `/src`.
  - Recortar tudo que está dentro do `createServer()` e colocar no `app.ts`.
  - Recortar as importações para também colocar no `app.ts`, exceto do `http`, que deve haver nos dois arquivos.
  - Dar um nome para a função que está agora dentro do `app.ts`.

  ```ts
    import * as http from "http";
    import { getFilterEpisodes, getListEpisodes } from "./controllers/podcasts-controller";
    import { Routes } from "./routes/routes";
    import { HttpMethod } from "./utils/http-methods";


    export const app = async (
      request: http.IncomingMessage, 
      response: http.ServerResponse
    ) => {

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
  ```

  ### Importar o `app.ts`
  
   - Importar o `app.ts` dentro do `server.ts` na constante `server`.

   ```ts
    const server = http.createServer(app);
   ```

   - Assim o `server.ts` só fica responsável por criar um servidor que irá importar o conteúdo do `app.ts` e criar a `porta` `(port)`.