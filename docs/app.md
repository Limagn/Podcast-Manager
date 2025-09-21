# Podcast Manager

### Descrição

Um app ao estilo Netflix, aonde possa centralizar diferentes podcasts separados por categoria

### Domínio

Podcasts feitos em vídeo

### Features

- Listar os podcasts em sessões de categorias
  - [dinamica, react, desafio, humor, adivinhacao]
- Filtrar episódios por nome de podcast

## Como

### Feature
- Listar os episódios podcasts em sessões de categorias

### Como vou implementar
  GET: retorna lista de episódios
  
  response: 

  ```js
    [
      {
        podcastName: "Aqueles Caras",
        episode: "QUEM É DO EXERCITO?",
        videoId: "3G0RVRCYemY",
        cover: "https://i.ytimg.com/vi/3G0RVRCYemY/hq720.jpg",
        link: "https://www.youtube.com/watch?v=3G0RVRCYemY",
        category: ["humor", "desafio", "adivinhacao"]
      },
      {
        podcastName: "Aqueles Caras",
        episode: "QUEM É DO EXERCITO?",
        videoId: "RxnSGjLx-vI",
        cover: "https://i.ytimg.com/vi/RxnSGjLx-vI/hq720.jpg",
        link: "https://www.youtube.com/watch?v=RxnSGjLx-vI",
        category: ["humor", "desafio", "dinamica"]
      },
    ]
  ```