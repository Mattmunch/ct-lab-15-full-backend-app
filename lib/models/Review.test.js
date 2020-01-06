const Review = require('./Review');

describe('Review Model', () => {
  it('requires a movie title', () => {
    const review = new Review({
      comment: 'bad stuff',
      rating: 3
    });
      
    const { errors } = review.validateSync();
    expect(errors.movieTitle.message).toEqual('Path `movieTitle` is required.');
  });
  it('requires a comment', () => {
    const review = new Review({
      movieTitle: 'bad stuff',
      rating: 3
    });
    const { errors } = review.validateSync();
    expect(errors.comment.message).toEqual('Path `comment` is required.');
  });
  it('requires a rating less than or equal to 5', () => {
    const review = new Review({
      comment: 'bad stuff',
      movieTitle:'good stuff',
      rating: 6
    });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });
  it('requires a rating greater than or equal to 1', () => {
    const review = new Review({
      comment: 'bad stuff',
      movieTitle:'good stuff',
      rating: 0
    });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
  });
})
;
