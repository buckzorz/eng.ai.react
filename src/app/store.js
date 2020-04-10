import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Table/tableData';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
