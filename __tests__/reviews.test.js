require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const User = require('../lib/models/User');

describe('review routes', () => {
  let agent;
  beforeAll(async() => {
    connect();
    
    agent = request.agent(app);

    await User
      .create({
        email: 'matt@munch.com',
        password: 'mattmunch'
      });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email:'matt@munch.com',
        password: 'mattmunch'
      });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  let review;
  beforeEach(async() => {
    review = await Review.create({
      movieTitle:'Cloudy with a chance of meatballs',
      rating: 3,
      comment:'Needed more meatballs'
    });
  });

  it('requires authorization to post', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        movieTitle:'Cloudy with a chance of meatballs',
        rating: 3,
        comment:'Needed more meatballs'
      })
      .then(res => {
        expect(res.statusCode).toEqual(500);
      });
  });

  it('creates a new review', async() => {
    return agent
      .post('/api/v1/reviews')
      .send({
        movieTitle:'Cloudy with a chance of meatballs',
        rating: 3,
        comment:'Needed more meatballs'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          movieTitle:'Cloudy with a chance of meatballs',
          rating: 3,
          comment: 'Needed more meatballs',
          __v:0
        });
      });
  });

  it('requires authorization to get', () => {
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.statusCode).toEqual(500);
      });
  });

  it('finds all entries', async() => {
    return agent
      .get('/api/v1/reviews')
      .then(() => {
        return agent
          .get('/api/v1/reviews')
          .then(res => {
            expect(res.body).toEqual([{
              _id: review.id.toString(),
              movieTitle:'Cloudy with a chance of meatballs',
              rating: 3,
              comment:'Needed more meatballs',
              __v: 0
            }]);
          });
      });
  });

  it('deletes an review by id', () => {
    return agent
      .delete(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: review.id.toString(),
          movieTitle:'Cloudy with a chance of meatballs',
          rating: 3,
          comment:'Needed more meatballs',
          __v: 0
        });
      });
  });
});
