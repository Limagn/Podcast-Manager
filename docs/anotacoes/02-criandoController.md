# Criando Controllers

## Criando Controllers para o podcasts

  ### Importar

  - Importar os tipos de get e set.

    ```js
    import { IncomingMessage, ServerResponse } from "http";
    ```

  ### Criar um Get List Episodes
  
  - Criar uma constante Get para listar os episódios.

    ```js
    export const getListEpisodes = (req: IncomingMessage, res: SeverResponse){}
    ```

  - Escrever uma response
    - Uma "caixinha dividida em duas partas: Cabeçalho e conteúdo"
    - writeHead -> escrever no cabeçalho
      - status code: 200
      - tipo de conteúdo: "application/json"
    - end -> escrever o conteúdo
      - JSON({
        name: "Gabriel"
      })
    
    ```js
    export const getListEpisodes = (req: IncomingMessage, res: SeverResponse){
      res.write.Head(200, {'Content-Type': ""})
      res.end(JSON({
        name: "Gabriel"
      }))
    }
    ```
    - Como já é um JSON, não precisa converter com `JSON()`.
      - ({
        name: "Gabriel"
      })
    
    ```js
    export const getListEpisodes = (req: IncomingMessage, res: SeverResponse){
      res.write.Head(200, {'Content-Type': ""})
      res.end(({
        name: "Gabriel"
      }))
    }
    ```

## Acessando o servidor pelo request

  - Após criar o controller do get, utilizá-lo para realizar o request no `server.ts`.

### Importar

  - Importar o  `getListEpisodes()` no `server.ts`.

    ```js
    import { getListEpisodes } from "./controllers/podcasts-controller";
    ```
  
  - Definir o `getListEpisodes()` como async.

    ```js
    export const getListEpisodes = async (req: IncomingMessage, res: SeverResponse){
      res.write.Head(200, {'Content-Type': ""})
      res.end(({
        name: "Gabriel"
      }))
    }
    ```
  
  - Definir o `(req: http.IncomingMessage, res: http.ServerResponse)` como async.
  - Incluir na constante `server`, um IF para quando o método do req for um GET.

    ```js
    const server = http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (req.method === "GET") {
          await getListEpisodes(req, res);
        }
      }
    );
    ```