// ============================================================================
// ROCKETSEAT Bootcamp GoStack
// Challenge 01: Project Manager
// ============================================================================
// Revision History
//
// Revision     Author                Date             Description
// v01          LUCIANO RONCHINI      19/APR/2020      First Release
// ============================================================================
// Reference
//
// Bootcamp GoStack Module 2 "Back-end com Node.js"
// ============================================================================

// **************************** Declarations **********************************
const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// ***************************** Middlewares **********************************
// Returns an error if the project id selected is not a UUID
function validateProjectId(request, response, next) {
  const {id} = request.params;

  if(!isUuid(id)) {
      return response.status(400).json({error: 'Invalid project ID'});
  }
  return next();
}
app.use('/repositories/:id', validateProjectId);

// ******************************* Routes *************************************
// List repositories
app.get("/repositories", (request, response) => {
  const {title} = request.query;
  const results = title
      ? repositories.filter(repository => repository.title.includes(title))
      : repositories;

  return response.json(results);  
});

// Insert a new repository
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(repository);
  
  return response.json(repository);
});

// Update a repository
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

// Delete a repository
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

// Add a like reaction to a repository
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  const repository = repositories[repositoryIndex];
  repository.likes += 1;

  return response.status(200).json(repositories[repositoryIndex]);
  
});

module.exports = app;
