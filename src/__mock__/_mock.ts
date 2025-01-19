import {
  _id,
  _ages,
  _roles,
  _prices,
  _emails,
  _ratings,
  _nativeS,
  _nativeM,
  _nativeL,
  _percents,
  _booleans,
  _sentences,
  _lastNames,
  _fullNames,
  _tourNames,
  _jobTitles,
  _taskNames,
  _fileSizes,
  _postTitles,
  _firstNames,
  _fullAddress,
  _imagePrefix,
  _companyNames,
  _productNames,
  _descriptions,
  _phoneNumbers,
  _imageFormats,
  _imageSubjects,
  _imageSuffixes,
  _imageResolutions,
} from './assets';

// ----------------------------------------------------------------------

const generateTime = (index: number) => {
  const date = new Date();
  date.setDate(date.getDate() - index);
  date.setHours(date.getHours() - index);
  return date;
};

export const _mock = {
  boolean: (index: number) => _booleans[index],
  companyName: (index: number) => _companyNames[index],
  description: (index: number) => _descriptions[index],
  // Contact
  email: (index: number) => _emails[index],
  // File properties
  file: {
    format: (index: number) => _imageFormats[index % _imageFormats.length],
    imageName: (index: number): string => {
      const prefix = _imagePrefix[index % _imagePrefix.length];
      const subject = _imageSubjects[index % _imageSubjects.length];
      const suffix = _imageSuffixes[index % _imageSuffixes.length];
      const timestamp = String(Date.now()).slice(-6);
      return `${prefix}${subject}_${timestamp}_${suffix}`;
    },
    resolution: (index: number) => _imageResolutions[index % _imageResolutions.length],
    size: (index: number) => _fileSizes[index % _fileSizes.length],
  },
  // Name
  firstName: (index: number) => _firstNames[index],
  fullAddress: (index: number) => _fullAddress[index],
  fullName: (index: number) => _fullNames[index],
  id: (index: number) => _id[index],
  jobTitle: (index: number) => _jobTitles[index],
  lastName: (index: number) => _lastNames[index],
  // Number
  number: {
    age: (index: number) => _ages[index],
    nativeL: (index: number) => _nativeL[index],
    nativeM: (index: number) => _nativeM[index],
    nativeS: (index: number) => _nativeS[index],
    percent: (index: number) => _percents[index],
    price: (index: number) => _prices[index],
    rating: (index: number) => _ratings[index],
  },
  phoneNumber: (index: number) => _phoneNumbers[index],
  postTitle: (index: number) => _postTitles[index],
  productName: (index: number) => _productNames[index],
  role: (index: number) => _roles[index],
  sentence: (index: number) => _sentences[index],
  // Text
  taskNames: (index: number) => _taskNames[index],
  time: (index: number) => generateTime(index),
  tourName: (index: number) => _tourNames[index],
};
