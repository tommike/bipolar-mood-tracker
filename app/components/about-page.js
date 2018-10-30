import React from 'react';
import { Helmet } from 'react-helmet';
import { Breadcrumbs } from './breadcrumbs';

const AboutPage = () => (
  <article className="layout-grid page about">
    <Helmet>
      <title>About</title>
    </Helmet>
    <Breadcrumbs />
    <h1 className="page__title">About this application</h1>
    <div className="page__copy page__copy--default-txt">
      <h2 className="page__section-title">Description</h2>
      <p>This mood tracker can be used for tracking Bipolar 1 and 2, Depression and Anxiety.</p>

      <p>Tracking and noticing your triggers is just click away!</p>

      <h2 className="page__section-title">Features</h2>
      <p>This app lets you:</p>

      <ol>
        <li>
          Track your daily mood, sleep patterns, medications, self-care and diet related to Bipolar
          1 and 2 plus Depression and anxiety.
        </li>
        <li>View graphs and visualise your symptoms</li>
        <li>Add your own notes if necessary</li>
      </ol>

      <h2 className="page__section-title">This app features:</h2>
      <ol>
        <li>Five categories: mood, sleep, meds, self-care, diet</li>
        <li>
          Each category is divided into subcategories which help you define how you feel, sleep and
          other.
        </li>
        <li>
          Mood subcategories (Feelings, Energy and Thinking) are represented on a scale from -5 to
          +5; each scale number is shown in a different color on a graph view;
        </li>
        <li>
          In Sleep category you can track your bedtime and waketime; sleeping hours in total and you
          can also describe how was your sleep by simply clicking on a category that applies to you
        </li>
        <li>With Meds category you can track your medications, dosage and frequency</li>
        <li>
          Self-care category is important for tracking your physical activities, relaxation and
          meditation time, talk therapy or any other way of taking care of yourself.
        </li>
        <li>
          Diet category tracks your eating habits, your weight and your bad habits (smoking or
          alcohol intake)
        </li>
      </ol>
    </div>
  </article>
);

export default AboutPage;
