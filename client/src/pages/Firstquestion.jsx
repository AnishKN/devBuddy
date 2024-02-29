import React from 'react'
import { useNavigate } from 'react-router-dom'

function Firstquestion() {
    const navigate = useNavigate()
    const handleClick = async (e) => {
        try {
        const response = await fetch('https://bytebuddy-7e1y.onrender.com/generate_personalised_question', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      questionData: {
                          name: "Anish",
                          difficulty: "Easy",
                          language: "python",
                          solved: 2
                      }
                  }),
                });
                const data = await response.json();
                console.log(data.data)
                navigate('/Playground', { state:data.data });
              } catch (error) {
                console.error('Error:', error);
              }
      }
  return (
    <>
      <button onClick={handleClick}>Start solving now!</button>
    </>
  )
}

export default Firstquestion
