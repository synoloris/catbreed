# Basis-Image
FROM openjdk:21-jdk-slim AS build

# Arbeitsverzeichnis setzen
WORKDIR /usr/src/app

# Projektdateien kopieren
COPY . .

# Build der Anwendung, ohne Tests
RUN ./mvnw -Dmaven.test.skip=true package

# Multistage-Build: Nur notwendige Dateien in das finale Image kopieren
FROM openjdk:21-jdk-slim

# Arbeitsverzeichnis setzen
WORKDIR /usr/src/app

# JAR-Datei vom Build-Image kopieren
COPY --from=build /usr/src/app/target/catbreed-0.0.1-SNAPSHOT.jar /usr/src/app/catbreed-0.0.1-SNAPSHOT.jar

# Zusätzliche benötigte Dateien kopieren
COPY azure-model /usr/src/app/azure-model

# Exponiere den Port
EXPOSE 8080

# Startbefehl
CMD ["java", "-jar", "/usr/src/app/catbreed-0.0.1-SNAPSHOT.jar"]
