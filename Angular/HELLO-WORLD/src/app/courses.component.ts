//Step1: Build a basic component in Angular
//Step2: Register this component in a Module (see app.module.ts)
//Step3: Add elements of the template (see app.component.html)
//ALL THE THREE STEPS could be replaced by ">ng g c componentName" in the command window, eg. ">ng g c course"
import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses', //CSS: <courses> "courses" OR <div class="courses"> ".courses" OR <div id="courses"> "#courses"
    template: `
        <h2>{{ title }}</h2>
        <ul>
            <li *ngFor="let course of courses">
                {{ course }}
            </li>
        </ul>
    `
    //"{{ }}" is a special syntax in Angular to render something within the template dynamically
    //{{ getTitle() }} works the same
    //{{ "Title: " + title }} also works (appending the "Title: " part)
    //This could be '', but using ``(backticks) allows us to break the template into multiple lines and make it more readable
    //"ngFor" is a directive here, and whenever using a directive that modifies the structure of a dom by adding or removing an element, we need to prefix that directive with a '*'
    //let course of courses == int element : elements (in java)
})

export class CoursesComponent {
    title = "List of Courses";

    getTitle() {
        return this.title;
    }

    //Hard coding the elements
    //courses = ["Mathematics", "Physics", "Chemistry"];

    courses;
    //Get elements from a server
    //Approach1: Logic for calling an HTTP service
        //Problems of Approach1: 1. it depends upon a live HTTP Endpoint (which makes it harder to execute those unittests) -> so we will need to create a fake implementation of an HTTP service
        //                       2. needs to repeat this logic in multiple places if there are multiple pages or something
        //                       3. a component should not include any other logic other than the presentation logic
    /*
    constructor() {
        let service = new CoursesService();
        this.courses = service.getCourses();
    }
    */
    //Approach2: Ask Angular to create the instance of a server
        //Advantages: 1. less fragile and easier for changes, Angular will automatically instantiate a new CoursesService object
        //            2. when unittest, instead of supplying an actual CoursesService to this constructor, we can create a fake implementation of the service and doesn't use an HTTP service on the back-end
        //               in other words, we have decoupled the courses components from CoursesService  
    constructor(service: CoursesService) {
        //Dependency Injection: injecting or providing the dependencies of a class into its constructor
        //REMEMBER to modify the provider in app.module.ts -> in order to register this dependency in the module
        //Singleton: a single instance of a given object exists in the memory
        this.courses = service.getCourses();
    }
    //Quick Generator of a service: >ng g s serviceName, eg. >ng g s email
}