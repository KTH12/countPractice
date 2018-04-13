document.addEventListener('DOMContentLoaded',function(){

    var lib = (function() {
        var app = document.getElementById('content');
        var indexDom = document.getElementById('index'); 
        var arrDom = document.getElementById('arr');
        
        var arr = [];
        var currentIndex = 0;
        var actions = {
            "ArrowLeft" : ArrowLeft,
            "ArrowRight": ArrowRight,
            "Push" : Push,
            "eventAction":eventAction
        }


        function Push(key){
            var changerNumber = parseInt(key);
            if(!Number.isNaN(changerNumber)){
                moveIndex("push");
                arr.splice(currentIndex+1,arr.length)
                arr.push(changerNumber);
               
                return true;
            } else {
                return false;
            }
        }

        function ArrowLeft(event) {
            moveIndex(event.key);
            Print();
        }
        function ArrowRight(event) {
            moveIndex(event.key);
            Print();
        }
        function moveIndex(actionName){
            switch(actionName) {
                case "push":
                    currentIndex++;
                    break;
                case "ArrowLeft":
                    if(currentIndex != 0) {
                        currentIndex--;
                    }
                    break;
                case "ArrowRight":
                    if(currentIndex <= arr.length) {
                        currentIndex++;
                    }
                    break;
                default:
                    console.log("알수없음")
            }
        }

        function ArrSum(){
            var sum = 0;
            for(i in arr){
                if(i >= currentIndex) {break;}
                sum += parseInt(arr[i]);
            }
            return sum;
        }

        function Print(){
            app.innerHTML = ArrSum();
            arrDom.innerHTML = arr.join("->")
            indexDom.innerHTML = currentIndex;
            console.log(arr);
        }

        function eventAction(event){
            if(actions["Push"](event.key)){
                Print();
            } else {
                if(actions.hasOwnProperty(event.key)){
                    actions[event.key](event);
                    
                }
            }
        }
        return actions;
    }());


    window.addEventListener('keyup',function(e){
        lib.eventAction(e);
    });


});