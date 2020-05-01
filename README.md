# Repository-Manager
Back-end of an API to save and manager new repositories  

// ====================================================================================  
Technologies:  
- NodeJS  
  
Development tools:  
- VS Code  
- Express  
- User Unic ID v4 - uuidv4  

// ====================================================================================  
Description:  
This is a back-end code related an application to create new repositories and manager 
the database with list, update and delete.  
Additionally, it can receive like reactions.  

// ====================================================================================  
Testing:  
In development was used the software Insomnia to the test of routes.  

// --- Routes to test ---  
Create repository:  
[http://localhost:3333/repositories]  
POST  
{  
	"title": "Project_title",  
	"url": "Project_url",  
	"techs": "Technologies_used"  
}  
// ---  
List Repositories:  
[http://localhost:3333/repositories]  
GET  
// ---  
Update repository:  
[http://localhost:3333/repositories/uuid_generated]  
PUT  
{  
	"title": "Project_title",  
	"url": "Project_url",  
	"techs": "Technologies_used"  
}  
// ---  
Delete repository:  
[http://localhost:3333/repositories/uuid_generated]  
DELETE  
// ---  
Like reaction to a repository:  
[http://localhost:3333/repositories/uuid_generated/like]  
POST  
