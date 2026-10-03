// ==========================================
// QUIZ: ENROLLMENT SYSTEM
// ==========================================
// A practical application of TypeScript advanced concepts including
// Classes, Interfaces, Generics, and Access Modifiers.

// 1. Literal Types & Union Types
type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
type EnrollmentStatus = "Active" | "Completed" | "Dropped";

// 2. Interfaces
interface Person {
    id: number;
    name: string;
    email: string;
}

interface Course {
    courseId: string;
    title: string;
    level: CourseLevel;
    capacity: number;
}

// 3. Classes with Access Modifiers
class Student implements Person {
    constructor(
        public readonly id: number,
        public name: string,
        public email: string,
        private enrolledCourses: Map<string, EnrollmentStatus> = new Map()
    ) {}

    enroll(courseId: string): void {
        this.enrolledCourses.set(courseId, "Active");
    }

    drop(courseId: string): void {
        if (this.enrolledCourses.has(courseId)) {
            this.enrolledCourses.set(courseId, "Dropped");
        }
    }

    complete(courseId: string): void {
        if (this.enrolledCourses.has(courseId)) {
            this.enrolledCourses.set(courseId, "Completed");
        }
    }

    getEnrolledCourses(): Map<string, EnrollmentStatus> {
        return this.enrolledCourses;
    }
}

// 4. Generics (A generic repository for managing data)
class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }

    // A generic search function using a predicate
    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
}

// 5. The Main Enrollment System
class EnrollmentSystem {
    private students: Repository<Student>;
    private courses: Repository<Course>;

    constructor() {
        this.students = new Repository<Student>();
        this.courses = new Repository<Course>();
    }

    addCourse(course: Course): void {
        this.courses.add(course);
        console.log(`Course '${course.title}' added successfully.`);
    }

    registerStudent(student: Student): void {
        this.students.add(student);
        console.log(`Student '${student.name}' registered successfully.`);
    }

    enrollStudentInCourse(studentId: number, courseId: string): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.courseId === courseId);

        if (!student) {
            console.error(`Student with ID ${studentId} not found.`);
            return;
        }

        if (!course) {
            console.error(`Course with ID ${courseId} not found.`);
            return;
        }

        // Check capacity
        const enrolledCount = this.students.getAll().filter(s => 
            s.getEnrolledCourses().get(courseId) === "Active"
        ).length;

        if (enrolledCount >= course.capacity) {
            console.error(`Enrollment failed: Course '${course.title}' is full.`);
            return;
        }

        student.enroll(courseId);
        console.log(`Successfully enrolled ${student.name} in ${course.title}.`);
    }
}

// ==========================================
// EXAMPLE USAGE
// ==========================================
const system = new EnrollmentSystem();

// Adding Courses
system.addCourse({ courseId: "CS101", title: "Intro to Computer Science", level: "Beginner", capacity: 2 });
system.addCourse({ courseId: "TS201", title: "Advanced TypeScript", level: "Advanced", capacity: 5 });

// Registering Students
const alice = new Student(1, "Alice Smith", "alice@example.com");
const bob = new Student(2, "Bob Jones", "bob@example.com");
const charlie = new Student(3, "Charlie Brown", "charlie@example.com");

system.registerStudent(alice);
system.registerStudent(bob);
system.registerStudent(charlie);

// Enrolling Students
system.enrollStudentInCourse(1, "CS101");
system.enrollStudentInCourse(2, "CS101");
system.enrollStudentInCourse(3, "CS101"); // Should fail due to capacity (2)

system.enrollStudentInCourse(1, "TS201"); // Alice takes advanced TS

// View Alice's courses
console.log("Alice's Courses:", alice.getEnrolledCourses());

export {};
