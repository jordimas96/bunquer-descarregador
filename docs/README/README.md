# Descarregador de capítols d'El Búnquer

Aquest projecte és una eina que permet **descarregar tots els capítols del programa El Búnquer** de Catalunya Ràdio, amb l'objectiu de **fomentar el català i fer més accessible la cultura catalana**.

## Descripció

La web de Catalunya Ràdio mostra tots els capítols d'El Búnquer amb un scroll infinit, de manera poc còmode per accedir a tots els capítols (sobretot els més vells). Té feed RSS, però allà només hi els darrers 300 capítols. Aquesta web simplement facilita l'accés ràpid a tots els arxius mp3, disponibles a la web oficial.

Per crear aquesta web, primer vaig realitzar un **scraping** de la web oficial per recollir la informació de tots els capítols (enllaços a MP3, títols, temporades i descripcions) i generar un fitxer JSON que serveix com a índex de tots els capítols i base per al funcionament de la web.
<!-- Els scripts per reproduir el scraping són al repositori per a ús tècnic. -->

## Funcionalitats de la web

- Veure tots els capítols separats per **temporada i tipus** (normals i millors moments)
- Descàrrega de capítols individuals
- Descàrrega múltiple amb **previsualització del pes i temps estimat** (utilitzar amb moderació)
- Barra de progrés amb temps restant
- Gestió de descàrregues paral·leles per evitar saturar el servidor

## Tecnologies

- Angular, HTML, TypeScript, CSS
- Fitxers JSON com a base de dades dels capítols
- Playwright (scripts de scraping)

## Enllaços

- [Web](https://jordimas96.github.io/bunquer-descarregador/)
- [Informació del projecte](https://jordimas96.github.io/bunquer/)
- [Programa oficial](https://www.3cat.cat/3cat/el-bunquer/)
- [Avís legal](https://jordimas96.github.io/bunquer-descarregador/AVIS-LEGAL)

## Objectiu

Aquest projecte és **independent**, creat per fer més accessible la cultura catalana i fomentar l'ús del català. No està afiliat ni té permís oficial de 3Cat o Catalunya Ràdio. Aquesta web **NO** allotja cap arxiu.

## Autor

**Jordi Mas Parramon**
