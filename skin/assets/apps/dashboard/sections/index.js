import {Fragment} from 'react';
import classnames from 'classnames';
import {__} from '@wordpress/i18n';
import {DashboardConsumer} from '../containers/DashboardContext';
import GeneralOptions from './GeneralOptions';
import QuizOptions from './QuizOptions';

const MainConsumer = (props) => {
  const {
    optionsPage,
    handleOptionsMenu,
  } = props;

  const {id: menuId, title: optionsTitle} = optionsPage;

  const pageTitle = [
    __('Settings', 'quizess'),
    __('Quizes', 'quizess'),
  ];

  const pageTitleElement = pageTitle.map((title, index) => {
    const itemClasses = classnames(
      'dashboard__menu-button',
      {
        active: (menuId === index) || false,
      }
    );

    return (
      <li
        key={index}
        className="dashboard__menu-item"
      >
        <button
          className={itemClasses}
          onClick={() => {
            handleOptionsMenu(index, title);
          }}
        >
          {title}
        </button>
      </li>
    );
  });

  const getOptionsPage = () => {
    switch (optionsTitle) {
      case 'Settings':
        return <GeneralOptions />;
      case 'Quizes':
        return <QuizOptions />;

      default:
        break;
    }
  };

  return (
    <Fragment>
      <h1 className="dashboard__title">
        {__('Dashboard', 'quizess')}
      </h1>
      <div className="dashboard__options">
        <ul className="dashboard__menu">
          {pageTitleElement}
        </ul>
        <div className="dashboard__page">
          {getOptionsPage()}
        </div>
      </div>
    </Fragment>
  );
};

const Dashboard = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          optionsPage,
        },
        dataStore: {
          handleOptionsMenu,
        },
      } = value;
      return (
        <MainConsumer
          optionsPage={optionsPage}
          handleOptionsMenu={handleOptionsMenu}
        />
      );
    }}
  </DashboardConsumer>
);

export default Dashboard;
