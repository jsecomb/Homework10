const Employee = require("./Employee");

class Engineer extends Employee { 
   constructor(_name, _id, _email, _gitHub){
      super(_name, _id, _email);
      this.github = _gitHub;
   }

   getRole() {
       return "Engineer"
   }

   getGithub() {
        return this.github;
   }
}
  
module.exports = Engineer;
  
