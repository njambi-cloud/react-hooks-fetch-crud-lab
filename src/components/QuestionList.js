import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [question, setQuestion] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((question) =>setQuestion(question))
  },[])

  function handleDeleteClick (id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",

    })
      .then((res) => res.json())
      .then(() => {
        const updatedQuestions =question.filter((que) => que.id !==id)
        setQuestion(updatedQuestions)
      })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch (`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions =question.map((que) => {
          if(que.id === updatedQuestion.id) {
            return updatedQuestion
          }else{
            return que
          }
        })
        setQuestion(updatedQuestions)
      })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{question.map((que) => (<QuestionItem key={que.id} question={que}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}/>)
     
  )}</ul>
    </section>
  );
}

export default QuestionList;