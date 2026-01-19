# Corrigindo status codes

  - Neste ponto, qualquer pesquisa da API está retornando o Status Code 200, como se estivesse OK, porém nem todas estão, como por exemplo pesquisar algo que não está no repositório.
  - Pesquisar "Aqueles Caras" retorna `200 OK`, mas pesquisar "Aqueles" também retorna `200 OK`, mesmo não existindo. 
  
## Retirar a responsabilidade do controller definir o `StatusCode`

  - O controller está definindo o `status code` ao retornar o `content`. Esta responsabilidade deverá ser do service.

  ### Criar um contrato de conversa

   - Criar um contrato para que o service retorne um molde.
   - Criar o arquivo `filter-podcast-model.ts`.
   - Inserir o contrato `FilterPodcastModel` com as condições de `statusCode` e `body`.

  ```ts
    import { PodcastModel } from "./podcast-model";

    export interface FilterPodcastModel {
      statusCode: number,
      body: PodcastModel[]
    }
  ```

  ### Aplicar o contrato

   - Importar o contrato no `filter-episodes-service.ts`.
   - Criar uma constante `responseFormat` do tipo `FilterPodcastModel` com valores iniciais para `statusCode` e `body`.
   
  ```ts
    import { IncomingMessage } from "http";
    import { repositoryPodcast } from "../repositories/podcasts-repository"
    import { FilterPodcastModel } from "../models/filter-podcast-model";

    export const serviceFilterEpisodes = async (podcastName: IncomingMessage) => {

      let responseFormat: FilterPodcastModel = {
        statusCode: 0,
        body: [],
      }

      const queryString = podcastName.url?.split("?p=")[1] ?? "";

      // Decodificando para pesquisar com espaço
      const decodedQuery = decodeURIComponent(queryString);

      const data = await repositoryPodcast(decodedQuery);

      return data;
    }
  ```

  ### Incluir condição de status

   - Incluir um `if` para definir quando o StatusCode deve ser `OK` ou `NO CONTENT`.
   - Alterar a função para retornar o responseFormat, uma vez que o `body` irá receber o `data`.
   - Tipar a função para sempre responder `FilterPodcastModel`
   - Como ele é assíncrono, precisa ser uma `Promise <FilterPodcastModel>`
   
  ```ts
    export const serviceFilterEpisodes = async (
      podcastName: IncomingMessage
    ): Promise<FilterPodcastModel> => {

      let responseFormat: FilterPodcastModel = {
        statusCode: 0,
        body: [],
      }

      const queryString = podcastName.url?.split("?p=")[1] ?? "";

      // Decodificando para pesquisar com espaço
      const decodedQuery = decodeURIComponent(queryString);

      const data = await repositoryPodcast(decodedQuery);

      if (data.lenght !== null) {
        responseFormat.statusCode = StatusCode.OK;
      } else {
        responseFormat.statusCode = StatusCode.NO_CONTENT;
      }

      responseFormat.body = data;

      return responseFormat;
    }
  ```

  ### Atualizar o `getFilterEpisodes` em `podcasts-controller.ts`.

   - Tipar o `content` para `FilterPodcastModel`.
   - Aonde era definido o `StatusCode` diretamente no `writeHead`, agora deve ser substituído pelo `content.statusCode`.
   - Aonde era definido o `body` (content) diretamente no `end`, agora deve ser substituído pelo `content.body`.

  ```ts
    export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
      
      const content: FilterPodcastModel = await serviceFilterEpisodes(req);

      res.writeHead(content.statusCode, { "Content-Type": ContentType.JSON });
      res.end(
        JSON.stringify(content.body)
      );
    }
  ```

  ### Deixando o if mais prático.

   - Aplicar o if ternário no `filter-episodes-service.ts`.

  ```js
    responseFormat.statusCode = data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT

  ```


## Repetir o processo para o `serviceListEpisodes`.

  - Repetir o processo feito no `filterEpisode`, incluindo o `responseFormat`.

  ```ts
    export const serviceListEpisodes = async () => {
      const data = await repositoryPodcast();
      
      return data;
    }
  ```
  - Obs: desta vez o valor do responseFormat foi passado como objeto ao invés de definir primeiro statusCode e depois body, individualmente.

  ```ts
    export const serviceListEpisodes = async () => {
    
      let responseFormat: FilterPodcastModel = {
        statusCode: 0,
        body: []
      }
      
      const data = await repositoryPodcast();
      
      responseFormat = { 
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
        body: data,  
      }
      
      return responseFormat;
    }
  ```

  ### Alterar o nome do interface `FilterPodcastModel`.

  - Como este nome ficou muito específico para o Filter, podemos deixar mais genérico usando o conceito DTO (Data Transfer Object), que é quando tem um modelo só para representar uma transferência.
  - Apertando F2 e alterando o nome para PodcastTransferModel, irá alterar em todos os lugares que foi utilizado.

  ```ts
    import { PodcastModel } from "./podcast-model";

    export interface PodcastTransferModel {
      statusCode: number,
      body: PodcastModel[];
    }
  ```

  ### Alterar o `getListEpisodes`.

  - Agora é necessário alterar o controller `getListEpisodes`, igual fizemos no `getFilterEpisodes`, retornando o `statusCode` correto e não apenas OK fixo.

  ```ts
    export const getListEpisodes = async (
      req: IncomingMessage,
      res: ServerResponse
    ) => {
      
      const content: PodcastTransferModel = await serviceListEpisodes();
      
      res.writeHead(content.statusCode, { "Content-Type": ContentType.JSON });
      res.end(
        JSON.stringify(content.body)
      );
    };
  ```

  ## Alterar a resposta da requisição para o `write` ao invés do `end`.

  - Um bom costume é utilizar o `response.write` / `res.write` para escrever o corpo da resposta, ao invés de utilizar o `res.end` que serve mais para escrever o final, que não tem mais nada adiante.

  ```ts
      res.writeHead(content.statusCode, { "Content-Type": ContentType.JSON });
      res.write(
        JSON.stringify(content.body)
      );
      res.end();
  ```
