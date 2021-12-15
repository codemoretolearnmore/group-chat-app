export default function UserList(props){
    function renderElapsedString(lastActive) {
        
        return millisecondsToHuman(lastActive);
      }
    
      function millisecondsToHuman(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);
    
        const humanized = [
          pad(hours.toString(), 2),
          pad(minutes.toString(), 2),
          pad(seconds.toString(), 2),
        ].join(':');
    
        return humanized;
      }
    
      function pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) padded = `0${padded}`;
        return padded;
      }
    return(
        <div id="contacts">
			<ul>
                {props.users.map((user,index)=>{
                    return <li className="contact" key={index}>
                        <div className="wrap">
                            <span className={user.loginStatus===true?"contact-status online":"contact-status away"}></span>
                            <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                            <div className="meta">
                                <p className="name">{user.name}</p>
                                <p className="preview">You just got LITT up, Mike.</p>
                            </div>
                        </div>
                    </li>
                })}
				
			</ul>
		</div>
    );
}