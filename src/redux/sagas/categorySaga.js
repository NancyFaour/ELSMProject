import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from '../slices/categorySlice';

function* fetchCategoriesWorker() {
  try {
    const response = yield call(axios.get, '/api/categories');
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

function* addCategoryWorker(action) {
    try{
        const response =yield call (axios.post,'/api/categories', action.payload);
        if(response.status === 201) {
            yield put(addCategorySuccess(response.data));
        }else {
            yield put(addCategoryFailure('Failed to add category'));
        }
    } catch (error) {
        yield put(addCategoryFailure(error.message));
    }

}
function* updateCategoryWorker(action) {
    try{
        const response =yield call (axios.put,'/api/categories', action.payload);
        if(response.status === 200) {
            yield put(updateCategorySuccess(response.data));
        }else {
            yield put(updateCategoryFailure('Failed to update category'));
        }
    } catch (error) {
        yield put(updateCategoryFailure(error.message));
    }
}

function* deleteCategoryWorker(action) {
    try{
        const response = yield call(axios.delete, `/api/categories?id=${action.payload}`);
        if (response.status === 200) {
            yield put(deleteCategorySuccess(action.payload));
        } else {
            yield put(deleteCategoryFailure('Failed to delete category'));
        }
    } catch (error) {
        yield put(deleteCategoryFailure(error.message));
    }
}

export default function* categorySaga() {
  yield takeEvery(fetchCategoriesSaga.type, fetchCategoriesWorker);
  yield takeEvery(addCategorySaga.type, addCategoryWorker);
  yield takeEvery(updateCategorySaga.type, updateCategoryWorker);
  yield takeEvery(deleteCategorySaga.type, deleteCategoryWorker);

}