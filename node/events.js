class Events{
    constructor(){
        this.subs = {};
        this._maxListeners = 10
    }
    on(eventType,fn){
        if(!this.subs[eventType]){
            this.subs[eventType] = [];
        }
        if(this.subs[eventType].length >= this._maxListeners){
            console.warn(`最长监听${this._maxListeners}个函数`)
        }
        this.subs[eventType].push(fn);
    }
    emit(eventType,...rest){
        console.log(this.subs[eventType].length)
        if(!this.subs[eventType]){
            return;
        }
        this.subs[eventType].forEach((fn)=>{
            fn.apply(this,rest);
        })
    }
    once(eventType,fn){
        let _self = this;
        function wrapper(...rest){
            fn.apply(_self,rest);
            _self.removeEventListener(eventType,wrapper)
        }
        this.on(eventType,wrapper)
    }
    removeEventListener(eventType,fn){
        if(!this.subs[eventType]){
            return;
        }
        this.subs[eventType] = this.subs[eventType].filter((f) =>{
            return f != fn;
        })
    }
    removeAllEventListener(eventType){
        if(!this.subs[eventType]){
            return ;
        }
        this.subs[eventType] = [];
    }
}
let event = new Events();
function a(...rest){
    console.log(rest)
}
event.on('a',a)
function b(){
    console.log('b')
}
event.once('b',b)
event.emit('a','a')
event.emit('a','a','b')
 event.emit('b')
 event.emit('b')
module.exports = Events