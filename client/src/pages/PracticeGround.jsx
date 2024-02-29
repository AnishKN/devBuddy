// import { Button } from "@geist-ui/core";
// import { Badge } from "@geist-ui/core";
import Editor from '@monaco-editor/react';
import { useState } from "react";
// import { useLocation } from 'react-router-dom';
import Index from "../components/bot";

export default function Playground() {

  const [code,setCode] = useState("# write your code")

  function handleEditorChange(value, event) {
    setCode(value)
    console.log(code.toString())
  }


  const handleRun = async (e) => {
    try {
    const response = await fetch('https://bytebuddy-7e1y.onrender.com/compile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "questionData": {
                  "code" : code,
                  "qtn" : qtn,
                  "decs" : desc,
                  "inputs" : inputs,
                  "outputs" : outputs
              }
              }),
            });
            const data = await response.json();
            console.log(data);  
          } catch (error) {
            console.error('Error:', error);
          }
  }
  return (
    <div className="main">
      {/* <div className="left flex h-screen overflow-y-scroll" 
      style={{borderRight:'2px solid #666',width:'40%'}}
      >
        <div className="bg-white p-4 shadow rounded-lg">
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Question title      
          </h1>
          <Badge variant="destructive">Hard</Badge>
          <p className="text-gray-700 mt-4">
            Title
          </p>
          <br />
          <h1><b> Sample input : </b></h1>
          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <p className="font-mono text-sm">Inputs</p>
          </div>
          <br />
          <h1><b> Sample output : </b></h1>
          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <p className="font-mono text-sm">Outputs</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-green-500">Correct</span>
            <span className="text-gray-400">A minute ago</span>
          </div>
        </div>
      </div> */}
      <div className="right m-8">
        <div className="flex flex-col">
          <Editor
            height="70vh"
            className="flex-1"
            defaultLanguage="python"
            defaultValue={code} 
            onChange={handleEditorChange}
          />
        </div>
        {/* <div className="btns flex"
          style={{height:'10%',borderTop:'2px solid #666'}}>
            <div className="flex space-x-4 mt-6 mx-12">
              <Button onClick={handleRun}>Run</Button>
              <Button>Submit</Button>
          </div>
          </div> */}

        <Index />
      </div>
    </div>
  );
}


