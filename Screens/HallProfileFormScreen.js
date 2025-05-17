import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import StepOne from '../components/Hall Profile/StepOne';
import StepTwo from '../components/Hall Profile/StepTwo';
import StepThree from '../components/Hall Profile/StepThree';
import colors from '../config/colors';
import Screen from '../components/Screen';

export default function HallProfileFormScreen({ route, navigation }) {
  const editMode = route?.params?.editMode || false;
  const [step, setStep] = useState(1);
  const stepOneRef = useRef();
  const stepTwoRef = useRef();

  const handleStepChange = async (selectedStep) => {
    // Trigger validation for the current step before allowing navigation
    let isValid = false;

    if (step === 1) {
      isValid = await stepOneRef.current?.validateAndSubmit();
    } else if (step === 2) {
      isValid = await stepTwoRef.current?.validateAndSubmit();
    }

    if (isValid || selectedStep <= step) {
      setStep(selectedStep); // Move to the selected step
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne ref={stepOneRef} />;
      case 2:
        return <StepTwo ref={stepTwoRef} />;
      case 3:
        return editMode ? null : <StepThree />;
      default:
        return null;
    }
  };

  return (
  <Screen>

    <FlatList
      data={[{ key: 'form' }]}
      contentContainerStyle={styles.scrollContainer}
      renderItem={() => (
        <View style={styles.container}>
          {/* Progress Indicator */}
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

          {/* Step Form Component */}
          {renderStep()}

          {/* Submit or Update Button */}
          {editMode && step === 2 && (
            <TouchableOpacity
              onPress={() => alert('Profile Updated')}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          )}

          {!editMode && step === 3 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Manager Tab')}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Pay Now</Text>
            </TouchableOpacity>
          )}
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
    backgroundColor: colors.secondary}
    , // Active steps are marked in the primary color

  currentStep: {
    backgroundColor: colors.secondary, // Current step will have a different color (secondary)
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
