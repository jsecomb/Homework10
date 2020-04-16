const Employee = require("./Employee");

class Intern extends Employee { 
   constructor(_name, _id, _email, _school){
      super(_name, _id, _email);
      this.school = _school;
   }

   getRole() {
       return "Intern"
   }

   getSchool() {
        return this.school;
   }
}
  
module.exports = Intern;