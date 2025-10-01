# Criando Repositories

## Criando o JSON nos repositories

  - Não é função do service manter os dados que serão buscados.
  - Esses JSON devem ser contidos no repository.

  ### Criar o arquivo

  - É necessário tirar os dados json que estavam no service e colocar num `podcasts.json`.
  - Incluir as aspas nos nomes, pois o arquivo está em `.json`
    
    #### `list-epidoes-service.ts`
    ```js
    export const serviceListEpisodes = async () => {
      const data = []
    }
    ```

    #### `podcasts.json`
    ```js
    [
      {
        "podcastName": "Aqueles Caras",
        "episode": "QUEM É DO EXÉRCITO?",
        "videoId": "3G0RVRCYemY",
        "category": ["humor", "desafio", "adivinhacao"]
      },
      {
        "podcastName": "Aqueles Caras",
        "episode": "DETECTOR DE MENTIRAS",
        "videoId": "RxnSGjLx-vI",
        "category": ["humor", "desafio", "dinamica"]
      }  
    ]
    ```

## Criando o TS nos repositories

  - Agora é necessário criar o `podcasts-repository.ts` para ler o arquivo `podcasts.json` e fornecer dados para quem precisar.

  ### Criar o arquivo

  - Criar o arquivo `podcasts-repository.ts` dentro da pasta `repositories`.

  ### Importar o File System

  - Importar o `fs` denntro do `podcasts-repository.ts`.
  - O `fs` já é nativo do `Node.js`.
  - Ele serve pra ler e escrever em arquivos de sistema.
  
  ```js
    import fs from "fs";
  ```

  ### Importar o Path

  - Importar o `path` dentro do `podcasts-repository.ts`.
  - O `path` já é nativo do `Node.js`.
  - Ele serve para ler diretórios específicos.

  ```js
    import path from "path";
  ```

  ### Criar caminho para o json

  - Criar uma constante que irá contemplar o caminho para o `podcasts.json`.
  - O `__dirname` pega o diretório em que está a `src`.
  - Usamos o `.join` para juntar o `_dirname` com o que vem em seguida, que nesse caso é o caminho até o `podcasts.json`.
  - O `__dirname` só vai funcionar se o `type` em `package.json` não estiver como `module`.

  ```js
    const pathData = path.join(__dirname, "../repositories/podcasts.json");
  ```

  ### Criar uma função

  - Criar uma arrow function numa constante para o repositório do podcast.

  ```js
    export const repositoryPodcast = () => {}
  ```
  
  - Dentro da função, criar uma constante que lê os arquivos do arquivo `podcasts.json`.
  - Utilizar o `fs.readFileSync` pois é pra ler o arquivo. Utilizamos o `.readFileSync` ao invés do `.readFile` para que ele primeiro leia e somente depois a linha debaixo seja executada.
  - Essa função lê dois parâmetros: O caminho; O tipo de Charset
  - Caminho: `pathData`.
  - Tipo de configuração de charset: `utf-8`. (Digitação com caracteres especiais)

  ```js
    export const repositoryPodcast = () => {
      const rawData = fs.readFileSync(pathData, "utf-8");
    }
  ```

  ### Criar JSON na memória

  - Criar uma constante que irá ler o arquivo anterior e criar o JSON na memória.
  - O `JSON.parse` lê o texto e converte para arquivo JSON, ao contrário do `JSON.stringify` que converte um arquivo JSON para texto.
  - Por fim, retornar o `jsonFile` criado agora.
  
  ```js
    export const repositoryPodcast = () => {
      const rawData = fs.readFileSync(pathData, "utf-8");
      const jsonFile = JSON.parse();
      
      return jsonFile;
    }
  ```

  ### Importar na Service

  - Importar o `repositoryPodcast()` na service.
  - Adicionar a função no lugar aonde os dados json anteriormente eram informados.
  - Retornar os dados `data`.

  ```js
    import { repositoryPodcast } from "../repositories/podcasts-repository"

    export const serviceListEpisodes = async () => {
      const data = await repositoryPodcast();

      return data;
    }
  ```

  ### Criar interface 

  - Criar uma pasta `models` e adicionar um arquivo `podcast-model` para conter a interface.
  - Criar uma interface para ser a "forma" de como devem vir os dados dessa API.
  
  ```ts
    export interface Podcast {
      podcastName: string;
      episode: string;
      videoId: string;
      categories: string[];
    }
  ```

  ### Definir Promise

  - Importar a interface `Podcast` no `podcasts-repository.ts`.
  - Na função `repositoryPodcast`, definir que o tipo será `Promise` que retornará um vetor desta `interface Podcast`.
  - `Promise<Podcast[]>`

  ```js
  export const repositoryPodcast = (): Promise<Podcast[]> => {
    const rawData = fs.readFileSync(pathData, "utf-8");
    const jsonFile = JSON.parse(rawData);

    return jsonFile;
  }
  ```