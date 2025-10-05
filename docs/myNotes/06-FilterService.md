# Criando Services

## Criando a Service do Filter Episodes

  ### Criar função

  - Criar uma arrow function `serviceFilterEpisodes` para o service.
  - A função irá receber um nome de podcast do tipo `string`.

  ```ts
    export const serviceListEpisodes = (podcastName: string) => {}
  ```

  ### Importar repositório

  - Importar RepositoryPodcast para ser utilizado dentro da função.
  
  ```js
    import { repositoryPodcast } from "../repositories/podcasts-repository"
  ```

  ### Adicionar constante

  - Adicionar a função `repositoryPodcast()` em uma constante, recebendo o valor do nome do podcast.
  - Irá apresentar um erro de argumento, pois até então a função do repositório não pede nenhum.

  ```ts
    export const serviceListEpisodes = (podcastName: string) => {
      const data = await repositoryPodcast(podcastName);
    }
  ```

  ### Adicionar argumento

  - Adicionar argumento não obrigatório na função `repositoryPodcast` 

  ```ts
    export const repositoryPodcast = (podcastName?: string): Promise<Podcast[]> => {
      const rawData = fs.readFileSync(pathData, "utf-8");
      const jsonFile = JSON.parse(rawData);

      return jsonFile;
    }
  ```

  ### Criar condição

  - Criar condição `if` para quando a função do repositório receber algum nome de podcast.
  - Quando receber, irá retornar somente aquele podcast. Se não receber, retorna todos.
  - Alterar o `jsonFile` para variável ao invés de constante, para permitir ser alterado.
  - Se a condição for atendida, aplicar um `filter` que filtra somente o podcast que possua o nome informado.

  ```ts
    export const repositoryPodcast = async (podcastName?: string): Promise<PodcastModel[]> => {
      
      const rawData = fs.readFileSync(pathData, "utf-8");
      let jsonFile = JSON.parse(rawData);

      if (podcastName) {
        jsonFile = jsonFile.filter(
          (p: PodcastModel) => p.podcastName === podcastName
        )
      }

      return jsonFile;
    }
  ```