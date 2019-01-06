class Compile{
    constructor(el,vm){
        if(el && el.nodeType == 1){
            vm.$el = el;
        }else{
            vm.$el = document.querySelector(el);
        }
        this.vm = vm;
        this.createFragment(vm.$el)
    }
    createFragment(el){
        let child;
        let fragment = document.createDocumentFragment();
        while(child = el.firstChild){
            fragment.appendChild(child)
        }
        this.replace(fragment);
        el.appendChild(fragment);
    }
    replace(node){
        let _self = this;
        Array.from(node.childNodes).forEach((n)=>{
            let reg = /\{\{(.*)\}\}/g;
            let text = n.textContent;
            if(n.nodeType == 3 && reg.test(text)){
                let val = _self.vm;
                let arr = RegExp.$1.split('.');
                new Watcher(_self.vm,RegExp.$1,function(newVal){
                    n.textContent = text.replace(reg,newVal);
                })
                for(let k of arr){
                    val = val[k]
                }
                n.textContent = text.replace(reg,val)
            }
            if(n.nodeType == 1){
                let attrs = n.attributes;
                Array.from(attrs).forEach((attr) =>{
                    let name = attr.name;
                    let exp = attr.value;
                    if(name.indexOf('v-') > -1){
                        new Watcher(_self.vm,exp,function(newVal){
                            n.value = newVal;
                        })
                        let val = _self.vm;
                        exp.split('.').forEach((k)=>{
                            val = val[k];
                        })
                        n.value = val;
                        //绑定事件
                        n.addEventListener("input",(e)=>{
                            let val = e.target.value;
                            let arr = exp.split('.');
                            let obj = _self.vm;
                            if(arr.length>1){
                                arr.slice(0,arr.length-1).forEach((k)=>{
                                    obj = obj[k];
                                })
                            }
                            let lastKey = arr[arr.length -1];
                            obj[lastKey] = val;

                        })
                    }
                });
            }
            if(n.childNodes){
                _self.replace(n);
            }
        })
    }
}