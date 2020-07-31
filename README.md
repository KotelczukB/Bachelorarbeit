# README Bachelorarbeit
### Titel der Arbeit: Webbasierter Echtzeitserver für ein Multiplayer-System
#
### Erläuterung
Das Repository ist ein Teil der von Bartosz-Krzysztof Kotelczuk eigenständig verfassten Bachelorarbeit. Das Repository enthält den Prototypen der Echtzeitservers samt des Multiplayer-Systems in der Form eines Browsermultiplayerspiels.

Zusätzlich wurden hier alle Blogs und online Quellen, die zum Zeitpunkt des letzten Aufrufs kopiert wurden, hier abgelegt.

### How to start
#### Docker
Da der Echtzeitcluster und der Spielserver dockerized wurden muss auf dem Zielsystem docker installiert sein. 
Falls Sie noch kein Docker haben folgen Sie einer der Installationsanweisungen.

- Linux / Ubuntu https://docs.docker.com/engine/install/ubuntu/
- Windows https://docs.docker.com/docker-for-windows/install/
- iOS https://docs.docker.com/docker-for-mac/install/

#### Node.js & NPM
Der Client der Anwendung ist eine React app. Um die benötigten Abhängigkeiten zu installieren und die Anwendung starten zu können, benötigt das Zielsystem den NPM package manager. Hinzu verwendet der Teil der Anwendung Phaser.io. Um fehlerfreie Funktionalität von Phaser.io sicher zu stellen wird Node.js ebenfalls benötigt. 

Falls Ihr System nicht über Node.js verfügt laden Sie die neueste stable Version über die folgende URL runter.
- https://nodejs.org/en/download/

Folgen Sie den Anweisungen des Installers. Nach der erfolgreichen Installation können sie die Aplikation starten.

#### Starten der Anwendung
Damit die Anwendung fehlerfrei startet müssen die einzelnen Komponenten in entprechender Reihenfolge gestartet werden.

1. Router
2. Echtzeitanwendungen
3. Spielserver
4. Spielclient

Der Router wird ebenfalls wie alle anderen Anwendungen über Docker Compose gestartet. Der Docker container kann mit folgendem befehl gestartet werden. 
```
 docker-compose up --build
```
Der Befehl bildet die in der docker-compose enthaltenen Anwendungen und fährt den Container hoch.

##### Docker Compose
Die docker-compose.yml-Dateien enthalten environment Parameter die je nach Bedarf geändert werden können
- Echtzeitserver
  - **APP_TYPE=application**
    | Hier kann der Typ es Echtzeit server bestimmt werden. Die andere Variante ist 'chat'.
  - **MONGO=mongodb://mongo_app:27017/rt_app**
    | DB connection string.
  - **ROUTER=http://host.docker.internal:3080/applications**
    | Jede application muss die Verbindungsdaten des Routers kennen.
  - **PORT=3050**
  - **HOST=host.docker.internal**
    | Eigener Host.
  - **RT_CONSTRAIN=500**
    | Echtzeitbedingung parameter.
  - **MESSAGE_AWAITER=10**
    | Zeitlicher Abstand fpr das Senden von Nachrichten an das Backend.
- Spielserver
  - **MONGO=mongodb://mongo_backend:27017/bombremann_backend**
    | DB connection string.
  - **ROUTER=http://host.docker.internal:3080/applications**
    | Jede application muss die Verbindungsdaten des Routers kennen.
  - **PORT=8080**
  - **HOST=host.docker.internal**
    | Eigener Host.
- Router
  - **MONGO=mongodb://mongo_router:27017/rt_router**
    | DB connection string.
  - **PORT=3080**

Der string 'host.docker.internal' wird durch docker als der host der **lokalen** **Maschiene** aufgelöst. Der string muss geändert werden wenn die Anwendung verteilt betrieben wird oder Zugriffe von außen ermöglicht werden!  

Die docker-compose.yml-Dateien sind jeweils im Root-Folder der Anwendungen zu finden.

- Router: realtime_cluster\router\docker-compose.yml
- Echtzeitserver: realtime_cluster\rt_application\docker-compose.yml
- Spielserver: game\bombreman-backend\docker-compose.yml

Für den Spielclient werden ein paar mehr Schritte benötigt

##### Spielclient
Gehen Sie in game\bombremann dort befindent sich das Dockerfile für die Anwendung.
Führen Sie den folgenden Befehl aus: 
```cmd
docker build --tag bombremann:1.0 .
```
Das bildet den basierend auf den Angaben im dockerfile den Container.
Um die Anwendung zu starten, führen Sie den folgenden Befehl aus:
```cmd
docker run --publish 3000:3000 --detach --name Bombremann_client bombremann:1.0
```
Um den Container wieder zu entfernen benötigen Sie das folgende: 
```cmd
docker rm --force Bombremann_client
```
### HTTP or Websockets
In der theoretischen Ausarbeitung der Bachelorarbeit ist die Rede davon, dass der Echtzeitserver und der Spielserver ihre Kommunikation entweder über Websockets oder über HTTP-Abfragen gestallten können. 
Die foldenden Schritte werden benötigt um die Kommunikationsart zu ändern.

Folgende Dateien müssen modifiziert werden.

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

In der **channels.ts**-Datei sieht eine auf Websocket basierende Funktion folgend aus 
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

Dies ist auch die default Einstellung. Für eine auf HTTP-Aufrufen basierende Verbindung muss der Code folgend geändert werden:

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