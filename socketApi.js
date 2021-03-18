var socket_io = require('socket.io');

var io = socket_io();
var socketApi = {};
const dreamHost = require("socket.io-client");
var os = require('os');
var ifaces = os.networkInterfaces();



require('events').EventEmitter.prototype._maxListeners = 100;

const {
    JSDOM
} = require("jsdom");
const {
    window
} = new JSDOM("");
const $ = require("jquery")(window);

var request = require('request');

request.post(
    'http://10.10.10.3/?json=true',
    { json: { machineID: "fMUVxYdG1X3hWb7GNkTd", mail: "talk2dug@gmail.com", pass: "UUnv9njxg123", function: "dash"} },
    function (error, response, d) {
        if (!error && response.statusCode == 200) {
            console.log(d.$user);
        }
    }
);

// "calibrated" occurs once, at the beginning of a session,

var panspeed = 4;


var sendData = 0;

var moment = require("moment")
var fileNameTImeStamp = moment().format("YYYY-MM-DD-HHmm");
      var name = "/mnt/drive/"+ fileNameTImeStamp+".mp4"
var spawn = require('child_process').spawn,
child = null;

var systemInfo = {
    "name":"DualCrimeCam",
    'id': 'jhgwesd',
    "ip":"192.168.196.164",
    "numOfCams":3,
    "typs":"standard",
    'sysInfo':{
        'DriveSpaceTB':2,
        'boardType': 'Pi4',
        'ramGB':4,
      },
      'location':{'lat': 38.65456, 'lng':  -77.435076},



}

var socket2 = dreamHost('http://192.168.196.123:3001/cameras', { autoConnect: true});
function intervalFunc() {
    socket2.emit('systemOnline',systemInfo)
  }
  
  setInterval(intervalFunc, 30000);

    
socket2.on("hi", function(data){
    console.log("HHHHIII")
   
})
function Startrecording(){


    

       child = spawn("ffmpeg", [
          "-hide_banner","-loglevel", "panic",
          "-i", "rtsp://admin:UUnv9njxg123@10.10.5.2:554/cam/realmonitor?channel=1&subtype=0",
           "-vcodec",  "copy",  "-f", "segment", "-strftime", "1", 
           "-segment_time", "600", "-segment_format", "mp4", "/home/pi/DualCrimCamera/public/videos/cam1/%Y-%m-%d_%H-%M.mp4"
      ]);
      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });



       child2 = spawn("ffmpeg", [
          "-hide_banner","-loglevel", "panic",
          "-i", "rtsp://admin:UUnv9njxg123@10.11.5.2:554/cam/realmonitor?channel=1&subtype=0",
           "-vcodec",  "copy",  "-f", "segment", "-strftime", "1", 
           "-segment_time", "600", "-segment_format", "mp4", "/home/pi/DualCrimCamera/public/videos/cam2/%Y-%m-%d_%H-%M.mp4"
      ]);
      child2.stdout.on('data', (data2) => {
        console.log(`stdout: ${data2}`);
    });
    child2.stderr.on('data', (data2) => {
        console.log(`stderr: ${data2}`);
    });


    child3 = spawn("ffmpeg", [
        "-hide_banner","-loglevel", "panic",
        "-i", "rtsp://admin:UUnv9njxg123@10.12.5.2:554/cam/realmonitor?channel=1&subtype=0",
         "-vcodec",  "copy",  "-f", "segment", "-strftime", "1", 
         "-segment_time", "600", "-segment_format", "mp4", "/home/pi/DualCrimCamera/public/videos/cam3/%Y-%m-%d_%H-%M.mp4"
    ]);
    child3.stdout.on('data', (data2) => {
      console.log(`stdout: ${data2}`);
  });
  child3.stderr.on('data', (data2) => {
      console.log(`stderr: ${data2}`);
  });
  }

    var datestamp = "";
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;

    });
    
var exec = require('child_process').exec;

function sendVideoandData() {
    var y;
    var videoFiles = []
    var ffmpeg = require('fluent-ffmpeg');
    exec('ls /home/pi/DualCrimCamera/public/videos/cam1' , function(error, stdout, stderr) {
      if (error){
        console.log(error)
      }
      if (!error){
          
          var newStringArray = stdout.split("\n")
          console.log("number of videos:  " + newStringArray.length)
          //newStringArray = toString(newStringArray)
            console.log(newStringArray.length)
            for(y=0;y<newStringArray.length;y++){
                if(newStringArray[y]){
                    console.log(newStringArray[y])
                    //WHY IS THIS NOT RIGHT... FIX ME
                    ffmpeg.ffprobe('/mnt/drive/cam1/'+newStringArray[y],function(err, metadata) {
                        //console.log(metadata);
                        var videoandData = {"fileName":newStringArray[y],"metaData":metadata}
                        videoFiles.push(videoandData)
                        socket2.emit("videoFileData",metadata )
                        console.log(videoFiles.length + " : " + newStringArray.length)
                        var numOfVideos = videoFiles.length + 1
                        if(numOfVideos===newStringArray.length){
                            console.log("done")
                            
                            socket2.emit("videoFileDataDone",'y' )
                            
                        } 
                        
                        if(err){}
                    }); 
                    
                }
                
                 
                   

            }
  
      }
    })

   
    

}
function sendVideoInfo(file, camera){
    console.log("Getting metaData")
    var ffmpeg = require('fluent-ffmpeg');
        ffmpeg.ffprobe(file,function(err, metadata) {
         
            var sendOBJ = {
                cam:camera,
                nodeinfo: systemInfo,
                metadata:metadata
    
               }
               console.log(sendOBJ)
            socket2.emit('videoInfo', sendOBJ)
       
            if(err){console.log(err)}
        }); 
    }
    var videoFilescam1 = []
    var videoFilescam2 = []
    var videoFilescam3 = []
    //send em
function sendVideoFiles(){
   
    exec('ls /home/pi/DualCrimCamera/public/videos/cam1' , function(error, stdout, stderr) {
      if (error){
        console.log(error)
      }
      if (!error){
          var newStringArray = stdout.split("\n")
          //newStringArray = toString(newStringArray)
            //console.log(newStringArray)
            for(y=0;y<newStringArray.length;y++){
                if(newStringArray[y]){
                    //console.log(newStringArray[y])
                    videoFilescam1.push(newStringArray[y])
                }
                if(y == newStringArray.length - 1){
                    socket2.emit("videoFilesCam1",videoFilescam1 )
                     videoFilescam1.length = 0;
                     setTimeout(() => {
                        exec('ls /home/pi/DualCrimCamera/public/videos/cam2' , function(error, stdout, stderr) {
                            if (error){
                              console.log(error)
                            }
                            if (!error){
                                var newStringArray = stdout.split("\n")
                                //newStringArray = toString(newStringArray)
                                  //console.log(newStringArray.length)
                                  for(y=0;y<newStringArray.length;y++){
                                      if(newStringArray[y]){
                                          //console.log(newStringArray[y])
                                          videoFilescam2.push(newStringArray[y])
                                      }
                                      if(y == newStringArray.length - 1){
                                          socket2.emit("videoFilesCam2",videoFilescam2 )
                                          videoFilescam2.length = 0;
                                          setTimeout(() => {
                                            exec('ls /home/pi/DualCrimCamera/public/videos/cam3' , function(error, stdout, stderr) {
                                                if (error){
                                                  console.log(error)
                                                }
                                                if (!error){
                                                    var newStringArray = stdout.split("\n")
                                                    //newStringArray = toString(newStringArray)
                                                      //console.log(newStringArray.length)
                                                      for(y=0;y<newStringArray.length;y++){
                                                          if(newStringArray[y]){
                                                             //console.log(newStringArray[y])
                                                              videoFilescam3.push(newStringArray[y])
                                                          }
                                                          if(y == newStringArray.length - 1){
                                                              socket2.emit("videoFilesCam3",videoFilescam3 )
                                                              videoFilescam3.length = 0;
                                                          }
                                                              
                                                             
                                          
                                                      }
                                            
                                                }
                                              })
                                          }, 30000);
                                          
                                      }
                                          
                                         
                      
                                  }
                        
                            }
                      
                          })
                     }, 30000);
                     
                     
                
                  
                }
                    
                   

            }
  
      }
    })
    
    
      
    
    
  


}


socket2.on('getVideoInfoCam1', function(data){
    var fileURI = "/home/pi/DualCrimCamera/public/videos/cam1/"+data
    sendVideoInfo(fileURI, 'camera1')
//console.log(fileURI)


})
socket2.on('getVideoInfoCam2', function(data){
    var fileURI = "/home/pi/DualCrimCamera/public/videos/cam2/"+data
    sendVideoInfo(fileURI, 'camera2')
    //console.log(fileURI)


})
socket2.on('getVideoInfoCam3', function(data){
    var fileURI = "/home/pi/DualCrimCamera/public/videos/cam3/"+data
    sendVideoInfo(fileURI, 'camera3')
    //console.log(fileURI)


})
socket2.on('getAllvideoandData', function(data){
    //console.log(data)
    sendVideoandData()
})
socket2.on('getVideos', function(data){
        sendVideoFiles()



    })
    socket2.on('status', function(data){
        if(data==='sendData'){
            sendData = 1

        }
        console.log(data)


    })
    socket2.on('recording', function(data) {
        console.log(data)
        if(data==="start"){

            Startrecording();
        }
        if(data==="stop"){

            child.kill('SIGINT');
            setTimeout(() => {
                sendVideoFiles()
            }, 2000);
          

        }
      })
   


      Startrecording();
      sendVideoFiles()


socketApi.io = io;
Startrecording()
module.exports = socketApi;