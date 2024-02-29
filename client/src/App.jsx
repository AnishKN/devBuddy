import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from "./pages/Home"
import Insta from "./components/Insta"
import Playground from './pages/Playground'
import PracticeGround from './pages/PracticeGround'
import Firstquestion from "./pages/Firstquestion"
import QuestionOne from "./pages/questionaries/QuestionOne"
import QuestionTwo from "./pages/questionaries/QuestionTwo"
import QuestionThree from "./pages/questionaries/QuestionThree"
import QuestionFour from "./pages/questionaries/QuestionFour"
import QuestionFive from "./pages/questionaries/QuestionFive"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />} />
            <Route path='Home' element={<Home />} />
            <Route path='Register' element={<Register />} />
            <Route path='Login' element={<Login />} />
            <Route path='Insta' element={<Insta />} />
            <Route path='Playground' element={<Playground />} />
            <Route path='PracticeGround' element={<PracticeGround />} />
            <Route path='Firstquestion' element={<Firstquestion />} />
            <Route path='QuestionOne' element={<QuestionOne />} />
            <Route path='QuestionTwo' element={<QuestionTwo />} />
            <Route path='QuestionThree' element={<QuestionThree />} />
            <Route path='QuestionFour' element={<QuestionFour />} />
            <Route path='QuestionFive' element={<QuestionFive />} />
            <Route path='*' element="404" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
