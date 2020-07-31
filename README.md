# Bachelorarbeit README
## Titel der Arbeit:
### Webbasierter Echtzeitserver für ein Multiplayer-System
#
## Erläuterung
Das Repository ist ein Teil der von Bartosz-Krzysztof Kotelczuk eigenständig verfassten Bachelorarbeit mit dem oben gennantem Titel. Das Repository enthält den Prototypen der Echtzeitservers samt des Multiplayer-Systems in der Form eines Browsermultiplayerspiels.  

## How to start
### Docker
Da der Echtzeitcluster und der Spielserver dockerized wurden muss auf dem Zielsystem docker installiert sein. 
Falls Sie noch kein Docker haben folgen Sie einer der Installationsanweisungen.

- Linux / Ubuntu https://docs.docker.com/engine/install/ubuntu/
- Windows https://docs.docker.com/docker-for-windows/install/
- iOS https://docs.docker.com/docker-for-mac/install/

### Node.js & NPM
Der Client der Anwendung ist eine React app. Um die benötigten Abhängigkeiten zu installieren und die Anwendung starten zu können, benötigt das Zielsystem den NPM package manager. Hinzu verwendet der Teil der Anwendung Phaser.io. Um fehlerfreie Funktionalität von Phaser.io sicher zu stellen wird Node.js ebenfalls benötigt. 

Falls Ihr System nicht über Node.js verfügt laden Sie die neueste stable Version über die folgende URL runter.
- https://nodejs.org/en/download/

Folgen Sie den Anweisungen des Installers. Nach der erfolgreichen Installation können sie die Aplikation starten.

### Starten der Anwendung
Damit die Anwendung fehlerfrei startet müssen die einzelnen Komponenten in entprechender Reihenfolge gestartet werden.

1. Router
2. Echtzeitanwendungen
3. Spielserver
4. Spielclient

Der Router wird ebenfalls wie alle anderen Anwendungen über Docker Compose gestartet. Der Docker container kann mit folgendem befehl gestartet werden. 

`docker-compose up --build`

Der Befehl bildet die in der docker-compose enthaltenen Anwendungen und fährt den Container hoch.

#### Docker Compose
Die docker-compose.yml-Dateien enthalten environment Parameter die je nach Bedarf geändert werden können
- Echtzeitserver
  - APP_TYPE=application
  - MONGO=mongodb://mongo_app:27017/rt_app
  - ROUTER=http://host.docker.internal:3080/applications
  - PORT=3050
  - HOST=host.docker.internal
  - RT_CONSTRAIN=500
  - MESSAGE_AWAITER=1
- Spielserver
  - MONGO=mongodb://mongo_backend:27017/bombremann_backend
  - ROUTER=http://host.docker.internal:3080/applications
  - PORT=8080
  - HOST=host.docker.internal
- Router
  - MONGO=mongodb://mongo_router:27017/rt_router
  - PORT=3080

Die docker-compose.yml-Dateien sind jeweils im Root-Folder der Anwendungen zu finden.

- Router: realtime_cluster\router\docker-compose.yml
- Echtzeitserver: realtime_cluster\rt_application\docker-compose.yml
- Spielserver: game\bombreman-backend\docker-compose.yml

Für den Spielclient werden ein paar mehr Schritte benötigt

#### Spielclient
Gehen Sie in den Root-Folder - Bombremann. Als nächtes führen Sie den folgenden Befehl aus. 

`npm install`

Das installiert alle für die Anwendung benötigen pakages. 
