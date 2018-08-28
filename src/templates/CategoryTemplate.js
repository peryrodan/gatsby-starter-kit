import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import TagIcon from 'react-feather/dist/icons/tag';
import CalendarIcon from 'react-feather/dist/icons/calendar';

import 'prismjs/themes/prism-okaidia.css';
import '@react-website-themes/diary/styles/variables';
import '@react-website-themes/diary/styles/global';

import Article from '@react-website-themes/diary/components/Article';
import Footer from '@react-website-themes/diary/components/Footer';
import Header from '@react-website-themes/diary/components/Header';
import Heading from '@react-website-themes/diary/components/Heading';
import Layout from '@react-website-themes/diary/components/Layout';
import List from '@react-website-themes/diary/components/List';
import Menu from '@react-website-themes/diary/components/Menu';
import Seo from '@react-website-themes/diary/components/Seo';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';

const PageTemplate = props => {
  const {
    pageContext: { category },
    data: {
      posts: { totalCount, edges },
      footerLinks: { html: footerLinksHTML },
      copyright: { html: copyrightHTML },
    },
  } = props;

  const items = edges.map(edge => edge.node);

  const {
    siteUrl,
    siteDescription,
    siteLanguage,
    siteTitlePostfix,
    timeOffset,
  } = config;

  return (
    <Layout>
      <Header>
        <Menu items={menuItems} />
      </Header>
      <Article>
        <Heading>
          <span>
            Posts in category <TagIcon />
          </span>
          <h1>{category}</h1>
          <p className="meta">
            There {totalCount > 1 ? 'are' : 'is'} <strong>{totalCount}</strong>{' '}
            post
            {totalCount > 1 ? 's' : ''} in the category.
          </p>
        </Heading>
        <List items={items} icon={CalendarIcon} timeOffset={timeOffset} />
      </Article>
      <Footer links={footerLinksHTML} copyright={copyrightHTML} />
      <Seo
        url={`${siteUrl}/categories/${category}/`}
        language={siteLanguage}
        title={`Posts in category: ${category}${siteTitlePostfix}`}
        description={siteDescription}
      />
    </Layout>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query CategoryTemplateQuery($category: String!) {
    posts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            prefix
          }
          excerpt
          timeToRead
          frontmatter {
            title
            categories
          }
        }
      }
    }
    footerLinks: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/footerLinks/" }
    ) {
      html
    }
    copyright: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/copyright/" }
    ) {
      html
    }
  }
`;