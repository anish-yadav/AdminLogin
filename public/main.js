
 document.body.style.backgroundColor = "#191919"

$(function() {
    $('#changeTheme').change(function() {
        if(document.body.style.backgroundColor !== "rgb(255, 255, 255)")
        { 
            if( document.getElementById("loginImg")) {
                document.getElementById("loginImg").src = "./img/smile-beam-regular.svg";
                passInput.onfocus = () =>{
                    document.getElementById("loginImg").src = "./img/smile-beam-regular.svg";
                   
               }
               
               userInput.onfocus = () => {
                   document.getElementById("loginImg").src = "./img/laugh-regular-dark.svg";
                   
               }
            }
            
         document.body.style.backgroundColor = "#fff";
         if($("h3") )
         $("h3")[0].style.color = "#000";
        }
         else  {
            if( document.getElementById("loginImg"))
            document.getElementById("loginImg").src = "./img/smile-beam-regular-white.svg";

            document.body.style.backgroundColor = "#191919"
            if($("h3") )
             $("h3")[0].style.color = "#fff";
         }
        
    })
  })