document.addEventListener('DOMContentLoaded',function(){

    var lib = (function() {
        var app = document.getElementById('content');
        var indexDom = document.getElementById('index'); 
        var arrDom = document.getElementById('arr');
        
        var arr = [];
        var currentIndex = 0;
        var preAction;
        var actions = {
            "ArrowLeft" : ArrowLeft,
            "ArrowRight": ArrowRight,
            "Push" : Push,
            "eventAction":eventAction
        }


        function Push(key){
            var changerNumber = parseInt(key);
            if(!Number.isNaN(changerNumber)){
                var indexDump = currentIndex;
                if(currentIndex != 0) indexDump = currentIndex+1;
                arr.splice(indexDump,arr.length)
                arr.push(changerNumber);
                moveIndex("push");
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
                    if(currentIndex < arr.length && currentIndex != 0){
                        currentIndex = arr.length-1;
                    } else {
                        currentIndex++;
                    }
                    
                    break;
                case "ArrowLeft":
                    if(currentIndex != 0 && arr.length != 0) {
                        preAction = "ArrowLeft";
                        currentIndex--;
                    }
                    break;
                case "ArrowRight":
                    if(currentIndex <= arr.length && arr.length != 0) {
                        preAction = "ArrowRight";
                        currentIndex++;
                    }
                    break;
                default:
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