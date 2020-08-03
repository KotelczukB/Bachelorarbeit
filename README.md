# README Bachelorarbeit
### Titel: Webbasierter Echtzeitserver für ein Multiplayer-System
#
### Erläuterung
Das Repository ist ein Teil der von Bartosz-Krzysztof Kotelczuk eigenständig verfassten Bachelorarbeit. Das Repository enthält den Prototypen der Echtzeitserver samt des Multiplayer-Systems in der Form eines Browsermultiplayerspiels.

Zusätzlich wurden hier alle Blogs und Online-Quellen, die zum Zeitpunkt des letzten Aufrufs kopiert wurden, im ROOT-Verzeichnis abgelegt.

### How to start
#### Docker
Da der Echtzeitcluster und der Spielserver dockerized wurden, muss auf dem Zielsystem Docker installiert sein. 
Falls Sie noch kein Docker haben, folgen Sie einer der Installationsanweisungen.

- Linux / Ubuntu https://docs.docker.com/engine/install/ubuntu/
- Windows https://docs.docker.com/docker-for-windows/install/
- macOS https://docs.docker.com/docker-for-mac/install/

Stellen Sie sicher, dass die Installation ebenfalls Docker Compose beinhaltet. 

#### Starten der Anwendung
Bevor die Anwendungscontainer gestartet werden können so müssen die in der docker-compose.yml-Datei referenzierten Networks angelegt werden. Führen Sie hierzu den folgenden Befehl für jedes der Networks aus.

**network**: 
  - rt_app_net
  - rt_chat_net
  - router_net
  - game_backend_net
  - static-network
```
 $ docker network create <network>
```
Für eine lokale Ausführung der Anwendung muss im Root-Verzeichnis des Repositories folgender Befehl für alle Apps in folgender Reihenfolge ausgeführt werden.

**app:**
  1. router
  2. app
  3. chat
  4. backend
  5. client

```
 $ docker-compose up -d --build <app>
```
Der Befehl bildet die in der docker-compose.yml-Datei enthaltene Anwendungen und fährt den gesamten Container hoch. Jeder wieitere Aufruf, fügt die neue App dem Container hinzu. Der gesamte Vorgang nimmt einige Minuten in Anspruch. 


Der Anwendungsclient ist über http://localhost:3000 erreichbar.

##### Docker Compose
Die docker-compose.yml-Datei enthält Environment-Parameter die je nach Bedarf geändert werden können.
- Echtzeitserver
  - **APP_TYPE=application**
    | Hier kann der Typ des Echtzeitservers bestimmt werden. Es kann zwischen application und chat gewählt werden. 
  - **MONGO=mongodb://mongo_app:27017/rt_app**
    | DB connection String.
  - **ROUTER=http://172.20.128.10:3080/applications**
    | Jede Applikation muss die Verbindungsdaten des Routers kennen.
  - **PORT=3050**
  - **HOST=172.20.128.2**
    | Eigener Host.
  - **RT_CONSTRAIN=500**
    | Parameter der Echtzeitbedingung.
  - **MESSAGE_AWAITER=10**
    | Zeitlicher Abstand für das Senden von Nachrichten an den Spielserver.
- Spielserver
  - **MONGO=mongodb://mongo_backend:27017/bombremann_backend**
    | DB connection String.
  - **ROUTER=http://172.20.128.10:3080/applications**
    | Jede Applikation muss die Verbindungsdaten des Routers kennen.
  - **PORT=8080**
  - **HOST=172.20.128.5**
    | Eigener Host.
- Router
  - **MONGO=mongodb://mongo_router:27017/rt_router**
    | DB connection String.
  - **PORT=3080**

Die Angegeben Parameter sind für eine lokale Ausführung konfiguriert. Um die Anwendung in verteilten Instanzen betreiben zu können, sehen Sie den nächsten Punkt.

##### Verteilter Betrieb 
Im Gegensatz zu lokalem Betrieb müssen hier die docker-compose-Befehle einzeln ausgeführt werden.
Die docker-compose.yml-Dateien sind jeweils im Root-Folder der Anwendungen zu finden.

- Router: realtime_cluster\router\docker-compose.yml
- Echtzeitserver: realtime_cluster\rt_application\docker-compose.yml
- Spielserver: game\bombreman-backend\docker-compose.yml

Damit die Anwendung fehlerfrei arbeitet, müssen die einzelnen Komponenten in entprechender Reihenfolge gestartet werden.

1. Router
2. Echtzeitanwendungen
3. Spielserver
4. Spielclient

Der Docker-Container kann mit folgendem Befehl gestartet werden. 
```
 $ docker-compose up -d --build
```

Unter **src\components\consts\paths.ts** sind die Pfade für den Client zu finden. Dort liegen die Konstanten mit der Adresse des Routers und des Backends. Falls die Anwendung außerhalb des lokalen System betrieben wird oder andere Teile der Gesamtanwendung geändert wurden, müssen die Werte dementsprechend angepasst werden. Sehr wichtig ist es den **DEBUG** Parameter von _DEV_ auf _PROD_ zu wechseln. Wird der Wert nicht geändert so wird jeder Aufruf des Clients immer an den 'localhost' gesendet.

Öffnen Sie **game\bombremann**. Dort befindet sich das Dockerfile für die Anwendung.
Führen Sie den folgenden Befehl aus: 
```cmd
 $ docker build --tag bombremann:1.0 .
```
Damit wird, basierend auf den Angaben im Dockerfile, der Container gebildet.
Um die Anwendung zu starten, führen Sie den folgenden Befehl aus:
```cmd
$ docker run -it -p 3000:3000 --name Bombremann_client bombremann:1.0
```
Um den Container wieder zu entfernen benötigen Sie folgenden Befehl: 
```cmd
$ docker rm --force Bombremann_client
```
### HTTP or Websockets
In der theoretischen Ausarbeitung wird erwähnt, dass die Kommunikation zwischen Echtzeitserver und dem Spielserver entweder über Websockets oder über HTTP-Abfragen gestalten werden kann. 
Folgende Dateien müssen hierfür modifiziert werden:

  - \game\bombreman-backend\src\modules\get-rt-setup-and-connect-to-servers.ts
  - \realtime_cluster\rt_application\src\channels.ts

In der **get-rt-setup-and-connect-to-servers.ts**-Datei muss die Codestelle auskommentiert werden, die eine Socket-Verbindung aufbaut:

```typescript
  // Comment out for HTTP
 socket.on("backend-message created" , (data: any) => {
          console.log('NEW CLIENT INPUT')
          app
            .service("player-inputs")
            .create(data)
            .then(
              (snapshot: any) => 
                socket.emit('create','backend-inputs', snapshot)
            )
            .catch((err: any) => console.log(err))
          });
```

In der **channels.ts**-Datei sieht eine auf Websocket basierende Funktion folgerndermaßen aus: 
```typescript
  app.service("backend-message").publish("created", async (data: IMessageToBackend, context) => {
      app.set('lastsend', getTimeStamp());
      // comment in for HTTP function
      // await sendDataToBackend(data)
      // .then(async (response: IBackendResponse) => {
      //   if (validateRtConstrain(data.created_at, getTimeStamp())) {
      //     await app.service('backend-inputs').create(response);
      //   }
      // })
      // .catch((err: any) =>
      //   console.log("Error on sending new Input to Backend", err)
      // )
      // comment out for HTTP function
      return app.channel(data.channel)
    }
  );
```

Die Websocket-Verbindung ist die Standardeinstellung. Für eine auf HTTP-Aufrufen basierende Verbindung muss der Code folgendermaßen geändert werden:

```typescript
  app.service("backend-message").publish("created", async (data: IMessageToBackend, context) => {
      app.set('lastsend', getTimeStamp());
      // comment in for HTTP function
      await sendDataToBackend(data)
      .then(async (response: IBackendResponse) => {
        if (validateRtConstrain(data.created_at, getTimeStamp())) {
          await app.service('backend-inputs').create(response);
        }
      })
      .catch((err: any) =>
        console.log("Error on sending new Input to Backend", err)
      )
      // comment out for HTTP function
      // return app.channel(data.channel)
    }
  );
```