FROM openjdk:10-jdk

ADD /target/full-stack-backend-0.0.1-SNAPSHOT.jar /dockerfs/app/full-stack-backend-0.0.1-SNAPSHOT.jar

WORKDIR /dockerfs/app

ENTRYPOINT ["java","-jar", "full-stack-backend-0.0.1-SNAPSHOT.jar"]