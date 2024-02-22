# flash-cache-redis

Flash-cache-client es un componente diseñado para interactuar con Flash-cache-server desde un proyecto frontend. Su objetivo es simplificar la comunicación con Flash-cache-server, una API que facilita pruebas de caché de Redis. Esto permite una manipulación y pruebas más sencillas de los datos obtenidos a través de solicitudes HTTP GET.

Por otro lado, Flash-cache-server es una API simple que permite probar la caché de Redis. Se trata de código backend que puede integrarse en cualquier proyecto frontend para realizar pruebas visuales. Esta API consume otras APIs que admiten el método HTTP GET para obtener y manipular datos. A veces, las respuestas de estas APIs pueden ser lentas en servidores locales. Flash-cache-server resuelve este problema al guardar estos datos en Redis. De esta manera, las respuestas a futuras solicitudes serán más rápidas al aprovechar la caché de Redis.


# Imágenes de Docker


Si quieres probar esta API junto a su frotend puedes utilizar las imágenes de Docker que he creado.

<li>flash-cache-client: <a href="https://hub.docker.com/r/ivansanmartins/flash-cache-client">https://hub.docker.com/r/ivansanmartins/flash-cache-client</a></li>
<li>flash-cache-server: <a href="https://hub.docker.com/r/ivansanmartins/flash-cache-server">https://hub.docker.com/r/ivansanmartins/flash-cache-server</a> (Se complementa con la imágen de Redis, podrás encontrar un archivo Docker Compose de ejemplo) </li>


# Principal flash-cache-client

![Main](https://github.com/ivansanmartin/flash-cache/assets/54847509/f5972784-bc41-41ce-8436-df5d0faf930e)

# Probando con caching deshabilitado

[Testing caching off.webm](https://github.com/ivansanmartin/flash-cache/assets/54847509/380b1092-1cd8-4cdc-800a-1b990532537f)

# Probando con caching habilitado

[Testing caching on.webm](https://github.com/ivansanmartin/flash-cache/assets/54847509/ede14e32-49f9-4c66-b861-79513fd20a06)
