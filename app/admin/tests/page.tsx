'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';

interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  options: Option[];
  order: number;
  lessonVideoUrl?: string;
}

interface Test {
  id?: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  questions: Question[];
}

export default function AdminTestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('math');

  const [formData, setFormData] = useState<Test>({
    title: '',
    description: '',
    category: 'foundation',
    subject: 'math',
    questions: [
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false }
        ],
        order: 1,
        lessonVideoUrl: ''
      }
    ]
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchTests();
    }
  }, [status, router, selectedSubject]);

  const fetchTests = async () => {
    try {
      const res = await fetch(`/api/tests?subject=${selectedSubject}`);
      const data = await res.json();
      
      if (!res.ok) {
        console.error('API Error:', data);
        toast.error(data.error || 'Failed to fetch tests');
        setTests([]);
        return;
      }
      
      if (Array.isArray(data)) {
        setTests(data);
      } else {
        console.error('Invalid data format:', data);
        setTests([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch tests');
      setTests([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingTest ? `/api/tests/${editingTest.id}` : '/api/tests';
      const method = editingTest ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      toast.success(editingTest ? 'Test updated successfully' : 'Test created successfully');
      setShowForm(false);
      setEditingTest(null);
      resetForm();
      fetchTests();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;

    try {
      const res = await fetch(`/api/tests/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete test');
      toast.success('Test deleted successfully');
      fetchTests();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'foundation',
      subject: 'math',
      questions: [
        {
          questionText: '',
          options: [
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false }
          ],
          order: 1,
          lessonVideoUrl: ''
        }
      ]
    });
  };

  const addQuestion = () => {
    const maxOrder = formData.questions.length > 0 
      ? Math.max(...formData.questions.map(q => q.order || 0))
      : 0;
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          questionText: '',
          options: [
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false }
          ],
          order: maxOrder + 1,
          lessonVideoUrl: ''
        }
      ]
    });
  };

  const removeQuestion = (index: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index)
    });
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options.push({ optionText: '', isCorrect: false });
    setFormData({ ...formData, questions: newQuestions });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateQuestion = (index: number, text: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].questionText = text;
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateQuestionOrder = (index: number, order: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].order = order;
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateLessonVideoUrl = (index: number, url: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].lessonVideoUrl = url;
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (questionIndex: number, optionIndex: number, text: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex].optionText = text;
    setFormData({ ...formData, questions: newQuestions });
  };

  const toggleCorrectOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex].isCorrect = !newQuestions[questionIndex].options[optionIndex].isCorrect;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleEdit = (test: any) => {
    setEditingTest(test);
    setFormData({
      title: test.title,
      description: test.description,
      category: test.category,
      subject: test.subject,
      questions: test.questions.map((q: any, idx: number) => ({
        questionText: q.questionText,
        options: q.options.map((opt: any) => ({
          optionText: opt.optionText,
          isCorrect: opt.isCorrect
        })),
        order: q.order || idx + 1,
        lessonVideoUrl: q.lessonVideoUrl || ''
      }))
    });
    setShowForm(true);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Manage Tests</h1>
            <div className="flex items-center gap-2">
              <Label htmlFor="subjectFilter" className="text-sm font-medium">Subject:</Label>
              <select
                id="subjectFilter"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="p-2 border rounded-lg bg-white"
              >
                <option value="math">Math</option>
                <option value="urdu">Urdu</option>
                <option value="english">English</option>
                <option value="arabic">Arabic</option>
              </select>
            </div>
          </div>
          <Button onClick={() => { 
            if (!showForm) {
              setFormData({
                ...formData,
                subject: selectedSubject
              });
            }
            setShowForm(!showForm); 
            setEditingTest(null); 
            if (showForm) resetForm();
          }}>
            {showForm ? 'Cancel' : 'Create New Test'}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">{editingTest ? 'Edit Test' : 'Create New Test'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Test Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="font-urdu"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="font-urdu"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border rounded"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="foundation">Foundation</option>
                    <option value="pctb">PCTB</option>
                    <option value="cambridge">Cambridge</option>
                    <option value="madrasah">Madrasah</option>
                    <option value="combined">Combined</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <select
                    id="subject"
                    className="w-full p-2 border rounded"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="math">Math</option>
                    <option value="urdu">Urdu</option>
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Questions</h3>
                  <Button type="button" onClick={addQuestion} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Question
                  </Button>
                </div>

                {formData.questions.sort((a, b) => (a.order || 0) - (b.order || 0)).map((question, qIndex) => (
                  <div key={qIndex} className="border p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label>Question {qIndex + 1}</Label>
                          <Input
                            value={question.questionText}
                            onChange={(e) => updateQuestion(qIndex, e.target.value)}
                            placeholder="Enter question text"
                            required
                            className="font-urdu"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">
                            Lesson Video URL (Optional) 
                            <span className="text-xs ml-1">- Students can watch if they need help</span>
                          </Label>
                          <Input
                            value={question.lessonVideoUrl || ''}
                            onChange={(e) => updateLessonVideoUrl(qIndex, e.target.value)}
                            placeholder="https://youtube.com/watch?v=... or lesson page URL"
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-24">
                        <Label>Order #</Label>
                        <Input
                          type="number"
                          min="1"
                          value={question.order}
                          onChange={(e) => updateQuestionOrder(qIndex, parseInt(e.target.value) || 1)}
                          className="text-center"
                        />
                      </div>
                      {formData.questions.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          variant="destructive"
                          size="sm"
                          className="mt-6"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Options</Label>
                        <Button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          variant="outline"
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Option
                        </Button>
                      </div>

                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={() => toggleCorrectOption(qIndex, oIndex)}
                            className="h-4 w-4"
                          />
                          <Input
                            value={option.optionText}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            placeholder={`Option ${oIndex + 1}`}
                            required
                            className="flex-1 font-urdu"
                          />
                          {question.options.length > 2 && (
                            <Button
                              type="button"
                              onClick={() => removeOption(qIndex, oIndex)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : editingTest ? 'Update Test' : 'Create Test'}
              </Button>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold font-urdu">{test.title}</h3>
                  <p className="text-gray-600 font-urdu">{test.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Category: {test.category}</span>
                    <span>Subject: {test.subject}</span>
                    <span>Questions: {test.questions?.length || 0}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(test)} variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(test.id)} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
