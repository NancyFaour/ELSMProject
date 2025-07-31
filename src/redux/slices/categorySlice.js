import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// export const fetchCategories = createAsyncThunk(
//   'categories/fetchCategories',
//   async () => {
//     const response = await axios.get('/api/categories');
//     if (response.status !== 200) {
//       throw new Error('Failed to fetch categories');
//     }
//     return response.data;
//   }
// );

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],//holds all categories
    loading: false,//indicates if categories are being loaded
    error: null,//holds any error that occurs during fetching
    isModalOpen: false,//indicates if the modal for category management is open
  },
  reducers:{
    fetchCategoriesSaga: (state) => {
      state.loading = true; // Set loading to true when fetching categories
    },
    addCategorySaga: (state, action) => {
     state.loading = true; // Set loading to true when adding category
    },
     updateCategorySaga:(state,action)=>{
      state.loading = true; // Set loading to true when updating category
     },
     deleteCategorySaga:(state,action)=>{
      state.loading = true; 
     },
     //Success / failure 
     fetchCategoriesSuccess: (state,action) => {
       state.loading = false;
       state.list = action.payload;
     },
     fetchCategoriesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      addCategorySuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add new category to the list
        state.isModalOpen = false; // Close modal after adding category
      },
      addCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateCategorySuccess: (state, action) => {
        state.loading=false;
        const index = state.list.findIndex(cat=> cat.id ==action.payload.id);
        if(index!==-1){
          state.list[index] = action.payload; // Update the category in the list
          state.isModalOpen = false; // Close modal after updating category
        } 
      },
      updateCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteCategorySuccess: (state, action) => {
        state.loading = false;
        state.list = state.list.filter(cat => cat.id !== action.payload); // Remove deleted category from the list
      },
      deleteCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      setIsModalOpen: (state, action) => {
        state.isModalOpen = action.payload; // Set modal open state
      },
  },
 
});
export const {
  fetchCategoriesSaga,
  addCategorySaga,
  updateCategorySaga,
  deleteCategorySaga,
  
  fetchCategoriesSuccess,
  fetchCategoriesFailure, 
  addCategorySuccess,
  addCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
  setIsModalOpen
} = categorySlice.actions;

export default categorySlice.reducer;






























//   reducers: {
//     addCategory: (state, action) => {
//       state.list.push(action.payload);
//       state.isModalOpen = false; // Close modal after adding category
//     },
//     updateCategory: (state, action) => {
//       const index = state.list.findIndex(cat => cat.id === action.payload.id);
//       if (index !== -1) {
//         state.list[index] = action.payload;
//         state.isModalOpen = false; // Close modal after updating category
//       }
//     },
//     deleteCategory: (state, action) => {
//       state.list = state.list.filter(cat => cat.id !== action.payload);
//     },
//     setIsModalOpen: (state, action) => {
//       state.isModalOpen = action.payload; // Set modal open state
//     },
   
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchCategories.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
     
      
//   },
// });

// export const { addCategory, updateCategory, deleteCategory, setIsModalOpen} = categorySlice.actions;
// export default categorySlice.reducer;
