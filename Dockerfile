FROM openjdk:21-jdk-slim
# Copy Files
WORKDIR /usr/src/app
COPY . .
# Install
RUN ./mvnw -Dmaven.test.skip=true package
# Docker Run Command
#COPY --from=build /usr/src/app/target/catbreed-0.0.1-SNAPSHOT.jar /usr/src/app/catbreed-0.0.1-SNAPSHOT.jar

COPY azure-model /usr/src/app/azure-model

EXPOSE 8080
CMD ["java","-jar","/usr/src/app/target/catbreed-0.0.1-SNAPSHOT.jar"]
