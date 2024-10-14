import { 
    ZikoUIElement,
    Flex,
} from "ziko";
import { CodeInput } from "./code-input.js";
import { CodeOutput } from "./code-output.js";
class ZikoCMCodeCell extends ZikoUIElement{
    constructor(code){
        super("section", "CodeCell");
        this.input = CodeInput(code).size("100%");
        this.output = CodeOutput().size("100%");
        this.input.attach(this.output)
        // this.input.element.addEventListener("keydown",e=>{
          
        //   if(e.shiftKey && e.key === "Enter") e.preventDefault()
        // })
        // this.input.onKeyDown(e=>{
        //     if(e.event.shiftKey && e.kd === "Enter"){
        //         e.target.run()
        //         e.event.preventDefault()
        //     }
        // })
        this.cell = Flex(
            this.input,
            this.output
        ).vertical(0, 0)
        this.output.style({
            margin : "10px",
            padding: "0 30px"
        })
        this.element.append(this.cell.element);
    }
    get codeContent(){
        return this.input.codeContent;
    }
    setCode(code){
        this.input.setCode(code);
        return this;
    }
    run(){
        this.input.run();
        return this;
    }
    clearInput(){
        this.input.clear();
        return this;
    }
    clearOutput(){
        this.output.clear();
        return this;
    }
    clear(){
        this.clearInput();
        this.clearOutput();
        return this;
    }
}

const CodeCell = (code) => new ZikoCMCodeCell(code);

export{
    CodeCell,
}