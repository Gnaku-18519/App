/**
 * @author AJWuu
 */

import React from 'react'
//Types
import { AnswerObject } from '../App';
//Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined; //!!userAnswer can convert the value to boolean
    questionNum: number;
    totalQuestions: number;
}

//FC = Functional Components
const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNum, 
    totalQuestions
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers && Object.keys(answers).map((answer) => (
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={!!userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
)

export default QuestionCard;