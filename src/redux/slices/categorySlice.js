import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get('/api/categories');
    if (response.status !== 200) {
      throw new Error('Failed to fetch categories');
    }
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],//holds all categories
    loading: false,//indicates if categories are being loaded
    error: null,//holds any error that occurs during fetching
    isModalOpen: false,//indicates if the modal for category management is open
  },
  reducers: {
    addCategory: (state, action) => {
      state.list.push(action.payload);
      state.isModalOpen = false; // Close modal after adding category
    },
    updateCategory: (state, action) => {
      const index = state.list.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        state.isModalOpen = false; // Close modal after updating category
      }
    },
    deleteCategory: (state, action) => {
      state.list = state.list.filter(cat => cat.id !== action.payload);
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload; // Set modal open state
    },
   
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
      
  },
});

export const { addCategory, updateCategory, deleteCategory, setIsModalOpen} = categorySlice.actions;
export default categorySlice.reducer;
