import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import StepOne from '../components/Hall Profile/StepOne';
import StepTwo from '../components/Hall Profile/StepTwo';
import StepThree from '../components/Hall Profile/StepThree';
import colors from '../config/colors';
import Screen from '../components/Screen';
import Toast from 'react-native-toast-message';
import useApi from '../Hooks/useApi';

export default function HallProfileFormScreen({ route, navigation }) {
  const editMode = route?.params?.editMode || false;
  const hallId = route?.params?.hallId || null;

  const [step, setStep] = useState(1);

  // Keep form data for all steps here
  const [formData, setFormData] = useState({
    stepOne: {},
    stepTwo: {},
    stepThree: {},
  });

  const stepOneRef = useRef();
  const stepTwoRef = useRef();
  const stepThreeRef = useRef();

  // API hooks for creating and updating halls
  const { request: createHallRequest, loading: creating } = useApi('POST', '/api/halls');
  const { request: updateHallRequest, loading: updating } = useApi('PUT', hallId ? `/api/halls/update/${hallId}` : null);

  // Update form data for a step
  const updateFormData = (stepKey, data) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
  };

  // Handle step navigation with validation when moving forward only
  const handleStepChange = async (selectedStep) => {
    if (selectedStep === step) return;

    if (selectedStep > step) {
      // Validate current step before going forward
      let isValid = false;
      let stepData = null;

      if (step === 1) {
        stepData = await stepOneRef.current?.validateAndSubmit();
        isValid = !!stepData;
        if (isValid) {
          updateFormData('stepOne', stepData);
        }
      } else if (step === 2) {
        stepData = await stepTwoRef.current?.validateAndSubmit();
        isValid = !!stepData;
        if (isValid) {
          updateFormData('stepTwo', stepData);
        }
      } else if (step === 3 && !editMode) {
        stepData = await stepThreeRef.current?.validateAndSubmit();
        isValid = !!stepData;
        if (isValid) {
          updateFormData('stepThree', stepData);
        }
      }

      if (isValid) {
        setStep(selectedStep);
      } else {
        Toast.show({ type: 'error', text1: 'Please fix errors before proceeding' });
      }
    } else {
      // Going backward allowed without validation
      setStep(selectedStep);
    }
  };

  // Handle final form submission
 // Handle final form submission
const handleSubmit = async () => {
  try {
    // Only validate the current step if it's the last step, use stored data for others
    let stepOneData = formData.stepOne;
    let stepTwoData = formData.stepTwo;
    let stepThreeData = formData.stepThree;

    // If current step is the final step, validate it
    if ((editMode && step === 2) || (!editMode && step === 3)) {
      if (step === 2) {
        stepTwoData = await stepTwoRef.current?.validateAndSubmit();
        if (!stepTwoData) {
          Toast.show({ type: 'error', text1: 'Please complete Step 2 fields.' });
          return;
        }
        updateFormData('stepTwo', stepTwoData);
      } else if (step === 3) {
        stepThreeData = await stepThreeRef.current?.validateAndSubmit();
        if (!stepThreeData) {
          Toast.show({ type: 'error', text1: 'Please complete Step 3 fields.' });
          return;
        }
        updateFormData('stepThree', stepThreeData);
      }
    }

    // Validate that we have data from all required steps
    if (!stepOneData || Object.keys(stepOneData).length === 0) {
      Toast.show({ type: 'error', text1: 'Please complete Step 1 fields.' });
      setStep(1);
      return;
    }

    if (!stepTwoData || Object.keys(stepTwoData).length === 0) {
      Toast.show({ type: 'error', text1: 'Please complete Step 2 fields.' });
      setStep(2);
      return;
    }

    if (!editMode && (!stepThreeData || Object.keys(stepThreeData).length === 0)) {
      Toast.show({ type: 'error', text1: 'Please complete Step 3 fields.' });
      setStep(3);
      return;
    }

    // Combine all form data
    const hallData = {
      ...formData.stepOne,
      ...formData.stepTwo,
      ...stepThreeData,
    };

    console.log('Submitting hall data:', hallData); // Debug log

    if (editMode && hallId) {
      await updateHallRequest(hallData);
      Toast.show({ type: 'success', text1: 'Hall updated successfully' });
    } else {
      await createHallRequest(hallData);
      Toast.show({ type: 'success', text1: 'Hall created successfully' });
    }

    navigation.navigate('Manager Tab');
  } catch (error) {
    console.error('Submission error:', error); // Debug log
    Toast.show({
      type: 'error',
      text1: 'Submission Failed',
      text2: error.message || 'Something went wrong',
    });
  }
};

  // Render the current step component with props
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            ref={stepOneRef}
            data={formData.stepOne}
            onChange={(data) => updateFormData('stepOne', data)}
            editMode={editMode}
            hallId={hallId}
          />
        );
      case 2:
        return (
          <StepTwo
            ref={stepTwoRef}
            data={formData.stepTwo}
            onChange={(data) => updateFormData('stepTwo', data)}
            editMode={editMode}
            hallId={hallId}
          />
        );
      case 3:
        return editMode
          ? null
          : (
         <StepThree
  data={{ selectedPlan: null }}
  onChange={({ selectedPlan }) => console.log('Selected plan:', selectedPlan)}
  onProceedToPayment={(plan) => {
   
    navigation.navigate('PaymentScreen', {
      amount: plan.priceValue, 
      planTitle: plan.title,
      planId: plan.id,
    });
  }}
/>

          );
      default:
        return null;
    }
  };

  const isLoading = creating || updating;

  return (
    <Screen>
      <FlatList
        data={[{ key: 'form' }]}
        contentContainerStyle={styles.scrollContainer}
        renderItem={() => (
          <View style={styles.container}>
            <View style={styles.progressContainer}>
              {[1, 2, ...(editMode ? [] : [3])].map((s) => (
                <TouchableOpacity key={s} onPress={() => handleStepChange(s)}>
                  <View
                    style={[
                      styles.stepDot,
                      step >= s && styles.activeStep,
                      step === s && styles.currentStep,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {renderStep()}

            {/* Show submit button on the last step */}
            {(editMode && step === 2) || (!editMode && step === 3) ? (
              isLoading ? (
                <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 20 }} />
              ) : (
                <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                  <Text style={styles.btnText}>{editMode ? 'Update' : 'Submit'}</Text>
                </TouchableOpacity>
              )
            ) : null}

            {/* Debug info - Remove in production */}
         
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  progressContainer: {
    paddingBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stepDot: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  activeStep: {
    backgroundColor: colors.secondary,
  },
  currentStep: {
    backgroundColor: colors.secondary,
  },
  submitBtn: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },


});