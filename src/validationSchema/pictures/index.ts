import * as yup from 'yup';

export const pictureValidationSchema = yup.object().shape({
  title: yup.string().required(),
  caption: yup.string().nullable(),
  tag: yup.string().nullable(),
  order: yup.number().integer().nullable(),
  album_id: yup.string().nullable().required(),
});
