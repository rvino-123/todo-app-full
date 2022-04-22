import { axiosClient } from '../../config/axios'

export const getCategories = async () => {
  const config = {
    method: 'get',
    url: '/categories',
  }

  const categories = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)
  return categories
}
export const getCategory = async (categoryId) => {
  const config = {
    method: 'get',
    url: `/categories/${categoryId}`,
  }

  const category = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)

  return category
}

export const createCategory = async (formData) => {
  const config = {
    method: 'post',
    url: `/categories`,
    data: formData,
  }

  const createdCategory = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)

  return createdCategory
}

export const editCategory = async (categoryId, formData) => {
  const config = {
    method: 'put',
    url: `/categories/${categoryId}`,
    data: formData,
  }

  const editedCategory = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)

  return editedCategory
}

export const deleteCategory = async (categoryId) => {
  const config = {
    method: 'delete',
    url: `/categories/${categoryId}`,
  }

  const createdCategory = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)

  return createdCategory
}

// export const addCategoryToListItem = async (id, categoryRef) => {
//   const item = await getListItemById(id);
//   console.log("this is id: ", item);
//   const editedItem = {
//     ...item.data(),
//     categoryRef,
//     editedAt: serverTimestamp(),
//   };

//   console.log("this is edited item: ", editedItem);

//   try {
//     await setDoc(doc(db, "items", id), editedItem);
//   } catch (err) {
//     console.log(err);
//   }
// };
