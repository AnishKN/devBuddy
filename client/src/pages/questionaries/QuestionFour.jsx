import { NavLink } from 'react-router-dom'
import { useState } from "react";

export default function QuestionFour() {
  const [selected, setSelected] = useState(null);

  const handleOptionClick = (time) => {
    setSelected(time);
  };

  const isSelected = (time) => {
    return selected === time ? 'bg-purple-600 text-white' : '';
  };

  return(
    <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto my-12">
      {/* <Progress className="w-full" value={50} /> */}
      <div className="mt-8 flex flex-col items-center">
      {/* <BotIcon className="h-8 w-8 text-purple-600 my-8" /> */}
      <img src='https://i.ibb.co/GnVLZnn/Frame-3-1.png' height={150} width={150}/>
        <h2 className="mt-6 text-xl font-semibold text-gray-900">
        What is your current coding proficiency level?
        </h2>
        <div className="mt-6 w-full">
      {['a) Beginner', 'b) Intermediate', 'c) Advanced'].map((time, index) => (
        <button
          key={index}
          className={`flex items-center justify-between px-4 py-4 m-2 border rounded-lg text-left hover:bg-purple-600 hover:text-white w-full ${isSelected(time)}`}
          onClick={() => handleOptionClick(time)}
        >
          <span className="text-sm font-medium">{time}</span>
        </button>
      ))}

        </div>
        <button className="mt-8 w-full bg-white hover:text-white hover:bg-purple-600 px-2 py-2 m-2 border rounded-lg ">
        <NavLink to="/QuestionFive">
              CONTINUE
            </NavLink>
            </button>
      </div>
    </div>
  )
}

