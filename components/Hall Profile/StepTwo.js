import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppTextInput from '../AppTextInput';
import AppErrorMessage from '../AppErrorMessage';
import ImageInputList from './ImageInputList';
import Screen from '../Screen';

// Validation schema
const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, 'Please add at least one image'),
  capacity: Yup.number()
    .required('Capacity is required')
    .min(1, 'Capacity must be at least 1'),
  rentalPrice: Yup.number()
    .required('Rental price is required')
    .min(1, 'Rental price must be positive'),
  description: Yup.string().required('Description is required'),
  menuPackages: Yup.array().min(1, 'Please add at least one menu package'),
  newPackage: Yup.string(), // not required for form submission
  newPrice: Yup.number(), // not required for form submission
});

const StepTwo = forwardRef(({ data, onChange }, ref) => {
  const formikRef = useRef();

  useImperativeHandle(ref, () => ({
    validateAndSubmit: async () => {
      const errors = await formikRef.current.validateForm();
      
      // Mark all fields as touched to show validation errors
      formikRef.current.setTouched({
        images: true,
        capacity: true,
        rentalPrice: true,
        description: true,
        menuPackages: true,
      });

      if (Object.keys(errors).length === 0) {
        // Return the actual form values
        const { newPackage, newPrice, ...formData } = formikRef.current.values;
        return formData;
      } else {
        return null;
      }
    },
  }));

  // Get initial values from props or use defaults
  const getInitialValues = () => ({
    images: data?.images || [],
    capacity: data?.capacity || '',
    rentalPrice: data?.rentalPrice || '',
    description: data?.description || '',
    menuPackages: data?.menuPackages || [],
    newPackage: '',
    newPrice: '',
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={getInitialValues()}
      enableReinitialize={true} // Important: This allows form to update when data prop changes
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Your submit logic here, for demo we just log it
        console.log('Submitted data:', values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        validateField,
        handleSubmit,
      }) => {
        // Helper function to call onChange with current form data
        const notifyParentOfChange = () => {
          if (onChange) {
            const { newPackage, newPrice, ...formData } = values;
            onChange(formData);
          }
        };

        // Validate images if touched or changed
        useEffect(() => {
          if (touched.images) {
            validateField('images');
          }
        }, [values.images.length, touched.images]);

        const handleAddImage = async (uri) => {
          const updatedImages = [...values.images, uri];
          await setFieldValue('images', updatedImages);
          await setFieldTouched('images', true);
          notifyParentOfChange();
        };

        const handleRemoveImage = async (uri) => {
          const updatedImages = values.images.filter((imageUri) => imageUri !== uri);
          await setFieldValue('images', updatedImages);
          await setFieldTouched('images', true);
          notifyParentOfChange();
        };

        const addMenuPackage = async () => {
          if (values.newPackage.trim()) {
            const packageObject = {
              name: values.newPackage.trim(),
              pricePerHead: parseFloat(values.newPrice) || 0,
            };

            const updated = [...values.menuPackages, packageObject];
            await setFieldValue('menuPackages', updated);
            await setFieldTouched('menuPackages', true);
            validateField('menuPackages');

            setFieldValue('newPackage', '');
            setFieldValue('newPrice', '');
            Keyboard.dismiss();
            notifyParentOfChange();
          }
        };

        const removeMenuPackage = async (index) => {
          const updated = values.menuPackages.filter((_, i) => i !== index);
          await setFieldValue('menuPackages', updated);
          await setFieldTouched('menuPackages', true);
          validateField('menuPackages');
          notifyParentOfChange();
        };

        return (
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={20}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <Screen>
                  <Text style={styles.label}>Upload Hall Images</Text>
                  <ImageInputList
                    imageUris={values.images}
                    onAddImage={handleAddImage}
                    onRemoveImage={handleRemoveImage}
                  />
                  <AppErrorMessage visible={touched.images && errors.images} error={errors.images} />

                  <Text style={styles.label}>Capacity</Text>
                  <AppTextInput
                    placeholder="e.g. 200"
                    keyboardType="numeric"
                    value={values.capacity}
                    onChangeText={(text) => {
                      handleChange('capacity')(text);
                      notifyParentOfChange();
                    }}
                    onBlur={() => {
                      setFieldTouched('capacity');
                      validateField('capacity');
                    }}
                  />
                  <AppErrorMessage visible={touched.capacity && errors.capacity} error={errors.capacity} />

                  <Text style={styles.label}>Rental Price</Text>
                  <AppTextInput
                    placeholder="e.g., 1500"
                    keyboardType="numeric"
                    value={values.rentalPrice}
                    onChangeText={(text) => {
                      handleChange('rentalPrice')(text);
                      notifyParentOfChange();
                    }}
                    onBlur={() => {
                      setFieldTouched('rentalPrice');
                      validateField('rentalPrice');
                    }}
                  />
                  <AppErrorMessage visible={touched.rentalPrice && errors.rentalPrice} error={errors.rentalPrice} />

                  <Text style={styles.label}>Description</Text>
                  <AppTextInput
                    placeholder="Enter Description"
                    value={values.description}
                    onChangeText={(text) => {
                      handleChange('description')(text);
                      notifyParentOfChange();
                    }}
                    onBlur={() => {
                      setFieldTouched('description');
                      validateField('description');
                    }}
                    style={styles.descriptionField}
                    multiline={true}
                    textAlignVertical="top"
                  />
                  <AppErrorMessage visible={touched.description && errors.description} error={errors.description} />

                  <Text style={styles.label}>Menu Package Name</Text>
                  <TextInput
                    style={styles.input}
                    value={values.newPackage}
                    onChangeText={(text) => setFieldValue('newPackage', text)}
                    placeholder="e.g., Veg, Non-Veg"
                  />

                  <Text style={styles.label}>Price Per Head</Text>
                  <TextInput
                    style={styles.input}
                    value={values.newPrice}
                    onChangeText={(text) => setFieldValue('newPrice', text)}
                    keyboardType="numeric"
                    placeholder="e.g., 1500"
                  />

                  <TouchableOpacity onPress={addMenuPackage} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Package</Text>
                  </TouchableOpacity>

                  <AppErrorMessage
                    visible={touched.menuPackages && errors.menuPackages}
                    error={errors.menuPackages}
                  />

                  <FlatList
                    data={values.menuPackages}
                    renderItem={({ item, index }) => (
                      <View key={index} style={styles.packageItem}>
                        <View>
                          <Text style={styles.packageText}>{item.name}</Text>
                          <Text style={styles.priceText}>PKR {item.pricePerHead.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => removeMenuPackage(index)}
                          style={styles.removeButton}
                        >
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Screen>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        );
      }}
    </Formik>
  );
});

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  descriptionField: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#132743',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  packageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  packageText: {
    color: '#132743',
    fontWeight: '600',
  },
  priceText: {
    color: '#555',
    fontSize: 13,
  },
  removeButton: {
    backgroundColor: '#D7385E',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#132743',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StepTwo;