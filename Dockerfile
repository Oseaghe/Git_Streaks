# Stage 1: Build the application
FROM maven:3.8.2-jdk-11 AS build
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create the final image
FROM openjdk:11-jdk-slim
COPY --from=build /target/streaks-0.0.1-SNAPSHOT.jar demo.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "demo.jar"]