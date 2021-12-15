import $ from 'jquery'
export default function Messages(props){
    console.log('messages',props.messages);
    function addt(){
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
    }
    function deleteMessage(evt){
        console.log(evt.target.id);
        props.deleteMessages(evt.target.id);
        // props.deleteMessage()
    }
    return(
        <div className="messages" id="messages" onLoad={addt}>
			<ul>
                {props.messages.map((message,index)=>{
                    if(message.sender_id===localStorage.getItem('token'))
                    return (<li className="replies" key={index}>
                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                        {/* <p>@{message.sender_id}</p><br></br> */}
                <p id={message._id} onClick={deleteMessage}>@{message.sender_id}<br></br>{message.message}</p>
                    </li>);
                    else return (
                        <li className="sent" key={index}>
                            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                            <p id={message._id} onClick={deleteMessage}>@{message.sender_id}<br></br>{message.message}</p>
                        </li>
                    )
                })}
				
				
				
			</ul>
		</div>
    );
}