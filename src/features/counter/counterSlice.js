import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    posts: [],
    page: 0
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.page += 1;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const loadPosts = () => (dispatch, state) => {
  fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${state().counter.page}`)
    .then((res) => {
        if(res.status !== 200){
            alert('ERROR, COULD FETCH POSTS');
        } else {
            return res.json()
        }
    })
    .then((data) => {
      dispatch(incrementByAmount(data.hits));
    })
    .catch((error) => {
      alert(error);
    })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = state => state.counter.posts;

export default counterSlice.reducer;
