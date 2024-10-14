import {ZikoUIElement} from "ziko";
import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import {keymap} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"
class ZikoCMCodeInput extends ZikoUIElement{
    constructor(code=""){
        super("code", "CodeInput")
        this.editor = new EditorView({
            doc:code,
            extensions: [ 
                javascript(),
                keymap.of([
                    indentWithTab,
                    {
                      key: 'Shift-Enter',
                      run: () => {
                        this.run()
                        return true; // Prevent default behavior
                      }
                    }
                  ]),
                basicSetup
            ],
            parent: this.element
        });
        Object.assign(this.cache,{
            attacheOutput : null,
            isAttached : false,
            nodes:{
                parent : this.element.querySelector(".cm-editor"),
                content : this.element.querySelector(".cm-content"),
                guttersContainer: this.element.querySelector(".cm-gutters"),
                get gutters(){
                    return [...this.parent.querySelectorAll(".cm-gutterElement")]
                },
                get activeGutter() {
                    return this.guttersContainer.querySelector(".cm-gutterElement .cm-activeLineGutter")
                },
                get lines(){
                    return [...this.parent.querySelectorAll(".cm-line")]
                },
                get activeLine(){
                    return [...this.parent.querySelectorAll(".cm-activeLine")]
                }
            }
        })
        this.style({
            display:"block",
            fontSize:"1.1rem",
            color : "darkblue"
        })
    }
    get isCodeInput(){
        return true;
    }
    attach(Output){
        this.cache.isAttached = true;
        this.cache.attacheOutput = Output;
        this.cache.attacheOutput.cache.attachedInput = this;
        this.cache.attacheOutput.cache.isAttached = true;
        return this;
    }
    detach(){
        if(this.cache.isAttached){
            this.cache.attacheOutput.cache.attachedInput = null;
            this.cache.attacheOutput.cache.isAttached = false;
            this.cache.attacheOutput = null;
            this.cache.isAttached = false;
            
        }
        return this;
    }
    run(){
        this.cache.attacheOutput.eval(this);
        return this;
    }
    get codeContent(){
       return this.cache.nodes.content.innerText.trim();
    }
    get gutters(){
        const GUTTERS_CONTAINER = this.cache.nodes.guttersContainer;
        return{
            show:()=>GUTTERS_CONTAINER.style.display = "flex",
            hide:()=>GUTTERS_CONTAINER.style.display = "none",
        }
    }
    setCode(code=null){
        if(code!==null){
            // this.cache.nodes.content.innerText=code;
            Object.assign(this.cache.nodes.content,{
                textContent : code
            })
        }
        return this
    }
    clear(){
        Object.assign(this.cache.nodes.content,{
            textContent : ""
        })
        return this;
    }
}

const CodeInput = (code) => new ZikoCMCodeInput(code)
export{
    CodeInput,
    ZikoCMCodeInput
}