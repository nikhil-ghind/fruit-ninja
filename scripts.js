//scripts.js

var score;
var playing=false;
var fruits=['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var trailsLeft;
var action;    //variable for setInterval
var step;

$(function(){
   $("#startreset").click(function(){
      if(playing==true)
         {
            //I want to reset
            location.reload();
         }
      else{
         //I want to play
         playing=true;
         score=0;
         $("#scorevalue").text(score);
         trailsLeft=3;
         $("#trialsLeft").show();
         addHearts();
         $("#gameOver").hide();
         $("#startreset").text("Reset Game");
         //Start sending fruits
         startAction();
      }
   });
   
   function addHearts(){
      //there was a bug in append hence used a empty function
      
      $("#trialsLeft").empty();
      for(i=0;i<trailsLeft;i++){
         $("#trialsLeft").append("<img src='images/heart.png' class='life'>");
      }
   }
   
   $("#fruit1").mouseover(function(){
      score++;
      $("#scorevalue").text(score);
//      document.getElementById("slicesound").play();
      $("#slicesound")[0].play();
      stopAction();
      $("#fruit1").hide("explode",500);
      //again start sending the fruits
      setTimeout(startAction,600);
      //startAction is passed without brackets as if there arec barckets it will call function without waiting.
   });
   function startAction(){
      $("#fruit1").show();
      chooseFruit();
      $("#fruit1").css({
         'left':Math.round(Math.random()*550),
         'top':-60,
      });
      step=1+Math.round(Math.random()*5);
      action=setInterval(function(){
         $("#fruit1").css("top",$("#fruit1").position().top+step);
         if($("#fruit1").position().top>$("#fruitsContainer").height()){
            //check if we have trailsleft or not
            if(trailsLeft>1){
               //generate a fruitv again and reduce the life
               //bug may occur here!!!
               chooseFruit();
                 $("#fruit1").css({
            'left':Math.round(Math.random()*550),
            'top':-60,
            });
            step=1+Math.round(Math.random()*5);
               trailsLeft--;
               addHearts();
            }else{
               //game over
               playing=false;
               $("#startreset").text("Start Game");
               $("#gameOver").show();
               $("#gameOver").html("<p>Game Over!</p><p>Your Score "+score+"</p>");
               $("#trialsLeft").hide();
               $("#scorevalue").text("");
               
            }
         }
      },12);
   }
   
   function chooseFruit(){
      $("#fruit1").attr("src",'images/'+fruits[Math.round(Math.random()*(fruits.length-1))]+'.png');
   }
   function stopAction(){
      clearInterval(action);
   }
});