import { 
    ZikoUIElement,
 } from "ziko";

class ZikoCMCodeOutput extends ZikoUIElement{
    constructor(){
        super("output", "CodeOutput");
        Object.assign(this.cache,{
            state : null
        });
        this.style({
            display : "block",
            // boxSizing : "border-box",
            // padding : "5px",
        })
    }
    get isCodeOutput(){
        return true;
    }
    attach(Input){
        Input.attach(this);
        return this;
    }
    detach(){
        this.cache.attachedInput.detach(this);
        return this;
    }
    eval(CodeInput){
        const code = CodeInput.codeContent;
        this.clear();
        globalThis?.__Ziko__?.__Config__?.setDefault({
            target : this.element
        })
        this.#evaluateJs(code)
        return this
    }
    clear(){
        Object.assign(this.element,{
            innerHTML : ""
        })
        return this;
    }
    #evaluateJs(code){
        try{
            this.emit("run:pending");
            this.cache.state="pending";  
            globalThis?.eval(code);
        }
        catch(err){
            console.log(err)
            this.emit("run:error",{
                error : err
            });
            this.cache.state="error";            
        }
        finally{
            if(this.cache.state==="pending"){
                this.cache.state="success";
                this.emit("run:success");
            }
        }
    }
    onPending(callback){
        this.on("run:pending",callback);
        return this;
    }
    onError(callback){
        this.on("run:error",callback);
        return this;
    }
    onSuccess(callback){
        this.on("run:success",callback);
        return this;
    }
}


const CodeOutput = () => new ZikoCMCodeOutput();

export{
    CodeOutput,
    ZikoCMCodeOutput
}