## Stage 1: Build the application
#FROM maven:3.9-amazoncorretto-24 AS build
#WORKDIR /app
#COPY pom.xml .
#COPY .env /app/.env
#COPY src ./src
#RUN mvn clean package -DskipTests
#
## Stage 2: Create the final image
#FROM amazoncorretto:24-alpine
#WORKDIR /app
#COPY --from=build /app/target/*.jar app.jar
#ENV PORT=8080
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "app.jar"]

FROM amazoncorretto:24-alpine

WORKDIR /app
COPY target/Streaks-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

 CMD ["java", "-jar", "app.jar"]