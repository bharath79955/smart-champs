import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  enrollInCourse,
  getEnrollments,
  getCourseProgress,
  updateCourseProgress,
} from "../services/courseService";

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [enrolledIds, setEnrolledIds] = useState(() => getEnrollments());
  const [progressVersion, setProgressVersion] = useState(0);

  // Enroll and synchronize the shared state.
  const enroll = useCallback((courseId) => {
    const result = enrollInCourse(courseId);

    if (result.success) {
      setEnrolledIds(getEnrollments());
    }

    return result;
  }, []);

  // Check whether a course is enrolled.
  const isEnrolled = useCallback(
    (courseId) =>
      enrolledIds.some((id) => String(id) === String(courseId)),
    [enrolledIds]
  );

  // Retrieve saved course progress.
  const getProgress = useCallback(
    (courseId) => {
      void progressVersion;
      return getCourseProgress(courseId);
    },
    [progressVersion]
  );

  // Save course progress and notify consumers.
  const updateProgress = useCallback((courseId, percentage) => {
    const enrolled = getEnrollments().some(
      (id) => String(id) === String(courseId)
    );

    if (!enrolled) {
      return false;
    }

    const saved = updateCourseProgress(courseId, percentage);

    if (saved) {
      setProgressVersion((version) => version + 1);
    }

    return saved;
  }, []);

  // Refresh enrollment state when needed.
  const refreshEnrollments = useCallback(() => {
    setEnrolledIds(getEnrollments());
    setProgressVersion((version) => version + 1);
  }, []);

  const value = useMemo(
    () => ({
      enrolledIds,
      enroll,
      isEnrolled,
      getProgress,
      updateProgress,
      refreshEnrollments,
    }),
    [
      enrolledIds,
      enroll,
      isEnrolled,
      getProgress,
      updateProgress,
      refreshEnrollments,
    ]
  );

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);

  if (!context) {
    throw new Error(
      "useLearning must be used inside LearningProvider."
    );
  }

  return context;
}