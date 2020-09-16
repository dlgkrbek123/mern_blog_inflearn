import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/Spinner';
import { POST_LOADING_REQUEST } from '../../redux/types';
import PostCardOne from '../../components/Post/PostCardOne';

const PostCardResult = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
    });
  }, []);

  return (
    <>
      <Helmet title="Home"></Helmet>
      <Row>{!loading ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
    </>
  );
};

export default PostCardResult;
