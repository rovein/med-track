#include <SPI.h>
#include <Ethernet.h>
#include "DHT.h"
#include <TextFinder.h>
#include <ArduinoJson.h>

#define DHT_PIN A5

const byte mac[] = {0x90, 0xA2, 0xDA, 0x00, 0x82, 0x7A};
IPAddress server;
unsigned int id;
unsigned int port;

IPAddress arduinoIp(192, 168, 1, 177);
IPAddress myDns(192, 168, 0, 1);
EthernetClient client;
EthernetServer arduinoServer(80);
boolean isDeviceConfigured = false;

byte firstByte;
byte secondByte;
byte thirdByte;
byte fourthByte;
String readString = String(30);

DHT dht(DHT_PIN, DHT11);

void setup() {
    Serial.begin(9600);

    while (!Serial) {}

    dht.begin();

    Serial.println("Створення Інтернет з'єднання DHCP:");

    Ethernet.begin(mac, arduinoIp);
    Serial.print(" встановлений IP ");
    Serial.println(Ethernet.localIP());
    arduinoServer.begin();

    Serial.println("Смарт-пристрій функціонує у стані сервера.");
    Serial.println("Очікується запит на конфігурацію від адміністратора...");
    while (!isDeviceConfigured) {
        EthernetClient frontendWebClient = arduinoServer.available();
        if (frontendWebClient) {
            TextFinder finder(frontendWebClient);
            while (frontendWebClient.connected()) {
                if (frontendWebClient.available()) {
                    if (finder.find("GET")) {
                        initConfigParams(finder);
                        server = IPAddress(firstByte, secondByte, thirdByte, fourthByte);
                        isDeviceConfigured = true;

                        frontendWebClient.println("HTTP/1.1 200 OK");
                        frontendWebClient.println("Content-Type: text/plain");
                        frontendWebClient.println("Access-Control-Allow-Origin: *");
                        frontendWebClient.println();
                        frontendWebClient.println("Smart device was successfully configured!");
                        frontendWebClient.stop();
                    }
                }
            }
        }
    }

    Serial.println("Перехід до стану клієнта...");
    Serial.print("Під'єднання до ");
    Serial.print(server);
    Serial.print(":");
    Serial.print(port);
    Serial.println("...");

    delay(1000);

    if (client.connect(server, port)) {
        Serial.print("Під'єднано до ");
        Serial.println(client.remoteIP());
    } else {
        Serial.println("Зв'язок з сервером не вдалося встановити");
    }
}

void loop() {
    if (client.connect(server, port)) {
        float humidity = dht.readHumidity();
        float temperature = dht.readTemperature();
        Serial.println(
            "Температура: " + String(temperature) + " *C\t" +
            "Вологість: " + String(humidity) + " %\t");

        const size_t capacity = JSON_OBJECT_SIZE(3);
        DynamicJsonBuffer jsonBuffer(capacity);

        JsonObject &root = jsonBuffer.createObject();
        root["id"] = id;
        root["temperature"] = temperature;
        root["humidity"] = humidity;

        String data;
        root.printTo(data);

        client.println("POST /device HTTP/1.1");
        client.println("Host: localhost");
        client.println("User-Agent: Arduino/1.0");
        client.println("Connection: close");
        client.println("Content-Type: application/json");
        client.print("Content-Length: ");
        client.println(data.length());
        client.println();
        client.println(data);

        printResponse(client);
    }

    delay(10000);
}

void initConfigParams(TextFinder finder) {
    if (finder.find("firstByte=")) {
        firstByte = finder.getValue();
    }
    if (finder.find("secondByte=")) {
        secondByte = finder.getValue();
    }
    if (finder.find("thirdByte=")) {
        thirdByte = finder.getValue();
    }
    if (finder.find("fourthByte=")) {
        fourthByte = finder.getValue();
    }
    if (finder.find("port=")) {
        port = finder.getValue();
    }
    if (finder.find("placementId=")) {
        id = finder.getValue();
    }
}

void printResponse(EthernetClient client) {
    while (client.connected()) {
        if (client.available()) {
            char c = client.read();
            Serial.print(c);
        }
    }
}
