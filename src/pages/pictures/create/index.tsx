import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPicture } from 'apiSdk/pictures';
import { pictureValidationSchema } from 'validationSchema/pictures';
import { AlbumInterface } from 'interfaces/album';
import { getAlbums } from 'apiSdk/albums';
import { PictureInterface } from 'interfaces/picture';

function PictureCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PictureInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPicture(values);
      resetForm();
      router.push('/pictures');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PictureInterface>({
    initialValues: {
      title: '',
      caption: '',
      tag: '',
      order: 0,
      album_id: (router.query.album_id as string) ?? null,
    },
    validationSchema: pictureValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Pictures',
              link: '/pictures',
            },
            {
              label: 'Create Picture',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Picture
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.title}
            label={'Title'}
            props={{
              name: 'title',
              placeholder: 'Title',
              value: formik.values?.title,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.caption}
            label={'Caption'}
            props={{
              name: 'caption',
              placeholder: 'Caption',
              value: formik.values?.caption,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.tag}
            label={'Tag'}
            props={{
              name: 'tag',
              placeholder: 'Tag',
              value: formik.values?.tag,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Order"
            formControlProps={{
              id: 'order',
              isInvalid: !!formik.errors?.order,
            }}
            name="order"
            error={formik.errors?.order}
            value={formik.values?.order}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('order', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<AlbumInterface>
            formik={formik}
            name={'album_id'}
            label={'Select Album'}
            placeholder={'Select Album'}
            fetcher={getAlbums}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/pictures')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'picture',
    operation: AccessOperationEnum.CREATE,
  }),
)(PictureCreatePage);
