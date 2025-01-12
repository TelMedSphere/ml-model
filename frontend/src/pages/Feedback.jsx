import React, { useState } from 'react';
import useDocTitle from '../hooks/useDocTitle';
import Rating from 'react-rating-stars-component';
import '../styles/pages/_feedback.scss';

const Feedback = () => {
  useDocTitle('Feedback - TelMedSphere');
  const [formData, setFormData] = useState({
    type: '',
    rating: 0,
    comments: '',
    file: null
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('type', formData.type);
    formDataToSend.append('rating', formData.rating);
    formDataToSend.append('comments', formData.comments);
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }

    // Simulate a successful submission with a timeout
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ type: '', rating: 0, comments: '', file: null });
      setIsModalOpen(true); // Show modal on success
    }, 1000);
  };

  const ratingChanged = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  return (
    <section className="feedback-section">
      <div className="container feedback-container">
        <div className="feedback-image">
        <h1>Feedback</h1>
        <h2>Your feedback matters to us, Help us improve our services!</h2>
          <img src="https://i.pinimg.com/736x/c2/e0/e7/c2e0e7e0e70096264106e50212e857fa.jpg" alt="Feedback" />
        </div>
        <div className="feedback-form-container">
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="type">Type of Feedback</label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Select...</option>
                <option value="Services">Services</option>
                <option value="Models">Models</option>
                <option value="Products">Products</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <Rating
                count={5}
                value={formData.rating}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                rows="4"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Upload File</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              />
            </div>
            <button type="submit">
              Submit Feedback
            </button>
            {submitStatus === 'error' && (
              <div className="mt-4 text-red-600">Failed to submit feedback. Please try again.</div>
            )}
          </form>
        </div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Feedback Submitted</h2>
              <p>Your feedback has been successfully submitted. Thank you!</p>
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feedback;