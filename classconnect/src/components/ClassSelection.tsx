"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams, useSearchParams } from "react-router-dom";

interface Class {
  id: number;
  title: string;
  professor: string;
  assistants: string[];
  semester: string;
  description: string;
}

export default function ClassSelection() {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: 1,
      title: "Introduction to Computer Science",
      professor: "Dr. Alice Johnson",
      assistants: ["John Doe", "Jane Smith"],
      semester: "Fall 2024",
      description: "An introductory course covering the basics of computer science.",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      professor: "Prof. Richard Roe",
      assistants: ["Emily Davis"],
      semester: "Spring 2025",
      description: "A course exploring advanced topics in mathematics, including calculus and linear algebra.",
    },
    {
      id: 3,
      title: "Modern Art History",
      professor: "Dr. Clara Nguyen",
      assistants: [],
      semester: "Summer 2024",
      description: "A survey of modern art movements from the late 19th to 20th century.",
    },
  ]);

  const [title, setTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [assistants, setAssistants] = useState<string[]>([]);
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [assistantInput, setAssistantInput] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchProfessor, setSearchProfessor] = useState("");
  const [searchSemester, setSearchSemester] = useState("");

  const { universityId } = useParams();
  const [searchParams] = useSearchParams();
  const universityName = searchParams.get("name");

  const handleAddAssistant = () => {
    if (assistantInput.trim()) {
      setAssistants([...assistants, assistantInput.trim()]);
      setAssistantInput("");
    }
  };

  const handleRemoveAssistant = (name: string) => {
    setAssistants(assistants.filter((assistant) => assistant !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && professor.trim() && semester.trim()) {
      setClasses([
        ...classes,
        {
          id: Date.now(),
          title,
          professor,
          assistants,
          semester,
          description,
        },
      ]);
      setTitle("");
      setProfessor("");
      setAssistants([]);
      setSemester("");
      setDescription("");
    }
  };

  const handleDelete = (id: number) => {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  };

  const filteredClasses = classes.filter((classItem) => {
    const matchesTitle =
      searchTitle === "" ||
      classItem.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesProfessor =
      searchProfessor === "" ||
      classItem.professor.toLowerCase().includes(searchProfessor.toLowerCase());
    const matchesSemester =
      searchSemester === "" ||
      classItem.semester.toLowerCase().includes(searchSemester.toLowerCase());
    return matchesTitle && matchesProfessor && matchesSemester;
  });

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-chocolate_cosmos-500">
        {universityName
          ? `${universityName} - Class Selection`
          : "Class Selection"}
      </h1>
      <Card className="mb-6 bg-card border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-text">Create a New Class</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              className="bg-background text-text border-border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course Title"
            />
            <Input
              required
              className="bg-background text-text border-border"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              placeholder="Professor's Name"
            />
            <div>
              <div className="flex space-x-2 items-center">
                <Input
                  className="bg-background text-text border-border flex-grow"
                  value={assistantInput}
                  onChange={(e) => setAssistantInput(e.target.value)}
                  placeholder="Course Assistant Name"
                />
                <Button
                  type="button"
                  onClick={handleAddAssistant}
                  className="bg-primary text-black hover:bg-accent"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap mt-2">
                {assistants.map((assistant, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-black px-2 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                    onClick={() => handleRemoveAssistant(assistant)}
                  >
                    {assistant} ✕
                  </span>
                ))}
              </div>
            </div>
            <Input
              required
              className="bg-background text-text border-border"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="Semester (e.g., Fall 2024)"
            />
            <Textarea
              className="bg-background text-text border-border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional Description"
            />
            <Button
              type="submit"
              className="bg-primary text-black hover:bg-accent"
            >
              Create Class
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6 bg-card border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-text">Search Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              className="bg-background text-text border-border"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search by title"
            />
            <Input
              className="bg-background text-text border-border"
              value={searchProfessor}
              onChange={(e) => setSearchProfessor(e.target.value)}
              placeholder="Search by professor"
            />
            <Input
              className="bg-background text-text border-border"
              value={searchSemester}
              onChange={(e) => setSearchSemester(e.target.value)}
              placeholder="Search by semester"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredClasses.map((classItem) => (
          <Card
            key={classItem.id}
            className="bg-card border border-border shadow-sm"
          >
            <CardHeader>
              <CardTitle className="text-text flex justify-between items-center">
                <Link
                  to={`/university/${universityId}/classes/${classItem.id}`}
                  state={classItem}
                  className="text-primary hover:underline"
                >
                  {classItem.title}
                </Link>
                <Button
                  onClick={() => handleDelete(classItem.id)}
                  className="bg-accent text-white hover:bg-primary"
                >
                  Delete
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted mb-2">
                <strong>Professor:</strong> {classItem.professor}
              </p>
              <p className="text-muted mb-2">
                <strong>Assistants:</strong>{" "}
                {classItem.assistants.length > 0
                  ? classItem.assistants.join(", ")
                  : "None"}
              </p>
              <p className="text-muted mb-2">
                <strong>Semester:</strong> {classItem.semester}
              </p>
              <p className="text-muted">{classItem.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
