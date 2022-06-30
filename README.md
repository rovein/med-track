# Software System for Medicines Storage and Condition Control

Project created during preparation of the undergraduate thesis to obtain a Bachelor`s degree in Software Engineering in NURE.

The system consists of Backend, Frontend, and Smart Device / IoT.

UML designs are located [here](https://drive.google.com/drive/folders/1oND9D8d4JCmU8CpJ2MltN9jdYEvPRENK?usp=sharing).

# Technologies and details

1. The backend was implemented using Java 11, Spring Boot, Spring MVC, Spring Data JPA (PostgreSQL Driver), Spring Security, JWT, Maven, Lombok, Apache Commons, javax.mail. REST architectural style and REST API was implemented, documentation using Swagger. Backend was implemented mostly using functional programming concepts, and technologies like Stream API, Functional Interfaces, Optional API. Logging is provided by Log4j. ResponseEntityExceptionHandler was used for exceptions translations to HTTP responses. For testing purposes used JUnit and Mockito.
2. The frontend was implemented using React and JavaScript, used some libraries for loading files, modals, animating loaders and progress bars. Building with npm. Axios library is used for HTTP communication. React Components are developed with using of the React Hooks and JS Functions. 
3. For Smart Device was used Arduino Uno R3, Ethernet module for network communication, DHT11 humidity and temperature sensor, as well as some related libraries.

Communication established via HTTP protocol, that is, the web client interacts with the server via axios API, IoT via EthernetClient and plain HTTP request.

# Implemented features

Briefly about the implemented functions: registration, authorization, profile management, all CRUD operations, sending letters to mail, administration functions: managing user accounts, blocking accounts, obtaining a backup copy of the database, configuring Smart Device / IoT.<br>
Business logic: system has two user roles: medicines provider and administrator. Medicines provider stores his medicined in placements in some warehouses. Each placement has one connected smart device to it, which is configured by the admin. Each medicine has the storage conditions: min, max temperature and max humidity. The conditions in the placement must be at that range to be satisfactory. Smart Device reads indicators of the temperature and humidity and sends it to the Backend. Backend updates indicators and runs a check for all the medicines in current placement. If indicators are no longer satisfactory, then server finds all appropriate placements to move a medicine in and constructs an email-notification with a table definition of this data. Then a notification is sent to the user.

## How to run
1. Backend  
    In backend root directory run next terminal command:<br>
    ``mvn spring-boot:run``<br>
    (note: [Maven](https://www.baeldung.com/install-maven-on-windows-linux-mac) has to be installed)<br>
    Script for initializing the database is located at the `med-track-backend/src/main/resources/db/tables_init.sql`<br>
    Database properties are located at the `application.properties` file <br>
    Then you can navigate to the http://localhost:8181/swagger-ui.html and check backend **REST API**.  
2. Frontend  
    - [install](https://phoenixnap.com/kb/install-node-js-npm-on-windows) **node.js** and **npm**
    - in frontend root directory run ```npm install```
    - in frontend root directory run ```npm start```
    - navigate to http://localhost:3000


