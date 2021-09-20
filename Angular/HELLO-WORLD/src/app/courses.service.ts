//Service is a plain type of class, so no need for @Component()
export class CoursesService {
    getCourses() {
        return ["Mathematics", "Physics", "Chemistry"];
    }
}