$(document).ready( function() {
    /**
     * @function toMaster - sends the new player with drum samples to the Master channel to be used in the drum sequencer 
     */ 
    var keys = new Tone.Players({
        "kick" : "./audio/trapkit/Kicks/Kick-30.wav",
        "snare" : "./audio/trapkit/Snares/Snare-16.wav",
        "tom" : "./audio/trapkit/Toms/Toms-01.wav",
        "clap" : "./audio/trapkit/Claps/Claps-02.wav",
        "open_hat" : "./audio/trapkit/Open Hats/OpenHats-06.wav",
        "hi_hat" : "./audio/trapkit/Hats/Hats-09.wav",
        "crash" : "./audio/trapkit/Crashes/Crashes-08.wav",
        "ride" : "./audio/trapkit/Rides/Rides-03.wav"
    }, {
        "volume" : -10,
        "fadeOut" : "64n",
    }).toMaster();
    var noteNames = ["kick", "snare", "tom", "clap", "open_hat", "hi_hat", "crash", "ride"];
    var loop = new Tone.Sequence(function(time, col){
        var column = matrix1.matrix[col];
        for (var i = 0; i < 8; i++){
            if (column[i] === 1){
                var vel = Math.random() * 0.5 + 0.5;
                keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);
            }
        }
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");
    Tone.Transport.start();
    /**
     * @function onload - creates a matrix of squares when the page loads  
     */ 
    nx.onload = function(){
        nx.colorize("#70D1EE");
        
        matrix1.col = 16;
        matrix1.row = 8;
        matrix1.init();
        // matrix1.resize($("#Content").width(), 400);
        matrix1.draw();
    }
    /**
     * @function Slider - creates a tempo slider that sets the value of the bpm
     */ 
    Interface.Slider({
        name : "TEMPO",
        min : 60,
        max : 180,
        value : Tone.Transport.bpm.value,
        drag : function(val){
            Tone.Transport.bpm.value = val;
        }
    });
    /**
     * @function Button - creates a play/pause  toggle button that also saves the beat when toggled
     */
    Interface.Button({
        text : "PLAY",
        activeText : "PAUSE",
        type : "toggle",
        key : 32, //spacebar
        start : function(){
            loop.start();
            let beat=matrix1.matrix;
            let username = iflogged;
            let newBeat = {
                array: JSON.stringify(matrix1.matrix),
                beatOwner: username
            }
            $.ajax({url: '/api/beats', method: 'POST', data: newBeat})
            if (Tone.context.state !== 'running') {
                Tone.context.resume();
            }
        },
        end : function(){
            loop.stop();
        },
    });

});
