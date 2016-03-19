var menu_state = {  
    create: function() {
        // Call the 'start' function when pressing the spacebar
        background = game.add.tileSprite(0, 0, 400, 490, "background");    

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        if(this.game.input.pointer1.isDown){
            this.start();
        }

        // Defining variables
        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y-50, "Press space to start", style);
        text.anchor.setTo(0.5, 0.5); 

        // If the user already played
        if (localStorage.getItem("highscore") > 0) {
            // Display its score
            if(score > 0){
                var score_label = this.game.add.text(x, y+50, "score: " + score, style);
            } else {
                var score_label = this.game.add.text(x, y+50, "", style);
            }
            var high_score_label = this.game.add.text(x, y+50, "high score: " + localStorage.getItem("highscore"), style);
            score_label.anchor.setTo(0.5, 2);
            high_score_label.anchor.setTo(0.5, 0.5);  
        }
    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};