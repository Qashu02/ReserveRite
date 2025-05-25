import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import { getReviewsByHall, addReview } from "../api/reviews";
import { UserContext } from '../Utils/userContext';

const ReviewScreen = ({ route }) => {
  const { user, authToken } = useContext(UserContext);
  const { isHallManager, hallId } = route.params;

  const [reviewList, setReviewList] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [replyTexts, setReplyTexts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  
const fetchReviews = async () => {
  setIsLoading(true);
  try {
    const res = await getReviewsByHall(hallId);

    if (!res.ok) {
      Alert.alert('Error', 'Failed to fetch reviews');
      setIsLoading(false);
      return;
    }

    if (Array.isArray(res.data.reviews)) {
      // Filter again by hallId just in case backend sends extra
      const filteredReviews = res.data.reviews.filter(r => r.hallId === hallId);
      setReviewList(filteredReviews);
    } else {
      setReviewList([]);
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred while fetching reviews');
  }
  setIsLoading(false);
};

useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddReview = async () => {
    if (!user) {
      Alert.alert('You must be logged in to post here');
      return;
    }
    if (reviewText.trim() === '' || rating === 0) {
      Alert.alert('Please enter review text and rating');
      return;
    }

    const reviewData = {
      comment: reviewText,
      rating,
      hallId,
    };

    try {
      console.log("Posting review:", reviewData);
      const res = await addReview(reviewData, authToken);
      console.log("API Response:", res);

      if (!res.ok) {
        Alert.alert('Error', 'Failed to post review');
        return;
      }

      setReviewText('');
      setRating(0);
      fetchReviews();
    } catch (error) {
      console.error("Error posting review:", error);
      Alert.alert('Error', 'Something went wrong while posting review');
    }
  };

  const totalReviews = reviewList.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviewList.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  const renderItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewer}>{item.user?.name || 'Guest'}</Text>
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <FontAwesome
            key={i}
            name={i <= item.rating ? 'star' : 'star-o'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
      <Text style={styles.comment}>{item.comment}</Text>

      {item.reply ? (
        <View style={styles.replyContainer}>
          <Text style={styles.replyLabel}>Hall Manager Reply:</Text>
          <Text style={styles.replyText}>{item.reply}</Text>
        </View>
      ) : (
        isHallManager && (
          <AppTextInput
            placeholder="Reply to this review..."
            value={replyTexts[item._id] || ''}
            onChangeText={(text) =>
              setReplyTexts({ ...replyTexts, [item._id]: text })
            }
            style={styles.replyInput}
            placeholderTextColor="#777"
            iconPress="send"
            onIconPress={() => handleReply(item._id)}
          />
        )
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>
          Average Rating: {averageRating} / 5{' '}
          <Text style={styles.summaryText}>({totalReviews})</Text>
        </Text>
      </View>

      {!isHallManager && user && (
        <>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <FontAwesome
                  name={i <= rating ? 'star' : 'star-o'}
                  size={28}
                  color="#FFD700"
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          <AppTextInput
            style={styles.reviewInputContainer}
            placeholder="Write your review..."
            iconPress="send"
            onIconPress={handleAddReview}
            value={reviewText}
            onChangeText={setReviewText}
            onSubmitEditing={handleAddReview}
            placeholderTextColor="#999"
            selectionColor="#000"
          />
        </>
      )}

      {!user && !isHallManager && (
        <Text style={{ textAlign: 'center', marginVertical: 20, color: 'red' }}>
          Please login to post a review.
        </Text>
      )}

      <FlatList
        data={reviewList}
        keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        extraData={reviewList}
      />
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.service,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    marginRight: 6,
  },
  reviewInputContainer: {
    marginBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewer: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#222',
  },
  comment: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  replyContainer: {
    marginTop: 8,
    backgroundColor: '#e6e6e6',
    padding: 8,
    borderRadius: 6,
  },
  replyLabel: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 13,
    color: '#444',
  },
  replyText: {
    fontSize: 14,
    color: '#333',
  },
  replyInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
});
