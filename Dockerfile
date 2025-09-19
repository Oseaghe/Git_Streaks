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

# -------- Stage 1: Build the JAR --------
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (cache-friendly)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the project and build
COPY src ./src
RUN mvn clean package -DskipTests

# -------- Stage 2: Run the JAR --------
FROM amazoncorretto:21-alpine
WORKDIR /app

# Copy only the JAR file from the build stage
COPY --from=build /app/target/Streaks-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
#eND