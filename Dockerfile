 FROM eclipse-temurin:21-jdk-alpine AS build

 WORKDIR /app

 RUN $JAVA_HOME/bin/jlink \
          --add-modules ALL-MODULE-PATH \
          --strip-debug \
          --no-man-pages \
          --no-header-files \
          --compress=2 \
          --output /opt/jdk

 FROM alpine:latest

 COPY --from=build /opt/jdk /opt/jdk

 ENV JAVA_HOME=/opt/jdk
 ENV PATH="${JAVA_HOME}/bin:${PATH}"

 COPY target/*.jar app.jar

 EXPOSE 8080

 ENTRYPOINT ["java", "-jar", "app.jar"]