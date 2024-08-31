import { useEffect, useRef, useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"

const Chat = () => {
    const [open,setOpen] = useState(false);
    const [text,setText] = useState("");

    const endRef = useRef(null);
    
    useEffect(()=>{
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleEmoji = e =>{
        setText(prev=>prev + e.emoji);
        setOpen(false)
    }

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>jone Dalton</span>
                        <p>LODAWDWAAW AWD AD AD AWD</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>DWDWDADAW DUAWDAW DA DAD  DAW  AW WA WA WA WA AWD AW AWAW  WAWWAADWAD AD WAD WAD AWD AWD AD AD AD AW WAD AWD AD</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>DWDWDADAW DUAWDAW DA DAD  DAW  AW WA WA WA WA AWD AW AWAW  WAWWAADWAD AD WAD WAD AWD AWD AD AD AD AW WAD AWD AD</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>DWDWDADAW DUAWDAW DA DAD  DAW  AW WA WA WA WA AWD AW AWAW  WAWWAADWAD AD WAD WAD AWD AWD AD AD AD AW WAD AWD AD</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj" alt="" />
                        <p>DWDWDADAW DUAWDAW DA DAD  DAW  AW WA WA WA WA AWD AW AWAW  WAWWAADWAD AD WAD WAD AWD AWD AD AD AD AW WAD AWD AD</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>DWDWDADAW DUAWDAW DA DAD  DAW  AW WA WA WA WA AWD AW AWAW  WAWWAADWAD AD WAD WAD AWD AWD AD AD AD AW WAD AWD AD</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input
                  type="text"
                  value={text}
                  placeholder="Escribe un mensaje..."
                  onChange={e=>setText(e.target.value)}
                />
                <div className="emoji">
                    <img
                      src="./emoji.png"
                      alt=""
                      onClick={()=>setOpen(prev=>!prev)}
                    />
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Enviar</button>
            </div>
        </div>
    )
}

export default Chat