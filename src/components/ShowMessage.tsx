import React from 'react'

export default function ShowMessage({ statusCode, message }: { statusCode: number, message: string }) {
  return (
    <div style={{
      backgroundColor: statusCode == 200 ? "springgreen" : "red",
      color: "white",
      display: "flex",
      flexWrap: "wrap",
      borderRadius: "0.7rem",
      fontSize: "12px",
      padding: "0.3rem",
      margin: "0.3rem"
    }} >
      <p>
        {statusCode == 200 ? "Info: " : "Error: "}{statusCode + " " + message}
      </p>
    </div>
  )
}
