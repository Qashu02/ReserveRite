import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../../config/colors';

export default function StepThree() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'monthly',
      title: 'Monthly Plan',
      price: '$50 / month',
      description: 'Billed monthly',
      savings: '',
    },
    {
      id: '6months',
      title: '6 Months Plan',
      price: '$270 / 6 months',
      description: 'Save $30 compared to monthly',
      savings: 'Save $30',
    },
    {
      id: 'yearly',
      title: 'Yearly Plan',
      price: '$500 / year',
      description: 'Best value plan',
      savings: 'Save $100',
    },
  ];

  const handleSelect = (id) => {
    setSelectedPlan(id);
    console.log("Selected Plan:", id);
  };

  const handleSave = () => {
    if (selectedPlan) {
      console.log('Saving plan:', selectedPlan);
      // Navigate or perform save action
    } else {
      alert('Please select a plan first');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Pricing Plan</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.card,
              selectedPlan === plan.id && styles.selectedCard,
            ]}
            onPress={() => handleSelect(plan.id)}
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.title}>{plan.title}</Text>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.description}>{plan.description}</Text>
              </View>

              {plan.savings ? (
                <View style={styles.savingsContainer}>
                  <Text style={styles.savingsText}>{plan.savings}</Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
   
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  selectedCard: {
    borderColor: colors.secondary,
    backgroundColor: '#fff5f5',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 16,
    marginTop: 4,
    color: '#555',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: '#777',
  },
  savingsContainer: {
    backgroundColor: colors.secondary, // your secondary color
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  savingsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  saveContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
