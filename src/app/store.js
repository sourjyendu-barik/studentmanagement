//import { configureStore } from "@reduxjs/toolkit";
// import { studentsSlice } from "../features/students/studentsSlice";
// import { schoolSlice } from "../features/school/schoolSlice";

//export default configureStore({
// reducer: {
// students: studentsSlice.reducer,
// school: schoolSlice.reducer,
//  },
//});

import { configureStore } from "@reduxjs/toolkit";
import studentReducers from "../pages/students/studentsSlice";
//import studentsSlice from "../features/studentsSlice";
import schoolReducer from "../pages/school/schoolSlice";
import teacherReducer from "../pages/Teachers/teacherSlice";
export default configureStore({
  reducer: {
    students: studentReducers,
    school: schoolReducer,
    teachers: teacherReducer,
  },
});
