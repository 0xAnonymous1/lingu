import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Star, ArrowRight, ArrowLeft, Volume2, RotateCcw, Target, Trophy, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress as ProgressBar } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useAppContext } from './AppContext';
import { toast } from 'sonner';

interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  audio?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: string[];
  questions: Question[];
  points: number;
  completed?: boolean;
  score?: number;
}

export function LearningModule() {
  const { state, dispatch } = useAppContext();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [lessonScore, setLessonScore] = useState(0);

  const lessons: Lesson[] = [
    {
      id: 'lesson-1',
      title: 'Basic Greetings',
      description: 'Learn essential Spanish greetings for everyday conversations',
      difficulty: 'Beginner',
      duration: '10 min',
      topics: ['Greetings', 'Introductions', 'Polite expressions'],
      points: 50,
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Spanish?',
          options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
          correctAnswer: 'Hola',
          explanation: '"Hola" is the most common way to say hello in Spanish.'
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: 'What is the correct response to "¿Cómo estás?"?',
          options: ['Me llamo Juan', 'Muy bien, gracias', 'Hasta luego', 'De nada'],
          correctAnswer: 'Muy bien, gracias',
          explanation: '"¿Cómo estás?" means "How are you?" and "Muy bien, gracias" means "Very well, thank you."'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'Complete the sentence: "_____ me llamo María"',
          correctAnswer: 'Hola',
          explanation: '"Hola, me llamo María" means "Hello, my name is María"'
        },
        {
          id: 'q4',
          type: 'translation',
          question: 'Translate to Spanish: "Nice to meet you"',
          correctAnswer: 'Mucho gusto',
          explanation: '"Mucho gusto" is used when meeting someone for the first time.'
        }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Numbers 1-20',
      description: 'Master Spanish numbers from one to twenty',
      difficulty: 'Beginner',
      duration: '15 min',
      topics: ['Numbers', 'Counting', 'Pronunciation'],
      points: 50,
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'How do you say "5" in Spanish?',
          options: ['cuatro', 'cinco', 'seis', 'siete'],
          correctAnswer: 'cinco',
          explanation: 'The number 5 in Spanish is "cinco".'
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: 'What number is "doce"?',
          options: ['10', '11', '12', '13'],
          correctAnswer: '12',
          explanation: '"Doce" means twelve in Spanish.'
        }
      ]
    },
    {
      id: 'lesson-3',
      title: 'Family Members',
      description: 'Learn vocabulary for family relationships',
      difficulty: 'Beginner',
      duration: '12 min',
      topics: ['Family', 'Relationships', 'Vocabulary'],
      points: 50,
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'How do you say "mother" in Spanish?',
          options: ['padre', 'madre', 'hermana', 'abuela'],
          correctAnswer: 'madre',
          explanation: '"Madre" means mother in Spanish.'
        }
      ]
    }
  ];

  // Add lesson progress from state
  const lessonsWithProgress = lessons.map(lesson => {
    const progress = state.lessonProgress.find(p => p.lessonId === lesson.id);
    return {
      ...lesson,
      completed: progress?.completed || false,
      score: progress?.score
    };
  });

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setLessonScore(0);
  };

  const handleAnswerSubmit = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < selectedLesson!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score and show results
      const correctAnswers = selectedLesson!.questions.filter((q, index) => 
        q.correctAnswer.toLowerCase() === newAnswers[index]?.toLowerCase()
      ).length;
      const score = Math.round((correctAnswers / selectedLesson!.questions.length) * 100);
      setLessonScore(score);
      setShowResults(true);
      
      // Update progress in state
      dispatch({
        type: 'UPDATE_LESSON_PROGRESS',
        lessonId: selectedLesson!.id,
        score
      });

      // Show appropriate toast
      if (score >= 70) {
        toast.success(`Great job! You scored ${score}%`);
      } else {
        toast.error(`You scored ${score}%. Try again to improve!`);
      }
    }
  };

  const resetLesson = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setLessonScore(0);
  };

  const exitLesson = () => {
    setSelectedLesson(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setLessonScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (selectedLesson && !showResults) {
    const currentQuestion = selectedLesson.questions[currentQuestionIndex];
    const progress = Math.round(((currentQuestionIndex + 1) / selectedLesson.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h1>
                <p className="text-gray-600">Question {currentQuestionIndex + 1} of {selectedLesson.questions.length}</p>
              </div>
              <Button variant="outline" onClick={exitLesson}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Lesson
              </Button>
            </div>
            <ProgressBar value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Question {currentQuestionIndex + 1}</span>
                {currentQuestion.type === 'listening' && (
                  <Button variant="outline" size="sm">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg font-medium text-gray-900">
                {currentQuestion.question}
              </div>

              <div className="space-y-4">
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                  <RadioGroup 
                    value={userAnswers[currentQuestionIndex] || ''}
                    onValueChange={(value) => {
                      const newAnswers = [...userAnswers];
                      newAnswers[currentQuestionIndex] = value;
                      setUserAnswers(newAnswers);
                    }}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {(currentQuestion.type === 'fill-blank' || currentQuestion.type === 'translation') && (
                  <Input
                    placeholder="Type your answer here..."
                    value={userAnswers[currentQuestionIndex] || ''}
                    onChange={(e) => {
                      const newAnswers = [...userAnswers];
                      newAnswers[currentQuestionIndex] = e.target.value;
                      setUserAnswers(newAnswers);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && userAnswers[currentQuestionIndex]) {
                        handleAnswerSubmit(userAnswers[currentQuestionIndex]);
                      }
                    }}
                  />
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={() => handleAnswerSubmit(userAnswers[currentQuestionIndex] || '')}
                  disabled={!userAnswers[currentQuestionIndex]}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {currentQuestionIndex === selectedLesson.questions.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults && selectedLesson) {
    const correctAnswers = selectedLesson.questions.filter((q, index) => 
      q.correctAnswer.toLowerCase() === userAnswers[index]?.toLowerCase()
    ).length;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="bg-white rounded-lg p-8 mb-6 shadow-sm text-center">
            <div className="mb-6">
              {lessonScore >= 70 ? (
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              ) : (
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {lessonScore >= 70 ? 'Great Job!' : 'Keep Practicing!'}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                You scored {lessonScore}% on "{selectedLesson.title}"
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                  <div>Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {selectedLesson.questions.length - correctAnswers}
                  </div>
                  <div>Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    +{lessonScore >= 70 ? selectedLesson.points : Math.round(selectedLesson.points * 0.5)}
                  </div>
                  <div>Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Review */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Review Your Answers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedLesson.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = question.correctAnswer.toLowerCase() === userAnswer?.toLowerCase();

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        Question {index + 1}: {question.question}
                      </h4>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-white text-xs">✕</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Your answer:</span> 
                        <span className={isCorrect ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                          {userAnswer || 'No answer'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p>
                          <span className="font-medium">Correct answer:</span> 
                          <span className="text-green-600 ml-2">{question.correctAnswer}</span>
                        </p>
                      )}
                      <p className="text-gray-600">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={resetLesson}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={exitLesson} className="bg-green-600 hover:bg-green-700">
              Continue Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Modules</h1>
          <p className="text-gray-600">Choose a lesson to continue your {state.user.currentLanguage} journey</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Current Level</div>
          <Badge className="bg-green-100 text-green-800">{state.user.level}</Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Progress</span>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{state.user.totalPoints} points</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Course Progress</span>
                <span className="text-sm text-gray-600">
                  {lessonsWithProgress.filter(l => l.completed).length}/{lessonsWithProgress.length} lessons completed
                </span>
              </div>
              <ProgressBar 
                value={(lessonsWithProgress.filter(l => l.completed).length / lessonsWithProgress.length) * 100} 
                className="h-3" 
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {lessonsWithProgress.filter(l => l.completed).length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{state.user.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    lessonsWithProgress
                      .filter(l => l.score)
                      .reduce((acc, l) => acc + (l.score || 0), 0) /
                    Math.max(1, lessonsWithProgress.filter(l => l.score).length)
                  )}%
                </div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{state.user.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonsWithProgress.map((lesson) => (
          <Card key={lesson.id} className="lingua-card cursor-pointer group transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(lesson.difficulty)} variant="outline">
                  {lesson.difficulty}
                </Badge>
                {lesson.completed && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
              <CardTitle>{lesson.title}</CardTitle>
              <p className="text-muted-foreground">{lesson.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground space-x-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {lesson.points} pts
                  </span>
                </div>
                
                {lesson.score && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Best Score:</span>
                      <span className="font-medium text-foreground">{lesson.score}%</span>
                    </div>
                    <ProgressBar value={lesson.score} className="h-2" />
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {lesson.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <Button 
                  className={`w-full transition-all duration-200 ${
                    lesson.completed 
                      ? 'lingua-button-secondary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary' 
                      : 'lingua-button-primary'
                  }`}
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    startLesson(lesson);
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {lesson.completed ? 'Practice Again' : 'Start Lesson'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}