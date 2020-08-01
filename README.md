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
- iOS https://docs.docker.com/docker-for-mac/install/

#### Node.js & NPM
Der Client der Anwendung ist eine React-App. Um die benötigten Abhängigkeiten zu installieren und die Anwendung starten zu können, benötigt das Zielsystem den NPM Package-Manager. Außerdem verwendet der Teil der Anwendung Phaser.io. Um fehlerfreie Funktionalität von Phaser.io sicherzustellen wird Node.js ebenfalls benötigt. 

Falls Ihr System nicht über Node.js verfügt, laden Sie die neueste stable Version über die folgende URL runter.
- https://nodejs.org/en/download/

Folgen Sie den Anweisungen des Installers. Nach der erfolgreichen Installation können Sie die Applikation starten.

#### Starten der Anwendung
Damit die Anwendung fehlerfrei arbeitet, müssen die einzelnen Komponenten in entprechender Reihenfolge gestartet werden.

1. Router
2. Echtzeitanwendungen
3. Spielserver
4. Spielclient

Der Router wird ebenfalls wie alle anderen Anwendungen über Docker-Compose gestartet. Der Docker-Container kann mit folgendem Befehl gestartet werden. 

```
 docker-compose up --build
```
Der Befehl bildet die in der docker-compose.yml-Datei enthaltenen Anwendungen und fährt den Container hoch.

##### Docker Compose
Die docker-compose.yml-Dateien enthalten Environment-Parameter die je nach Bedarf geändert werden können.
- Echtzeitserver
  - **APP_TYPE=application**
    | Hier kann der Typ des Echtzeitservers bestimmt werden. Es kann zwischen 'application' und 'chat' entschieden werden. 
  - **MONGO=mongodb://mongo_app:27017/rt_app**
    | DB connection String.
  - **ROUTER=http://host.docker.internal:3080/applications**
    | Jede Applikation muss die Verbindungsdaten des Routers kennen.
  - **PORT=3050**
  - **HOST=host.docker.internal**
    | Eigener Host.
  - **RT_CONSTRAIN=500**
    | Parameter der Echtzeitbedingung.
  - **MESSAGE_AWAITER=10**
    | Zeitlicher Abstand für das Senden von Nachrichten an den Spielserver.
- Spielserver
  - **MONGO=mongodb://mongo_backend:27017/bombremann_backend**
    | DB connection String.
  - **ROUTER=http://host.docker.internal:3080/applications**
    | Jede Applikation muss die Verbindungsdaten des Routers kennen.
  - **PORT=8080**
  - **HOST=host.docker.internal**
    | Eigener Host.
- Router
  - **MONGO=mongodb://mongo_router:27017/rt_router**
    | DB connection String.
  - **PORT=3080**

Der String 'host.docker.internal' wird durch Docker als der Host der **lokalen** **Maschine** aufgelöst. Der String muss geändert werden wenn die Anwendung verteilt betrieben wird oder Zugriffe von außen ermöglicht werden!  

Die docker-compose.yml-Dateien sind jeweils im Root-Folder der Anwendungen zu finden.

- Router: realtime_cluster\router\docker-compose.yml
- Echtzeitserver: realtime_cluster\rt_application\docker-compose.yml
- Spielserver: game\bombreman-backend\docker-compose.yml

##### Spielclient
Unter **src\components\consts\paths.ts** sind die Pfade für den Client zu finden. Dort liegen die Konstanten mit der Adresse des Routers und des Backends. Falls die Anwendung außerhalb des lokalen System betrieben wird oder andere Teile der Gesamtanwendung geändert wurden, müssen die Werte dementsprechend angepasst werden.

Öffnen Sie **game\bombremann**. Dort befindet sich das Dockerfile für die Anwendung.
Führen Sie den folgenden Befehl aus: 
```cmd
docker build --tag bombremann:1.0 .
```
Damit wird, basierend auf den Angaben im Dockerfile, der Container gebildet.
Um die Anwendung zu starten, führen Sie den folgenden Befehl aus:
```cmd
docker run -it -p 3000:3000 --name Bombremann_client bombremann:1.0
```
Um den Container wieder zu entfernen benötigen Sie folgenden Befehl: 
```cmd
docker rm --force Bombremann_client
```
### HTTP or Websockets
In der theoretischen Ausarbeitung wird erwähnt, dass die Kommunikation zwischen Echtzeitserver und dem Spielserver entweder über Websockets oder über HTTP-Abfragen gestalten werden kann. 
Folgende Dateien müssen hierfür modifiziert werden:

  - \game\bombreman-backend\src\modules\get-rt-setup-and-connect-to-servers.ts
  - \realtime_cluster\rt_application\src\channels.ts

In der **get-rt-setup-and-connect-to-servers.ts**-Datei muss die Codestelle auskommentiert werden die eine Socket-Verbindung aufbaut:

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