import React from 'react';
import AppNavBar from '../components/AppNavbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import PostCardResult from './normalRoute/PostCardResult';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import Search from './normalRoute/Search';
import CategoryResult from './normalRoute/CategoryResult';

const MyRouter = () => {
  return (
    <>
      <AppNavBar />
      <Header />
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={PostCardResult} />
          <Route path="/post" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route
            path="/post/category/:categoryName"
            exact
            component={CategoryResult}
          />
          <Route path="/search/:searchTerm" exact component={Search} />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </>
  );
};

export default MyRouter;
