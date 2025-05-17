import React, { useRef, useEffect } from 'react';
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
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../AppTextInput';
import AppErrorMessage from '../AppErrorMessage';
import ImageInputList from './ImageInputList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Screen from '../Screen';
const StepTwoSchema = Yup.object().shape({
  capacity: Yup.number()
    .required('Capacity is required')
    .min(1, 'Capacity must be greater than 0'),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be between 20 and 100 characters")
    .max(100, "Description must be between 20 and 100 characters"),
  menuPackages: Yup.array().min(1, 'At least one menu package is required'),
  images: Yup.array().min(1, 'At least one image is required'),
  rentalPrice: Yup.number()
    .required('Rental price is required')
    .min(0, 'Rental price must be a positive number'),
});

const StepTwo = React.forwardRef((_, ref) => {
  const formikRef = useRef();

  React.useImperativeHandle(ref, () => ({
    validateAndSubmit: async () => {
      const isValid = await formikRef.current?.validateForm();
      formikRef.current?.setTouched({
        capacity: true,
        menuPackages: true,
        images: true,
        rentalPrice: true,
      });
      return Object.keys(isValid).length === 0;
    },
  }));

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Formik
            innerRef={formikRef}
            initialValues={{
              capacity: '',
              description: '',
              menuPackages: [],
              images: [],
              newPackage: '',
              newPrice: '',
              rentalPrice: '',
            }}
            validationSchema={StepTwoSchema}
            onSubmit={(values) => {
              console.log('StepTwo submitted:', values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              setFieldValue,
              errors,
              touched,
              setFieldTouched,
              validateField,
              validateForm,
            }) => {
              const validateImageField = () => {
                if (values.images.length > 0) {
                  validateField('images');
                }
              };

              useEffect(() => {
                if (touched.images) {
                  validateImageField();
                }
              }, [values.images.length, touched.images]);

              const handleAddImage = async (uri) => {
                const updatedImages = [...values.images, uri];
                await setFieldValue('images', updatedImages);
                await setFieldTouched('images', true);
              };

              const handleRemoveImage = async (uri) => {
                const updatedImages = values.images.filter((imageUri) => imageUri !== uri);
                await setFieldValue('images', updatedImages);
                await setFieldTouched('images', true);
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
                }
              };

              const removeMenuPackage = async (index) => {
                const updated = values.menuPackages.filter((_, i) => i !== index);
                await setFieldValue('menuPackages', updated);
                await setFieldTouched('menuPackages', true);
                validateField('menuPackages');
              };

              return (
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
                    onChangeText={handleChange('capacity')}
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
                                        onChangeText={handleChange('rentalPrice')}
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
                    onChangeText={handleChange('description')}
                    onBlur={() => {
                      setFieldTouched('description');
                      validateField('description');
                    }}
                    style={styles.descriptionField}
                    multiline={true}
                    textAlignVertical="top"
                  />
                  <AppErrorMessage visible={touched.description} error={errors.description} />

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

                  <AppErrorMessage visible={touched.menuPackages && errors.menuPackages} error={errors.menuPackages} />

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
              );
            }}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
});

export default StepTwo;
