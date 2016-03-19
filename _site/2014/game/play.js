var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() { 
        background = game.add.tileSprite(0, 0, 400, 490, "background");    
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 
        if(this.game.input.pointer1.isDown){
            this.jump();
        }

        this.pipes = game.add.group();
        this.pipes.createMultiple(1, 'logopipe');
        this.pipes.createMultiple(4, 'pipe');
        this.pipes.createMultiple(2, 'logopipe');
        this.pipes.createMultiple(4, 'pipe');
        this.pipes.createMultiple(1, 'logopipe');
        this.pipes.createMultiple(8, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           

        this.bird = this.game.add.sprite(100, 245, 'coli');
        this.bird.body.gravity.y = 1150; 
        this.bird.anchor.setTo(-0.2, 0.5);

        // No 'this.score', but just 'score'
        score = 0;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style);
        this.label_high_score_title = this.game.add.text(300, 20, "HI:", style);   
        this.label_high_score = this.game.add.text(350, 20, localStorage.getItem("highscore"), style);

        canvas = game.add.graphics(0,0);
    },

    update: function() {
        canvas.clear();
        canvas.lineStyle(2,0xffffff,1);
        var headX=this.bird.x+15;
        var headY=this.bird.y+7;
        var headX2=this.bird.x+15;
        var headY2=this.bird.y+15;
        nodes[0]={
            x:headX,
            y:headY
        };
        nodes2[0]={
            x:headX2,
            y:headY2
        };

        var nodeAngle = 0;

        canvas.moveTo(headX,headY);
        for(i=1;i<tailNodes-(Math.max(1,(100-score*4)));i++){
            nodeAngle = Math.atan2(nodes[i].y-nodes[i-1].y,nodes[i].x-nodes[i-1].x);
            nodes[i]={
                x: nodes[i-1].x-0.4+tailLength*Math.cos(nodeAngle),
                y: nodes[i-1].y+tailLength*Math.sin(nodeAngle) 
            }
            canvas.lineTo(nodes[i].x,nodes[i].y);
        }

        if(score > 5){
            canvas.moveTo(headX2,headY2);
            for(i=1;i<tailNodes2-(Math.max(1,(70-score*2)));i++){
                nodeAngle = Math.atan2(nodes2[i].y-nodes2[i-1].y,nodes2[i].x-nodes2[i-1].x);
                nodes2[i]={
                    x: nodes2[i-1].x-0.6+tailLength*Math.cos(nodeAngle),
                    y: nodes2[i-1].y+tailLength*Math.sin(nodeAngle) 
                }
                canvas.lineTo(nodes2[i].x,nodes2[i].y);
            }
        }
        if (this.bird.inWorld == false){
            this.check_highscore();
            this.restart_game(); 
        }

        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
    },

    jump: function() {
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.check_highscore();

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    check_highscore: function(){
        if (score > localStorage.getItem("highscore")){
            localStorage.setItem("highscore", score);
            this.label_high_score.content = localStorage.getItem("highscore");  
        }
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.add_one_pipe(400, i*60+10);   

        // No 'this.score', but just 'score'
        score += 1; 
        this.label_score.content = score;  
    }
};