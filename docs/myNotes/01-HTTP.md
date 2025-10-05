# Criando HTTP

### Importar HTTP
  - Importar todo o pacote `HTTP` que já vem no NodeJS, no `server.ts`

    ```js
    import * as http from "http";
    ```

### Criar a constante para utilizar o pacote
  - request: tipo `http.IncomingMessage` solicitação do cliente.
  - response: tipo `http.ServerResponse` resposta do servidor.
  - OBS: Caso o http não esteja sugerindo automaticamente as funções, baixar as tipagens. `npm install @types/node -D` .

    ```js
    const server = http.createServer((
      request: http.IncomingMessage, 
      response: http.ServerResponse
      ) => {}
    )
    ```

### Criar a porta do servidor
  - Definir número de porta.
  - Criar função de callback pra mostrar mensagem do servidor quando estiver rodando.

    ```js
    const port = 3333

    server.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}.`)
    });
    ```

  - Após testar o funcionamento, ocultar a porta do código, inserindo no `.env`.
    
    ```js
    PORT = 3636
    ```

  - Inserir o `.env` no script.

    ```js
    "scripts": {
      "start:dev": "tsx --env-file=.env src/server.ts",
      "start:watch": "tsx watch src/server.ts",
      "dist": "tsup src",
      "start:dist": "npm run dist && node/server.js"
    },
    ```

  - Ajustar constante da porta.

    ```js
    const port = process.env.PORT

    server.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}.`)
    });
    ```
