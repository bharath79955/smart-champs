import { courses } from "../data/courses";
import { getStoredData, setStoredData } from "./storage";

const ENROLLMENTS_KEY = "enrollments";
const PROGRESS_KEY = "progress";

function isValidCourse(courseId) {
  return courses.some(
    (course) => String(course.id) === String(courseId)
  );
}

function normalizeCourseId(courseId) {
  const course = courses.find(
    (item) => String(item.id) === String(courseId)
  );

  return course?.id;
}

// Retrieve enrolled course IDs.
export function getEnrollments() {
  const saved = getStoredData(ENROLLMENTS_KEY, []);

  if (!Array.isArray(saved)) {
    return [];
  }

  return [
    ...new Set(
      saved.filter((id) => isValidCourse(id))
    ),
  ];
}

// Enroll in a course.
export function enrollInCourse(courseId) {
  if (!isValidCourse(courseId)) {
    return {
      success: false,
      alreadyEnrolled: false,
      message: "Course not found.",
    };
  }

  const id = normalizeCourseId(courseId);
  const enrolled = getEnrollments();

  if (enrolled.some((item) => String(item) === String(id))) {
    return {
      success: true,
      alreadyEnrolled: true,
      message: "You are already enrolled in this course.",
    };
  }

  const saved = setStoredData(ENROLLMENTS_KEY, [...enrolled, id]);

  if (!saved) {
    return {
      success: false,
      alreadyEnrolled: false,
      message: "Unable to save enrollment. Please try again.",
    };
  }

  return {
    success: true,
    alreadyEnrolled: false,
    message: "Successfully enrolled!",
  };
}

// Get the full course objects for the enrolled courses.
export function getMyCourses() {
  const enrolled = getEnrollments();

  return courses.filter((course) =>
    enrolled.some((id) => String(id) === String(course.id))
  );
}

// Retrieve saved progress for a course.
export function getCourseProgress(courseId) {
  if (!isValidCourse(courseId)) {
    return 0;
  }

  const progress = getStoredData(PROGRESS_KEY, {});
  const value = Number(progress?.[courseId] ?? 0);

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.round(Math.min(100, Math.max(0, value)));
}

// Save progress for an enrolled course.
export function updateCourseProgress(courseId, percentage) {
  if (!isValidCourse(courseId)) {
    return false;
  }

  const enrolled = getEnrollments();

  if (!enrolled.some((id) => String(id) === String(courseId))) {
    return false;
  }

  const numericValue = Number(percentage);

  if (!Number.isFinite(numericValue)) {
    return false;
  }

  const value = Math.round(Math.min(100, Math.max(0, numericValue)));
  const progress = getStoredData(PROGRESS_KEY, {});

  if (!progress || typeof progress !== "object" || Array.isArray(progress)) {
    return false;
  }

  return setStoredData(PROGRESS_KEY, {
    ...progress,
    [courseId]: value,
  });
}