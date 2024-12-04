"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

interface University {
  id: number;
  name: string;
  location: string;
  establishedYear: number;
  programs: string[];
  description: string;
}

export default function UniversityForm() {
  const [universities, setUniversities] = useState<University[]>([
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, MA, USA",
      establishedYear: 1636,
      programs: ["Law", "Medicine", "Engineering", "Business"],
      description:
        "One of the most prestigious universities in the world, known for its excellence in education and research.",
    },
    {
      id: 2,
      name: "University of Oxford",
      location: "Oxford, England, UK",
      establishedYear: 1096,
      programs: ["Philosophy", "Computer Science", "Economics", "Biology"],
      description:
        "A historic university recognized globally for its rigorous academics and esteemed alumni.",
    },
    {
      id: 3,
      name: "Stanford University",
      location: "Stanford, CA, USA",
      establishedYear: 1885,
      programs: ["Computer Science", "Artificial Intelligence", "Physics"],
      description:
        "A leading research university located in Silicon Valley, fostering innovation and entrepreneurship.",
    },
  ]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [establishedYear, setEstablishedYear] = useState<number | "">("");
  const [programs, setPrograms] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [programInput, setProgramInput] = useState("");

  // Search and filter states
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchYear, setSearchYear] = useState<number | "">("");
  const [filterProgram, setFilterProgram] = useState("");

  const handleAddProgram = () => {
    if (programInput.trim()) {
      setPrograms([...programs, programInput.trim()]);
      setProgramInput("");
    }
  };

  const handleRemoveProgram = (program: string) => {
    setPrograms(programs.filter((p) => p !== program));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && location.trim() && establishedYear) {
      setUniversities([
        ...universities,
        {
          id: Date.now(),
          name,
          location,
          establishedYear: Number(establishedYear),
          programs,
          description,
        },
      ]);
      setName("");
      setLocation("");
      setEstablishedYear("");
      setPrograms([]);
      setDescription("");
    }
  };

  const handleDelete = (id: number) => {
    setUniversities(universities.filter((university) => university.id !== id));
  };

  // Filtered universities based on search and filter criteria
  const filteredUniversities = universities.filter((university) => {
    const matchesName =
      searchName === "" ||
      university.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesLocation =
      searchLocation === "" ||
      university.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
    const matchesYear =
      searchYear === "" ||
      university.establishedYear === Number(searchYear);
    const matchesProgram =
      filterProgram === "" || university.programs.includes(filterProgram);

    return matchesName && matchesLocation && matchesYear && matchesProgram;
  });

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-chocolate_cosmos-500">
        University Management
      </h1>

      {/* Form Section */}
      <Card className="mb-6 bg-card border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-text">Add a New University</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              className="bg-background text-text border-border"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="University Name"
            />
            <Input
              required
              className="bg-background text-text border-border"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (City, State, Country)"
            />
            <Input
              required
              type="number"
              className="bg-background text-text border-border"
              value={establishedYear}
              onChange={(e) => setEstablishedYear(Number(e.target.value))}
              placeholder="Established Year"
            />
            <div>
              <div className="flex space-x-2 items-center">
                <Input
                  className="bg-background text-text border-border flex-grow"
                  value={programInput}
                  onChange={(e) => setProgramInput(e.target.value)}
                  placeholder="Program Name"
                />
                <Button
                  type="button"
                  onClick={handleAddProgram}
                  className="bg-primary text-black hover:bg-accent"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap mt-2">
                {programs.map((program, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-black px-2 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                    onClick={() => handleRemoveProgram(program)}
                  >
                    {program} ✕
                  </span>
                ))}
              </div>
            </div>
            <Textarea
              className="bg-background text-text border-border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (Optional)"
            />
            <Button
              type="submit"
              className="bg-primary text-black hover:bg-accent"
            >
              Add University
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Search and Filter Section */}
      <Card className="mb-6 bg-card border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-text">Search Universities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <Input
              className="bg-background text-text border-border"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search by name"
            />
            <Input
              className="bg-background text-text border-border"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search by location"
            />
            <Input
              type="number"
              className="bg-background text-text border-border"
              value={searchYear}
              onChange={(e) =>
                setSearchYear(e.target.value === "" ? "" : parseInt(e.target.value, 10))
              }
              placeholder="Search by year"
            />
            <Input
              className="bg-background text-text border-border"
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              placeholder="Filter by program (optional)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filtered Universities */}
      <div className="space-y-4">
        {filteredUniversities.map((university) => (
          <Card
            key={university.id}
            className="bg-card border border-border shadow-sm"
          >
            <CardHeader>
              <CardTitle className="text-text flex justify-between items-center">
                <Link
                  to={`/university/${university.id}/classes?name=${encodeURIComponent(
                    university.name
                  )}`}
                  className="text-primary hover:underline"
                >
                  {university.name}
                </Link>
                <Button
                  onClick={() => handleDelete(university.id)}
                  className="bg-accent text-white hover:bg-primary"
                >
                  Delete
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted mb-2">
                <strong>Location:</strong> {university.location}
              </p>
              <p className="text-muted mb-2">
                <strong>Established:</strong> {university.establishedYear}
              </p>
              <p className="text-muted mb-2">
                <strong>Programs:</strong>{" "}
                {university.programs.length > 0
                  ? university.programs.join(", ")
                  : "None"}
              </p>
              <p className="text-muted">{university.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
