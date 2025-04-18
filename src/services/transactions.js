import { SORT_ORDER } from '../constants/index.js';
import { StudentsCollections } from '../db/models/students.js';
import { calculateData } from '../utils/calculatePage.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollections.find();

  if (filter.gender) {
    studentsQuery.where('gender').equals(filter.gender);
  }
  if (filter.minAge) {
    studentsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAge) {
    studentsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAvgMark) {
    studentsQuery.where('AvgMark').gte(filter.minAvgMark);
  }
  if (filter.maxAvgMark) {
    studentsQuery.where('AvgMark').lte(filter.maxAvgMark);
  }

  //
  // const studentsCount = await StudentsCollections.find()
  // .merge(studentsQuery)
  // .countDocuments();

  // const students = await studentsQuery
  // .skip(skip)
  // .limit(limit)
  // .sort({ [sortBy]: sortOrder })
  // .exec();
  //

  const [studentsCount, students] = await Promise.all([
    StudentsCollections.find().merge(studentsQuery).countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculateData(studentsCount, page, perPage);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentsById = async (studentId) => {
  const student = await StudentsCollections.findById(studentId);
  return student;
};

export const createStudents = async (payload) => {
  const student = await StudentsCollections.create(payload);
  return student;
};

export const deleteStudents = async (studentId) => {
  const student = await StudentsCollections.findByIdAndDelete({
    _id: studentId,
  });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollections.findByIdAndUpdate(
    { _id: studentId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    studentId: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
