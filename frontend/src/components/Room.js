import React, { useEffect, useState } from "react";

function Room({ match }) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + match.params.roomCode)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }, []);

  return (
    <div>
      <h1>hello from room</h1>
    </div>
  );
}

export default Room;
