import React from 'react'
import { Button } from "@geist-ui/core"
import BotIcon from "../../components/BotIcon"
import { NavLink } from 'react-router-dom'


function QuestionTwo() {

  return (
    <div>
      <div className="m-auto w-full max-w-4xl rounded-lg bg-white p-10 flex flex-col  justify-center items-center"
      style={{height:'80vh'}}>
        {/* <BotIcon className="h-8 w-8 text-purple-600 my-8" /> */}
        <img src='https://i.ibb.co/GnVLZnn/Frame-3-1.png' height={150} width={150}/>
          <p className="text-lg font-semibold ">Personalize your coding journey with me</p>
          <div className="my-8">
          <button className='w-full bg-purple-600 text-white hover:bg-purple-800 hover:text-white px-2 py-2 m-2 border rounded-lg'>
            <NavLink to="/QuestionThree">
              CONTINUE
            </NavLink>
            </button>
          </div>
      </div>
    </div>
  )
}

export default QuestionTwo