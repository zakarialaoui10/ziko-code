import { ZikoUIElement } from "ziko";
import { CodeCell } from "../code-cell/code-cell.js";

class ZikoCMNote extends ZikoUIElement{
    constructor(code){
        super("section", "")
        this.order = text("78768").style({
            borderBottom : "4px solid gold",
            color : "gold",
            padding : "5px"
        })
        const left = Flex(
            this.order
        ).style({
            background : "darkblue",
            width : "80px",
            height: "60px"
        }).vertical(0,0);
        this.cell = CodeCell(code).size("100%").style({border:"1px red solid"})
        this.note = Flex(
            left,
            this.cell
        ).horizontal("space-between",0)
        this.element.append(this.note.element);
    }
    setOrder(value){
        this.order.setValue(value);
        return this
    }
    focus(){
        this.element.querySelector("[contenteditable='true']").focus();
        return this;
    }
    blur(){
        this.element.querySelector("[contenteditable='true']").blur();
        return this;
    }
    activate(){
        this.cell.input.style({
            outline : "2px green solid"
        })
    }
    desactivate(){
        this.cell.input.style({
            outline : "none"
        })
    }
}

const Note = (code) => new ZikoCMNote(code)
export{
    Note
}