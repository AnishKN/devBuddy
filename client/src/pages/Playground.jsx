import { Button } from "@geist-ui/core";
import { Badge } from "@geist-ui/core";
import Editor from '@monaco-editor/react';
import { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Playground() {
  const location = useLocation();

  const props = location.state || {};
  let qtn = props.question_title
  let decs = props.question_description
  let inputs = props.sample_input
  let outputs = props.sample_output

  const [code,setCode] = useState("# write your code")

  function handleEditorChange(value, event) {
    setCode(value)
    console.log(code.toString())
  }

  function Displaytxt(){
    console.log("```python\ndef find_missing_numbers(arr):\n  \"\"\"\n  Finds all the missing numbers in a list of integers.\n\n  Args:\n    arr: A list of integers.\n\n  Returns:\n    A list of the missing numbers.\n  \"\"\"\n\n  # Create a set of all the numbers in the list.\n  numbers = set(arr)\n\n  # Create a set of all the integers between the minimum and maximum numbers in the list.\n  min_num = min(numbers)\n  max_num = max(numbers)\n  complete_set = set(range(min_num, max_num + 1))\n\n  # Find the missing numbers by subtracting the set of numbers in the list from the set of all integers.\n  missing_numbers = complete_set - numbers\n\n  # Return the list of missing numbers.\n  return list(missing_numbers)\n\n\n# Test the function.\narr = [1, 2, 3, 5, 7, 9]\nmissing_numbers = find_missing_numbers(arr)\nprint(missing_numbers)  # Output: [4, 6, 8]\n```");
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
    <div className="main flex">
      <div className="left flex h-screen overflow-y-scroll" 
      style={{borderRight:'2px solid #666',width:'40%'}}
      >
        <div className="bg-white p-4 shadow rounded-lg">
          {/* <div className="border-b pb-2 mb-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <Button variant="outline">Task</Button>
                <Button variant="outline">Description</Button>
                <Button variant="outline">Solutions</Button>
              </div>
              <MoreHorizontalIcon className="text-gray-600" />
            </div> 
          </div> */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {props.question_title}         
          </h1>
          <Badge variant="destructive">{props.difficulty}</Badge>
          <p className="text-gray-700 mt-4">
            {props.question_description}
          </p>
          <br />
          <h1><b> Sample input : </b></h1>
          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <p className="font-mono text-sm">{props.sample_input}</p>
          </div>
          <br />
          <h1><b> Sample output : </b></h1>
          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <p className="font-mono text-sm">{props.sample_output}</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <CheckCircleIcon className="text-green-500" />
            <span className="text-green-500">Correct</span>
            <span className="text-gray-400">A minute ago</span>
          </div>
        </div>
      </div>
      <div className="right flex-1">
        <div className="flex flex-col">
          <Editor
            height="90vh"
            className="flex-1"
            defaultLanguage="python"
            defaultValue={code} 
            onChange={handleEditorChange}
          />
        </div>
        <div className="btns flex"
          style={{height:'10%',borderTop:'2px solid #666'}}>
            <div className="flex space-x-4 mt-6 mx-12">
              <Button onClick={handleRun}>Run</Button>
              <Button onClick={Displaytxt}>Submit</Button>
          </div>
          </div>
      </div>
    </div>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
