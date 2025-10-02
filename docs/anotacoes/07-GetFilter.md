# Criando Get Filter

## Criando um novo Get do Filter Episodes no controller

  ### Importar service

  - Importar `serviceFilterEpisodes`.

  ```js
    import { serviceFilterEpisodes } from "../services/filter-episodes-service";
  ```

  ### Criar função Get Filter

  - Criar uma nova função `getFilterEpisodes` que contenha `req` e `res`, mas que utilize o service `serviceFilterEpisodes` no content.
  - Por enquanto a service está passando apenas `"Podpah"` fixamente.

  ```js
    export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      const content = await serviceFilterEpisodes("Podpah");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(content)
      );
    }
  ```