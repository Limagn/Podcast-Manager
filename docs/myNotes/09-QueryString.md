# Query Strings

## Criando query string no `server.ts`
  
  - Para que o filtro de um episódio não fique amarrado à uma palavra no GET Filter, é necessário criar uma Query String que receba uma variável da parte do cliente.
  - Essa variável sempre vem acompanhado do `?` no link do site.
  - http://localhost:3333/api/episode`?p=Podpah`

  ### Separar rota da query string

  - Criar uma constante dupla que separe a url da query string passada nela.
  - Para criar duas constante de uma só vez, basta colocar entre chaves `const [ex1, ex2] = exemplo`
  - Colocar um `.split()` para quebrar a url, utilizando o `"?"` como divisor: `.split("?")`. O `?` como divisor é uma convenção da Web.
  - Automaticamente o TS coloca um `?` no `req.url` para caso não venha, não tenha como quebrar.

  ```js
    const [baseUrl, queryString] = req.url?.split("?");
  ```

  - Como o parâmetro pós split foi definido para poder vir vazio, o TS pede para definir um vetor de string vazio.
  - Acrescentar a condição para quando não for preenchido: `?? ["", ""]`

  ```js
    const [baseUrl, queryString] = req.url?.split("?") ?? ["", ""];
  ```

  - Com isso a base da url está separada da query.

  ### Alterar a condição IF

  - Agora a condição dos GET não será mais atendida, pois o req.url não será mais atendido. `if (req.method === "GET" && req.url === "/api/episode")`.
  - Portanto deve-se mudar para a constante `baseUrl` que conterá a url dividida.

  ```js
    if (req.method === "GET" && baseUrl === "/api/list") {
      await getListEpisodes(req, res);
    }

    if (req.method === "GET" && baseUrl === "/api/episode") {
      await getFilterEpisodes(req, res);
    }
  ```

## Alterando o controller do podcast

  - Como o server está passando `(req, res)` para o Get, é possível criar no `GetFilter` uma constante para definir a query.
  - Por enquanto está funcionando a requisição somente porque "Podpah" está 'amarrado' ao código, e não está verificando qual é o valor daquela variável.

  ### Criando a queryString

  - Criar constante `queryString` com o mesmo conceito de quebrar a url, porém dessa vez pelo nome da variável `?p=`. 

  ```js
    const queryString = req.url?.split("?p=")
  ```

  - Como será passado para o JSON somente a variável, precisamos só da posição `[1]` do vetor. (Lado direito)

  ```js
    const queryString = req.url?.split("?p=")[1]
  ```

  - Como a query pode vir `undefined`, é necessário definir um `??` vazio.

  ```js
    const queryString = req.url?.split("?p=")[1] ?? ""
  ```

  ### Passar a query no content

  - Com a query criada, é necessário passá-la na constante `content` que estava fixo em `"Podpah"`.

  ```js
    export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      
      const queryString = req.url?.split("?p=")[1] ?? "";
      
      const content = await serviceFilterEpisodes(queryString);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(content)
      );
    }
  ```
  - Para pesquisar com epaços (`%20` ou `+`) no link, adicionei o `decodeURIComponent()` na queryString.

  ```js
    export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      
      const queryString = req.url?.split("?p=")[1] ?? "";

      // Decodificando para pesquisar com espaço
      const decodedQuery = decodeURIComponent(queryString);

      const content = await serviceFilterEpisodes(decodedQuery);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(content)
      );
    }
  ```
  