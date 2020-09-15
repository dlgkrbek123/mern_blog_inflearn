import React from 'react';
import { Row, Col } from 'reactstrap';

// col을 12개로 나눈다.
// 반응형은 최소단위 기준으로 적용됨

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Read Our Blog</h1>
          <p>하규의 사이드 프로젝트 작업블로그 입니다</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
