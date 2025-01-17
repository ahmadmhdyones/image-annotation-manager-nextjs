import { AxiosInstance } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { API_URL } from '@/configs/global.config';

import { QueryParams } from '@/helpers/map-params';
import { _images, _categories, _annotations } from '@/__mock__';

import { endpoints } from './endpoints';

// ----------------------------------------------------------------------

export const setupMocks = (instance: AxiosInstance) => {
  const mock = new AxiosMockAdapter(instance, {
    delayResponse: 1000,
    onNoMatch: 'passthrough',
  });

  /* -------------------------------------------------------------------------- */
  /*                                Categories                                  */
  /* -------------------------------------------------------------------------- */

  mock.onGet(`${API_URL}${endpoints.categories}`).reply(200, {
    data: _categories,
    message: 'Categories fetched successfully',
    status: 'success',
  });

  mock.onGet(`${API_URL}${endpoints.categories}/count`).reply(() => {
    return [200, { data: _categories.length, message: 'Categories fetched successfully', status: 'success' }];
  });

  mock.onGet(new RegExp(`${API_URL}${endpoints.categories}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const category = _categories.find(cat => cat.id === id);
    if (!category) {
      return [404, { message: 'Category not found', status: 'error' }];
    }

    return [200, { data: category, message: 'Category fetched successfully', status: 'success' }];
  });

  mock.onPost(`${API_URL}${endpoints.categories}`).reply(config => {
    const newCategory = JSON.parse(config.data);

    // Generate new ID (max + 1)
    const newId = Math.max(..._categories.map(c => c.id)) + 1;
    const category = {
      ...newCategory,
      id: newId,
    };
    _categories.push(category);

    return [201, { data: category, message: 'Category created successfully', status: 'success' }];
  });

  mock.onPut(new RegExp(`${API_URL}${endpoints.categories}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');
    const updatedCategory = JSON.parse(config.data);

    const index = _categories.findIndex(category => category.id === id);
    if (index === -1) {
      return [404, { message: 'Category not found', status: 'error' }];
    }
    _categories[index] = {
      ..._categories[index],
      ...updatedCategory,
      id, // Ensure ID doesn't change
    };

    return [200, { data: _categories[index], message: 'Category updated successfully', status: 'success' }];
  });

  mock.onDelete(new RegExp(`${API_URL}${endpoints.categories}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const index = _categories.findIndex(category => category.id === id);
    if (index === -1) {
      return [404, { message: 'Category not found', status: 'error' }];
    }
    _categories.splice(index, 1);

    // Delete all images associated with the deleted category
    let imageIndex = _images.length;
    while (imageIndex--) {
      if (_images[imageIndex].categoryId === id) {
        _images.splice(imageIndex, 1);
      }
    }

    // Delete all annotations associated with the deleted image
    let annotationIndex = _annotations.length;
    while (annotationIndex--) {
      if (_annotations[annotationIndex].imageId === id) {
        _annotations.splice(annotationIndex, 1);
      }
    }

    return [200, { data: {}, message: 'Category deleted successfully', status: 'success' }];
  });

  /* -------------------------------------------------------------------------- */
  /*                                Images                                      */
  /* -------------------------------------------------------------------------- */

  mock.onGet(`${API_URL}${endpoints.images}`).reply(config => {
    const params = new URLSearchParams(config.params);
    let images = _images;

    // Support filtering by categoryId from query params
    const categoryId = params.get(QueryParams.CATEGORY);
    if (categoryId) {
      images = images.filter(img => img.categoryId === parseInt(categoryId));
    }

    // support filtering by image name from query params
    const imageName = params.get(QueryParams.NAME)?.toLowerCase();
    if (imageName) {
      images = images.filter(img => img.name.toLowerCase().includes(imageName));
    }

    // support filtering by image format from query params
    const imageFormat = params.get(QueryParams.FORMAT)?.toLowerCase();
    if (imageFormat) {
      images = images.filter(img => img.metadata.format.toLowerCase().includes(imageFormat));
    }

    return [200, { data: images, message: 'Images fetched successfully', status: 'success' }];
  });

  mock.onGet(`${API_URL}${endpoints.images}/count`).reply(() => {
    return [200, { data: _images.length, message: 'Images fetched successfully', status: 'success' }];
  });

  mock.onGet(new RegExp(`${API_URL}${endpoints.images}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const image = _images.find(img => img.id === id);
    if (!image) {
      return [404, { message: 'Image not found', status: 'error' }];
    }

    return [200, { data: image, message: 'Image fetched successfully', status: 'success' }];
  });

  mock.onGet(new RegExp(`${API_URL}${endpoints.images}/\\d+/annotations`)).reply(config => {
    const id = parseInt(config.url?.split(`${endpoints.images}/`)[1].split('/annotations')[0] || '0');

    const image = _images.find(img => img.id === id);
    if (!image) {
      return [404, { message: 'Image not found', status: 'error' }];
    }
    const annotations = _annotations.filter(ann => ann.imageId === id);

    return [200, { data: annotations, message: 'Annotations fetched successfully', status: 'success' }];
  });

  mock.onGet(new RegExp(`${API_URL}${endpoints.images}/\\d+/annotations/count`)).reply(config => {
    const id = parseInt(config.url?.split(`${endpoints.images}/`)[1].split('/annotations/count')[0] || '0');

    const image = _images.find(img => img.id === id);
    if (!image) {
      return [404, { message: 'Image not found', status: 'error' }];
    }
    const annotations = _annotations.filter(ann => ann.imageId === id);

    return [200, { data: annotations.length, message: 'Annotations fetched successfully', status: 'success' }];
  });

  mock.onPost(`${API_URL}${endpoints.images}`).reply(config => {
    const newImage = JSON.parse(config.data);

    // Generate new ID (max + 1)
    const newId = Math.max(..._images.map(img => img.id)) + 1;

    const image = {
      ...newImage,
      id: newId,
      uploadedAt: new Date().toISOString(),
    };

    _images.push(image);

    return [201, { data: image, message: 'Image uploaded successfully', status: 'success' }];
  });

  mock.onPut(new RegExp(`${API_URL}${endpoints.images}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');
    const updatedImage = JSON.parse(config.data);

    const index = _images.findIndex(image => image.id === id);
    if (index === -1) {
      return [404, { message: 'Image not found', status: 'error' }];
    }

    _images[index] = {
      ..._images[index],
      ...updatedImage,
      id, // Ensure ID doesn't change
    };

    return [200, { data: _images[index], message: 'Image updated successfully', status: 'success' }];
  });

  mock.onDelete(new RegExp(`${API_URL}${endpoints.images}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const index = _images.findIndex(image => image.id === id);
    if (index === -1) {
      return [404, { message: 'Image not found', status: 'error' }];
    }

    _images.splice(index, 1);

    // Delete all annotations associated with the deleted image
    let annotationIndex = _annotations.length;
    while (annotationIndex--) {
      if (_annotations[annotationIndex].imageId === id) {
        _annotations.splice(annotationIndex, 1);
      }
    }

    return [200, { data: {}, message: 'Image deleted successfully', status: 'success' }];
  });

  /* -------------------------------------------------------------------------- */
  /*                                Annotations                                 */
  /* -------------------------------------------------------------------------- */

  mock.onGet(`${API_URL}${endpoints.annotations}`).reply(200, {
    data: _annotations,
    message: 'Annotations fetched successfully',
    status: 'success',
  });

  mock.onGet(`${API_URL}${endpoints.annotations}/count`).reply(() => {
    return [200, { data: _annotations.length, message: 'Annotations fetched successfully', status: 'success' }];
  });

  mock.onGet(new RegExp(`${API_URL}${endpoints.annotations}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const annotation = _annotations.find(ann => ann.id === id);
    if (!annotation) {
      return [404, { message: 'Annotation not found', status: 'error' }];
    }

    return [
      200,
      {
        data: annotation,
        message: 'Annotation fetched successfully',
        status: 'success',
      },
    ];
  });

  mock.onPost(`${API_URL}${endpoints.annotations}`).reply(config => {
    const newAnnotation = JSON.parse(config.data);

    // Generate new ID
    const newId = Math.max(..._annotations.map(ann => ann.id), 0) + 1;

    const annotation = {
      ...newAnnotation,
      id: newId,
    };

    _annotations.push(annotation);

    return [
      201,
      {
        data: annotation,
        message: 'Annotation created successfully',
        status: 'success',
      },
    ];
  });

  mock.onPut(new RegExp(`${API_URL}${endpoints.annotations}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');
    const updatedAnnotation = JSON.parse(config.data);

    const index = _annotations.findIndex(ann => ann.id === id);
    if (index === -1) {
      return [404, { message: 'Annotation not found', status: 'error' }];
    }

    _annotations[index] = {
      ..._annotations[index],
      ...updatedAnnotation,
      id, // Ensure ID doesn't change
    };

    return [
      200,
      {
        data: _annotations[index],
        message: 'Annotation updated successfully',
        status: 'success',
      },
    ];
  });

  mock.onDelete(new RegExp(`${API_URL}${endpoints.annotations}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const index = _annotations.findIndex(ann => ann.id === id);
    if (index === -1) {
      return [404, { message: 'Annotation not found', status: 'error' }];
    }

    _annotations.splice(index, 1);

    return [
      200,
      {
        data: {},
        message: 'Annotation deleted successfully',
        status: 'success',
      },
    ];
  });
};
