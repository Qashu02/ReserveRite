import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput'; // custom input
import colors from '../config/colors';

const ReviewScreen = ({ route }) => {
  const { isHallManager } = route.params;

  const [reviewList, setReviewList] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [replyTexts, setReplyTexts] = useState({});
  const [isLoading, setIsLoading] = useState(true); // NEW

  // Load sample data once when component mounts
  useEffect(() => {
    const sampleData = [
      {
        id: '1',
        name: 'Alice',
        comment: 'Amazing place! The lighting was beautiful.',
        rating: 5,
        reply: 'Thank you, Alice! We’re glad you loved it!',
      },
      {
        id: '2',
        name: 'Bob',
        comment: 'Spacious hall, but AC wasn’t working well.',
        rating: 3,
        reply: '',
      },
      {
        id: '3',
        name: 'Catherine',
        comment: 'Perfect for weddings. The decor was on point.',
        rating: 4,
        reply: 'Thank you for the feedback, Catherine!',
      },
    ];

    setTimeout(() => {
      setReviewList(sampleData);
      setIsLoading(false); // Stop loading after data is set
    }, 100); // simulate slight delay
  }, []);

  const totalReviews = reviewList.length;
  const averageRating =
    totalReviews > 0
      ? (reviewList.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : 0;

  const handleAddReview = () => {
    if (reviewText.trim() === '' || rating === 0) return;

    const newReview = {
      id: Date.now().toString(),
      name: 'Guest',
      comment: reviewText,
      rating,
      reply: '',
    };

    setReviewList([newReview, ...reviewList]);
    setReviewText('');
    setRating(0);
  };

  const handleReply = (id) => {
    const replyText = replyTexts[id]?.trim();
    if (!replyText) return;

    const updated = reviewList.map((r) =>
      r.id === id ? { ...r, reply: replyText } : r
    );
    setReviewList(updated);
    setReplyTexts({ ...replyTexts, [id]: '' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewer}>{item.name}</Text>
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
            value={replyTexts[item.id] || ''}
            onChangeText={(text) =>
              setReplyTexts({ ...replyTexts, [item.id]: text })
            }
            style={styles.replyInput}
            placeholderTextColor="#777"
            iconPress="send"
            onIconPress={() => handleReply(item.id)}
          />
        )
      )}
    </View>
  );

  // Show loading spinner
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.service} />
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>
          Average Rating: {averageRating} / 5{' '}
          <Text style={styles.summaryText}>({totalReviews})</Text>
        </Text>
      </View>

      {!isHallManager && (
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
            placeholder="Write your reviews..."
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

      <FlatList
        data={reviewList}
        keyExtractor={(item) => item.id}
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
    marginTop: 24,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryRow: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  summaryText: {
    fontWeight: 'bold',
    fontSize: 14,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  reviewItem: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewer: {
    fontWeight: 'bold',
  },
  comment: {
    marginVertical: 4,
  },
  replyContainer: {
    backgroundColor: '#eee',
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
  },
  replyLabel: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  replyText: {
    fontSize: 14,
    color: '#444',
  },
  replyInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
