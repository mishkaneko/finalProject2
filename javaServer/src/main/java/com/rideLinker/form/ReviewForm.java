package com.rideLinker.form;

import java.util.Objects;

public class ReviewForm {
    private int score;
    private String comment;

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewForm that = (ReviewForm) o;
        return score == that.score && Objects.equals(comment, that.comment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(score, comment);
    }

    public ReviewForm makeReview(){
        var review = new ReviewForm();
        review.setScore(this.score);
        review.setComment(this.comment);
        return review;
    }
}
