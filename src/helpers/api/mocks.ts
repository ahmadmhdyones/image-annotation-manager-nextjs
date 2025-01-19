import { AxiosInstance } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { API_URL, API_MOCK_DELAY } from '@/configs/global.config';

import { QueryParams } from '@/helpers/map-params';
import { _images, _categories, _annotations } from '@/__mock__';

import { endpoints } from './endpoints';

// ----------------------------------------------------------------------

/**
 * API Mocks Configuration
 *
 * Simulates backend API responses for development:
 * - Mocks CRUD operations for categories, images, and annotations
 * - Maintains data consistency across related resources
 * - Simulates server delays and error scenarios
 * - Enables development without backend dependency
 *
 * Usage: Automatically enabled when API_MOCK_ENABLED is true
 */

export const setupMocks = (instance: AxiosInstance) => {
  const mock = new AxiosMockAdapter(instance, {
    delayResponse: API_MOCK_DELAY,
    onNoMatch: 'passthrough',
  });

  /* -------------------------------------------------------------------------- */
  /*                                Categories                                  */
  /* -------------------------------------------------------------------------- */

  mock.onGet(new RegExp(`${API_URL}${endpoints.categories}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const category = _categories.find(cat => cat.id === id);
    if (!category) {
      return [404, { message: 'Category not found', status: 'error' }];
    }

    return [200, category];
  });

  mock.onGet(`${API_URL}${endpoints.categories}/count`).reply(() => {
    return [200, _categories.length];
  });

  mock.onGet(`${API_URL}${endpoints.categories}`).reply(200, _categories);

  mock.onPost(`${API_URL}${endpoints.categories}`).reply(config => {
    const newCategory = JSON.parse(config.data);

    // Generate new ID (max + 1)
    const newId = Math.max(..._categories.map(c => c.id)) + 1;
    const category = {
      ...newCategory,
      id: newId,
    };
    _categories.push(category);

    return [201, category];
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

    return [200, _categories[index]];
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

    return [200, {}];
  });

  /* -------------------------------------------------------------------------- */
  /*                                Images                                      */
  /* -------------------------------------------------------------------------- */

  mock.onGet(new RegExp(`${API_URL}${endpoints.images}/\\d+/annotations/count`)).reply(config => {
    const id = parseInt(config.url?.split(`${endpoints.images}/`)[1].split('/annotations/count')[0] || '0');

    const image = _images.find(img => img.id === id);
    if (!image) {
      return [404, { message: 'Image not found', status: 'error' }];
    }
    const annotations = _annotations.filter(ann => ann.imageId === id);

    return [200, annotations.length];
  });

  mock.onGet(new RegExp(`${API_URL}${endpoints.images}/\\d+/annotations`)).reply(config => {
    const id = parseInt(config.url?.split(`${endpoints.images}/`)[1].split('/annotations')[0] || '0');

    const image = _images.find(img => img.id === id);
    if (!image) {
      return [404, { message: 'Image not found', status: 'error' }];
    }
    const annotations = _annotations.filter(ann => ann.imageId === id);

    return [200, annotations];
  });

  mock.onGet(new RegExp(`${API_URL}${endpoints.images}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const image = _images.find(img => img.id === id);
    if (!image) {
      return [404, { message: 'Image not found', status: 'error' }];
    }

    return [200, image];
  });

  mock.onGet(`${API_URL}${endpoints.images}/count`).reply(() => {
    return [200, _images.length];
  });

  mock.onGet(`${API_URL}${endpoints.images}`).reply(config => {
    const params = new URLSearchParams(config.params);
    let images = _images;

    // Filter by name
    const name = params.get(QueryParams.NAME)?.toLowerCase();
    if (name) {
      images = images.filter(img => img.name.toLowerCase().includes(name));
    }

    // Filter by category ID
    const categoryId = params.get(QueryParams.CATEGORY);
    if (categoryId) {
      images = images.filter(img => img.categoryId === parseInt(categoryId));
    }

    // Filter by format
    const format = params.get(QueryParams.FORMAT)?.toLowerCase();
    if (format) {
      images = images.filter(img => img.metadata.format.toLowerCase() === format);
    }

    // Filter by resolution
    const resolution = params.get(QueryParams.RESOLUTION);
    if (resolution) {
      images = images.filter(img => `${img.metadata.resolution}` === resolution);
    }

    return [200, images];
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

    return [201, image];
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

    return [200, _images[index]];
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

    return [200, {}];
  });

  /* -------------------------------------------------------------------------- */
  /*                                Annotations                                 */
  /* -------------------------------------------------------------------------- */

  mock.onGet(new RegExp(`${API_URL}${endpoints.annotations}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const annotation = _annotations.find(ann => ann.id === id);
    if (!annotation) {
      return [404, { message: 'Annotation not found', status: 'error' }];
    }

    return [200, annotation];
  });

  mock.onGet(`${API_URL}${endpoints.annotations}/count`).reply(() => {
    return [200, _annotations.length];
  });

  mock.onGet(`${API_URL}${endpoints.annotations}`).reply(200, _annotations);

  mock.onPost(`${API_URL}${endpoints.annotations}`).reply(config => {
    const newAnnotation = JSON.parse(config.data);

    // Generate new ID
    const newId = Math.max(..._annotations.map(ann => ann.id), 0) + 1;

    const annotation = {
      ...newAnnotation,
      id: newId,
    };

    _annotations.push(annotation);

    return [201, annotation];
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

    return [200, _annotations[index]];
  });

  mock.onDelete(new RegExp(`${API_URL}${endpoints.annotations}/\\d+`)).reply(config => {
    const id = parseInt(config.url?.split('/').pop() || '0');

    const index = _annotations.findIndex(ann => ann.id === id);
    if (index === -1) {
      return [404, { message: 'Annotation not found', status: 'error' }];
    }

    _annotations.splice(index, 1);

    return [200, {}];
  });
};
