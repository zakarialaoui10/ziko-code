import { ZikoUIElement,Flex } from "ziko";
import { Note } from "./note.js";

class ZikoCMCodeNote extends ZikoUIElement {
    constructor(){
        super("section","CodeNote");
        this.container = Flex().vertical(0, 0).style({

        });
        Object.assign(this.cache,{
            activeNote:null,
            order : -1,
            nextCellAfterERunning:"next",
            runNextCell : false
        })
        this.element.append(this.container.element);
        this.notes = [];
    }
    get isCodeNote(){
        return true;
    }
    get activeNote(){
        return this.cache.activeNote;
    }
    get currentIndex(){
        return this.notes.findIndex(n=>n===this.activeNote);
    }
    addNote(code){
        let NewNote = Note(code).size("100%").setOrder("___");
        NewNote.cell.output.onSuccess(()=>{
            NewNote.setOrder(++this.cache.order);
            if(this.cache.nextCellAfterERunning==="next")this.next(this.cache.runNextCell);
            else if(this.cache.nextCellAfterERunning==="previous")this.previous(this.cache.runNextCell);
        })
        NewNote.element.querySelector("[contenteditable='true']").addEventListener("focus",()=>{
            this.cache.activeNote = NewNote;
            NewNote.activate()
        })
        NewNote.element.querySelector("[contenteditable='true']").addEventListener("blur",()=>{
            this.cache.activeNote = "null";
            NewNote.desactivate()
        })
        this.onKeyDown(e=>{
            if(e.event.shiftKey){
                if(e.kd === "ArrowDown"){
                    this.next()
                }
                else if(e.kd === "ArrowUp"){
                    this.previous()
                }
            }
        })
        this.container.append(NewNote);
        this.notes.push(NewNote);
        return this;
    }
    next(run = false){
        const NextCell = this.notes[this.currentIndex+1];
        if(NextCell){
            NextCell.focus()
            if(run)NextCell.cell.run();
        }
        return this
    }
    previous(run = false){
        const PreviousCell = this.notes[this.currentIndex-1];
        // console.log(PreviousCell)
        if(PreviousCell){
            PreviousCell.focus()
            if(run)PreviousCell.cell.run();
        }
        return this
    }
    config(){

    }
    get inputsData(){
        return this.notes.map(n=>Object.assign({},{
            input : n.cell.input.codeContent,
            order : n.order.text
        }))
    }
    get outputsData(){
        return this.notes.map(n=>Object.assign({},{
            html : n.cell.output.element.innerHTML,
            order : n.order.text
        }))   
    }
    load(data=[], override = true){
        if(override){
            for(let i=0;i<this.notes.length;i++){
                this.notes[i].cell.setCode(data[i])
            }
            for(let i=this.notes.length;i<data.length;i++){
                this.addNote(data[i])
            }
        }
        else data.forEach(
            n=>this.addNote(n)
        );
        return this;
    }
}
    

const CodeNote=()=>new ZikoCMCodeNote()
export{
    CodeNote,
    ZikoCMCodeNote
}