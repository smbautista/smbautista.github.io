import paho.mqtt.client as mqtt
import time

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

client = mqtt.Client()
client.on_connect = on_connect

client.connect("test.mosquitto.org", 1883, 60)

time.sleep(1)
count = 0
while True:
    client.loop()
    message = input("Enter your message here:")
    client.publish("sarah/sample", message)
    
  

    print(count)
    time.sleep(1)
    count += 1