import { useState, useEffect } from "react"
import Client from "../services/api"
import "../static/review.css"

const Review = ({ projectId }) => {
  const [userRole, setUserRole] = useState("")
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    Project: projectId,
    user: localStorage.getItem("userId"),
    comment: "",
    rating: 0,
  })

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role) {
      setUserRole(role)
    }

    if (role === "admin") {
      const fetchReviews = async () => {
        try {
          const response = await Client.get(
            `/projects/project/${projectId}/reviews`
          )
          if (response.data && Array.isArray(response.data.reviews)) {
            setReviews(response.data.reviews)
          } else {
            console.error("Error: Reviews data is not in expected format")
          }
        } catch (error) {
          console.error("Error fetching reviews:", error)
        }
      }
      fetchReviews()
    }
  }, [projectId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }))
  }

  const handleRating = (rating) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      rating,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Client.post(`/review/createReview`, {
        ...newReview,
        project: projectId,
      })
      setReviews([...reviews, response.data.review]) // Add new review to the list
      setNewReview({
        Project: projectId,
        user: localStorage.getItem("userId"),
        comment: "",
        rating: 0,
      }) // Reset form fields

      // Show success alert after submitting the form
      alert("Review submitted successfully!")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Error submitting review. Please try again.")
    }
  }

  const deleteReview = async (reviewId) => {
    try {
      const response = await Client.delete(`/review/reviews/${reviewId}`)
      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        )
        console.log("Review deleted successfully")
      }
    } catch (error) {
      console.error("Error deleting review:", error)
    }
  }
  if (userRole !== "admin") {
    return (
      <div className="review-section">
        <h3>Reviews</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment"
            placeholder="Write your review"
            value={newReview.comment}
            onChange={handleChange}
          ></textarea>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${newReview.rating >= star ? "selected" : ""}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>
    )
  }

  return (
    <div className="review-section">
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <div>
            <strong>{review.user.name}</strong>
            <button onClick={() => deleteReview(review._id)} className="trash">
              <i className="fa fa-trash"></i>
            </button>
          </div>

          <p>{review.comment}</p>
          <p className="rating">
            {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}{" "}
          </p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Review
