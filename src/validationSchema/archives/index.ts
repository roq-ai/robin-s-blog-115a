import * as yup from 'yup';

export const archiveValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  picture_id: yup.string().nullable().required(),
});
