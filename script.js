    let character = document.getElementById("character");
    let object = document.getElementById("object");
    let ground = document.getElementById("ground");
    let background = document.getElementById("background");
    let menu1 = document.getElementById("menu1");
    let menu2 = document.getElementById("menu2");
    let scoreboard = document.getElementById("score");
    let gamescore = document.getElementById("gamescore");

    var BGM_Menu = document.getElementById("BGM_Menu");
    var BGM_Game = document.getElementById("BGM_Game");
    var BGFX_EndQuak = document.getElementById("BGFX_EndQuak");
    var BGFX_JumpQuak1 = document.getElementById("BGFX_JumpQuak1");
    var BGFX_JumpQuak2 = document.getElementById("BGFX_JumpQuak2");
    var BGFX_JumpQuak3 = document.getElementById("BGFX_JumpQuak3");

    let highscore = 0;
    let score = 0;
    let isPlaying = false;

    background.classList.add("terrainAnim");
    ground.classList.add("terrainAnim");
    
    function start(){
        BGM_Game.currentTime = 0;
        BGM_Menu.pause();
        BGM_Game.play();
        score = 0;
        scoreboard.style.display = "block";
        character.classList.remove("hitAnim");
        menu1.style.display = "none";
        menu2.style.display = "none";
        isPlaying = true;
        character.style.display = "block";
        object.style.display = "block";
        character.classList.add("walkAnim");
        object.classList.add("objectAnim");
    }

    function gameOver(){
        isPlaying = false;
        if(highscore < Math.ceil(score/100)){
            gamescore.innerHTML = "NEW HIGH SCORE<br>Your Score : "+Math.ceil(score/100)+"<br>High Score : "+highscore;
            highscore = Math.ceil(score/100);
        } else {
            gamescore.innerHTML = "Your Score : "+Math.ceil(score/100)+"<br>High Score : "+highscore;
        }
        character.style.display = "none";
        character.style.display = "none";
        menu2.style.display = "block";
    }

    function menu(){
        BGM_Menu.currentTime = 0;
        BGM_Game.pause();
        BGM_Menu.play();
        isPlaying = false;
        menu2.style.display = "none";
        menu1.style.display = "block";
    }

    document.addEventListener("click", jump);
    function jump() {
        if (!isPlaying){return;} 
        if (character.classList.contains("jumpAnim")){return;} 
        character.classList.remove("walkAnim");
        character.classList.add("jumpAnim");
        let rand = Math.floor(Math.random() * 3);
        switch (rand) {
            case 0: 
                BGFX_JumpQuak1.play();
                break;
            case 1: 
                BGFX_JumpQuak1.play();
                break;
            case 2: 
                BGFX_JumpQuak1.play();
                break;
            default:
        }
        setTimeout(() => {
            character.classList.remove("jumpAnim");
            character.classList.add("walkAnim");
        },1000);
    }

    let activeRender = setInterval(function() {
        let charTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let objectLeft = parseInt(window.getComputedStyle(object).getPropertyValue("left"));
    
        //Hit Detector
        if(objectLeft<60 && objectLeft>30  && charTop>125){
            scoreboard.style.display = "none";
            isPlaying = false;
            object.classList.remove("objectAnim");
            character.classList.remove("walkAnim");
            character.classList.remove("jumpAnim");
            character.classList.add("hitAnim");
            BGFX_EndQuak.play();
            setTimeout(() => {
                gameOver();
            }, 1000);
        } 

        //Generate Random Object
        if(objectLeft < -20){
            let rand = Math.floor(Math.random() * 2);
            switch (rand) {
                case 0: 
                    object.style.backgroundImage = "url('images/wheel.png')";
                    break;
                case 1: 
                    object.style.backgroundImage = "url('images/rock.png')";
                    break;
                default:
            }
        }

        // Score counter
        if (isPlaying){
            scoreboard.innerHTML = "Score: " + Math.ceil(score/100) +" || "+highscore;
            score++;
        } 
    }, 1);
menu();