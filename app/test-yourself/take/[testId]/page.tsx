'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface Option {
  id: string;
  optionText: string;
  isCorrect: boolean;
  order: number;
}

interface Question {
  id: string;
  questionText: string;
  options: Option[];
  order: number;
}

interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function TakeTestPage() {
  const params = useParams();
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTest();
  }, [params.testId]);

  const fetchTest = async () => {
    try {
      const res = await fetch(`/api/tests/${params.testId}`);
      const data = await res.json();
      
      console.log('Test data received:', data);
      console.log('Questions:', data.questions);
      console.log('Questions length:', data.questions?.length);
      
      if (!res.ok) {
        toast.error(data.error || 'Failed to fetch test');
        return;
      }
      
      // Sort questions by order field
      if (data.questions && data.questions.length > 0) {
        data.questions.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      }
      
      setTest(data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch test');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (questionId: string, optionId: string, isMultiple: boolean = false) => {
    if (isMultiple) {
      const currentAnswers = (answers[questionId] as string[]) || [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: optionId });
    }
  };

  const calculateScore = () => {
    if (!test) return 0;
    let correct = 0;
    test.questions.forEach((question) => {
      const answer = answers[question.id];
      const correctOptions = question.options.filter(opt => opt.isCorrect);
      
      if (Array.isArray(answer)) {
        // Multiple choice: all correct options must be selected, no incorrect ones
        const correctIds = correctOptions.map(opt => opt.id);
        const isCorrect = answer.length === correctIds.length && 
                         answer.every(id => correctIds.includes(id));
        if (isCorrect) correct++;
      } else {
        // Single choice
        const selectedOption = question.options.find(opt => opt.id === answer);
        if (selectedOption?.isCorrect) {
          correct++;
        }
      }
    });
    return correct;
  };

  const handleSubmit = async () => {
    if (!test) return;

    const unanswered = test.questions.filter(q => {
      const answer = answers[q.id];
      if (Array.isArray(answer)) {
        return answer.length === 0;
      }
      return !answer;
    });
    if (unanswered.length > 0) {
      if (!confirm(`You have ${unanswered.length} unanswered questions. Submit anyway?`)) {
        return;
      }
    }

    setIsSubmitting(true);
    const finalScore = calculateScore();
    setScore(finalScore);

    try {
      await fetch('/api/test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: test.id,
          answers,
          score: finalScore,
          totalQuestions: test.questions.length
        })
      });
      setShowResults(true);
    } catch (error) {
      toast.error('Failed to submit test');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (test && currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Test not found</p>
      </div>
    );
  }

  if (!test.questions || test.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-xl font-bold mb-4">No Questions Available</h2>
          <p className="text-gray-600 mb-6 font-urdu" dir="rtl">
            اس test میں ابھی کوئی questions نہیں ہیں۔
          </p>
          <Button onClick={() => router.push('/test-yourself')}>
            Back to Tests
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = (score / test.questions.length) * 100;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="mb-6">
            {percentage >= 70 ? (
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            ) : (
              <XCircle className="h-20 w-20 text-red-500 mx-auto" />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-4">Test Completed!</h1>
          <p className="text-xl mb-2">Your Score: {score} / {test.questions.length}</p>
          <p className="text-lg text-gray-600 mb-8">Percentage: {percentage.toFixed(1)}%</p>
          
          <div className="space-y-4 text-left mb-8">
            <h2 className="text-xl font-bold">Review Answers:</h2>
            {test.questions.map((question, index) => {
              const answer = answers[question.id];
              const correctOptions = question.options.filter(opt => opt.isCorrect);
              let isCorrect = false;
              let selectedOptionsWithLabels: {option: any, label: string}[] = [];

              if (Array.isArray(answer)) {
                // Multiple choice
                const correctIds = correctOptions.map(opt => opt.id);
                isCorrect = answer.length === correctIds.length && 
                           answer.every(id => correctIds.includes(id));
                selectedOptionsWithLabels = question.options
                  .map((opt, idx) => ({option: opt, label: String.fromCharCode(65 + idx)}))
                  .filter(item => answer.includes(item.option.id));
              } else if (answer) {
                // Single choice
                const selectedIndex = question.options.findIndex(opt => opt.id === answer);
                const selectedOption = question.options[selectedIndex];
                isCorrect = selectedOption?.isCorrect || false;
                if (selectedOption) {
                  selectedOptionsWithLabels = [{option: selectedOption, label: String.fromCharCode(65 + selectedIndex)}];
                }
              }

              const correctOptionsWithLabels = question.options
                .map((opt, idx) => ({option: opt, label: String.fromCharCode(65 + idx)}))
                .filter(item => item.option.isCorrect);

              return (
                <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                  <p className="font-semibold mb-2 font-urdu" dir="rtl">Q{index + 1}: {question.questionText}</p>
                  
                  <div className="text-sm mb-2">
                    <span className="font-medium">Your answer: </span>
                    {selectedOptionsWithLabels.length > 0 ? (
                      <span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedOptionsWithLabels.map(item => item.label).join(', ')}
                      </span>
                    ) : (
                      <span className="text-gray-500">Not answered</span>
                    )}
                  </div>

                  {!isCorrect && (
                    <>
                      <div className="text-sm text-green-600 mb-3">
                        <span className="font-medium">Correct answer: </span>
                        <span className="font-semibold">
                          {correctOptionsWithLabels.map(item => item.label).join(', ')}
                        </span>
                      </div>
                      
                      {(question as any).lessonVideoUrl && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                          <p className="text-sm text-amber-900 mb-2 font-urdu" dir="rtl">
                            اس سوال کو سمجھنے کے لیے lesson دیکھیں:
                          </p>
                          <a 
                            href={(question as any).lessonVideoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                            <span className="font-urdu">Lesson دیکھیں</span>
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push('/test-yourself')}>
              Back to Tests
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retake Test
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 font-urdu">{test.title}</h1>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {test.questions.length}</span>
              <span>Answered: {
                Object.entries(answers).filter(([_, answer]) => {
                  if (Array.isArray(answer)) return answer.length > 0;
                  return !!answer;
                }).length
              } / {test.questions.length}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 font-urdu">{question.questionText}</h2>
            
            {(question as any).lessonVideoUrl && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800 mb-2 font-urdu" dir="rtl">
                  اگر آپ کو یہ سوال مشکل لگ رہا ہے تو پہلے lesson دیکھیں:
                </p>
                <a 
                  href={(question as any).lessonVideoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  <span className="font-urdu">Lesson دیکھیں</span>
                </a>
              </div>
            )}
            
            {question.options.filter(opt => opt.isCorrect).length > 1 && (
              <p className="text-sm text-gray-600 mb-2">
                (Multiple answers - Select all correct options)
              </p>
            )}
            <div className="space-y-3">
              {question.options.map((option, optIndex) => {
                const isMultiple = question.options.filter(opt => opt.isCorrect).length > 1;
                const isSelected = isMultiple 
                  ? (answers[question.id] as string[] || []).includes(option.id)
                  : answers[question.id] === option.id;
                const optionLabel = String.fromCharCode(65 + optIndex); // A, B, C, D...

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(question.id, option.id, isMultiple)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`shrink-0 w-8 h-8 border-2 rounded-full ${
                      isSelected 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'border-gray-400 text-gray-700'
                    } flex items-center justify-center font-semibold`}>
                      {optionLabel}
                    </div>
                    <span className="font-urdu">{option.optionText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {test.questions.map((_, index) => {
                const answer = answers[test.questions[index].id];
                const isAnswered = Array.isArray(answer) ? answer.length > 0 : !!answer;
                
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-full text-sm ${
                      index === currentQuestion
                        ? 'bg-blue-500 text-white'
                        : isAnswered
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {currentQuestion === test.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Test'}
              </Button>
            ) : (
              <Button onClick={nextQuestion}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
