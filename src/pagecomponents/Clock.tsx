import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Clock = () => {

  const [showTime, setShowTime] = useState(<div>TODAY: {new Date().toLocaleString()}</div>);
  useEffect(() => {
    setInterval(() => {
      setShowTime(<div>TODAY: {new Date().toLocaleString()}</div>);

    }, 1000);

    return () => {

    }
  }, [showTime])

  return (


    <div style={{ justifyContent: "center", margin: 10, display: "flex", color: 'white' }}>

      {showTime}
    </div>
  )
}


export default Clock;