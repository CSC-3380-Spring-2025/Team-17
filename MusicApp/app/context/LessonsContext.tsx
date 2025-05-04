import React, {useState, createContext} from 'react';

const [lessons, setLessons] = useState(0);
export const LessonContext = createContext({lessons, setLessons});