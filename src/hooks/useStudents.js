import { useState, useEffect, useCallback } from 'react'
import { SAMPLE_STUDENTS } from '../data/sampleStudents'

const STORAGE_KEY = 'student_registration_data'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (_) {}
  // Seed with sample data on first load
  return SAMPLE_STUDENTS
}

function save(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  } catch (_) {}
}

/**
 * useStudents — central state hook for all student data.
 *
 * Returns:
 *   students      — array of student objects
 *   addStudent    — (student) => void
 *   removeStudent — (id) => void
 *   clearAll      — () => void
 */
export function useStudents() {
  const [students, setStudents] = useState(load)

  // Persist on every change
  useEffect(() => { save(students) }, [students])

  const addStudent = useCallback((student) => {
    setStudents(prev => [student, ...prev])
  }, [])

  const removeStudent = useCallback((id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setStudents([])
  }, [])

  return { students, addStudent, removeStudent, clearAll }
}
