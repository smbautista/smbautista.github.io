let address = $("#address").val("wss://test.mosquitto.org:8081/mqtt");
let connectBtn = $("#connect");
let publishBtn = $("#publish");
let subscribeBtn = $("#subscribe");


connectBtn.click(function () {
  address = $("#address").val();
  var client = mqtt.connect(address);
  let status = $("#status");
  status.val("Connecting ...");
  client.on('connect', function () {
    console.log("Connected!");
    status.val("Connected!");
  });

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    let parent = $("#incoming");
    appendData(topic,message,parent);
  })

  let payload;
  publishBtn.click(function () {
    let topic = $("#pubTopic");
    payload = $("#payloadPub");
    let parent = $("#publishTable");
    appendData(topic.val(),payload.val(),parent);
    client.publish(topic.val(), payload.val());
  });
  
  subscribeBtn.click(function () {
    let topic = $("#topicSub");
    let parent = $("#subTable");
    appendData(topic.val(),undefined,parent);
    client.subscribe(topic.val());
  });


});

function appendData(topic,payload = undefined,parent){
    let date = new Date();
    let data;
    if(payload == undefined){
      data = "<tr><td>"+topic+"</td><td>"+date.toGMTString()+"</td></tr>"
    }else{
      data = "<tr><td>"+topic+"</td><td>"+payload+"</td><td>"+date.toGMTString()+"</td></tr>"
    }
    parent.append(data);
}


