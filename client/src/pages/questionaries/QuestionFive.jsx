import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ThreeDots} from 'react-loader-spinner'

export default function QuestionFive() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = (time) => {
    setSelected(time);
  };

  const isSelected = (time) => {
    return selected === time ? "bg-purple-600 text-white" : "";
  };

  const navigate = useNavigate();
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://bytebuddy-7e1y.onrender.com/generate_personalised_question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionData: {
              name: "Anish",
              difficulty: "Easy",
              language: "python",
              solved: 2,
            },
          }),
        }
      );
      const data = await response.json();
      console.log(data.data);
      setLoading(false);
      navigate("/Playground", { state: data.data });
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <ThreeDots
            visible={true}
            height="100"
            width="100"
            color="#7F56D9"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto my-12">
          {/* <Progress className="w-full" value={50} /> */}
          <div className="mt-8 flex flex-col items-center">
            {/* <BotIcon className="h-8 w-8 text-purple-600 my-8" /> */}
            <img
              src="https://i.ibb.co/GnVLZnn/Frame-3-1.png"
              height={150}
              width={150}
            />
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              When are you most productive or prefer to code?
            </h2>
            <div className="mt-6 w-full">
              {["a) Morning", "b) Afternoon", "c) Evening", "d) Night"].map(
                (time, index) => (
                  <button
                    key={index}
                    className={`flex items-center justify-between px-4 py-4 m-2 border rounded-lg text-left hover:bg-purple-600 hover:text-white w-full ${isSelected(
                      time
                    )}`}
                    onClick={() => handleOptionClick(time)}
                  >
                    <span className="text-sm font-medium">{time}</span>
                  </button>
                )
              )}
            </div>
            <button
              className="mt-8 w-full bg-purple-600 text-white rounded-lg px-3 py-3"
              onClick={handleClick}
            >
              Solve your first Question now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
