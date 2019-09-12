import {__} from '@wordpress/i18n';
import {Fragment} from 'react';
import {Spinner} from '@wordpress/components';
import {DashboardConsumer} from '../containers/DashboardContext';
import {
  ToggleSwitch,
  InputRow,
  DashboardButton,
  RowContainer,
} from '../components';
import {
  MediaElement,
  TextElement,
} from '../../../elements';

const GeneralOptionsConsumer = (props) => {
  const {
    dataLoaded,
    useCustomStyle,
    handleUseCustomChange,
    removeAdminBar,
    lightTheme,
    handleOnSave,
    logo: {
      id,
      title,
      url,
    },
    handleOnSelectMedia,
    copyright,
    facebook,
    twitter,
    linkedIn,
    instagram,
    showGithub,
    handleCopyrightChange,
    handleFacebookChange,
    handleTwitterChange,
    handleLinkedInChange,
    handleInstagramChange,
    handleShowGithubChange,
    handleLightThemeChange,
    handleURemoveAdminBarChange,
    handleOnRemoveMedia,
  } = props;

  const useCustomElement = (
    <InputRow
      className="options__row options__row--toggle"
    >
      <ToggleSwitch
        labelClass="options__label"
        idName="custom-styles"
        label={__('Use custom styles', 'quizess')}
        checked={useCustomStyle}
        onChange={handleUseCustomChange}
        helperMessage={__('Replace theme styles on quiz posts.', 'quizess')}
      />
    </InputRow>
  );
  const lightThemeElement = (
    <InputRow
      className="options__row options__row--toggle"
    >
      <ToggleSwitch
        labelClass="options__label"
        idName="remove-admin-bar"
        label={__('Default theme', 'quizess')}
        checked={lightTheme}
        onChange={handleLightThemeChange}
        helperMessage={__('Set light instead of dark as default theme to all quizess', 'quizess')}
      />
    </InputRow>
  );
  const removeAdminBarElement = (
    <InputRow
      className="options__row options__row--toggle"
    >
      <ToggleSwitch
        labelClass="options__label"
        idName="remove-admin-bar"
        label={__('Remove admin bar', 'quizess')}
        checked={removeAdminBar}
        onChange={handleURemoveAdminBarChange}
        helperMessage={__('Remove default admin bar and add optional quiz submit message ', 'quizess')}
      />
    </InputRow>
  );

  const showGithubElement = (
    <InputRow
      className="options__row options__row--toggle"
    >
      <ToggleSwitch
        labelClass="options__label"
        idName="show-github"
        label={__('Show github', 'quizess')}
        checked={showGithub}
        onChange={handleShowGithubChange}
        helperMessage={__('Add github social icon to the footer linked to the quizess resository', 'quizess')}
      />
    </InputRow>
  );

  const saveButtonElement = (
    <RowContainer>
      <DashboardButton
        onClick={handleOnSave}
        size="big"
      >
        {__('Save', 'quizess')}
      </DashboardButton>
    </RowContainer>
  );

  const logoElement = (
    <InputRow
      className="options__row"
    >
      <div
        className="options__label"
      >
        {__('Logo', 'quizess')}
        <span className="options__label-helper">
          {__('Logo shown in the footer and menu', 'quizess')}
        </span>
      </div>
      <div
        className="options__logo-wrap"
      >
        <MediaElement
          className="options__logo-element"
          mediaTitle={title}
          toolbarOnTop={false}
          tagName="div"
          mediaId={id}
          mediaUrl={url}
          onSelectMedia={handleOnSelectMedia}
          onRemoveMedia={handleOnRemoveMedia}
        />
      </div>
    </InputRow>
  );

  /* eslint-disable */
    const footerCopyrightElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Copyright', 'quizess')}
          <span className="options__label-helper">
          {__('Message show in the footer', 'quizess')}
        </span>
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={copyright}
              onChange={(text) => handleCopyrightChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                quickbars_selection_toolbar:false,
                quickbars_insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const facebookElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Facebook', 'quizess')}
          <span className="options__label-helper">
          {__('Social footer item', 'quizess')}
          </span>
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={facebook}
              onChange={(text) => handleFacebookChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                quickbars_selection_toolbar:false,
                quickbars_insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const twitterElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Twitter', 'quizess')}
          <span className="options__label-helper">
          {__('Social footer item', 'quizess')}
          </span>
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={twitter}
              onChange={(text) => handleTwitterChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                quickbars_selection_toolbar:false,
                quickbars_insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const linkedInElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('LinkedIn', 'quizess')}
          <span className="options__label-helper">
          {__('Social footer item', 'quizess')}
          </span>
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={linkedIn}
              onChange={(text) => handleLinkedInChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                quickbars_selection_toolbar:false,
                quickbars_insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const instagramElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Instagram', 'quizess')}
          <span className="options__label-helper">
          {__('Social footer item', 'quizess')}
          </span>
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={instagram}
              onChange={(text) => handleInstagramChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                quickbars_selection_toolbar:false,
                quickbars_insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
  /* eslint-enable */

  const optionsElements = (
    <Fragment>
      <div
        className="options__general--top"
      >
        {logoElement}
        {lightThemeElement}
        {removeAdminBarElement}
        {useCustomElement}
        {showGithubElement}
        {footerCopyrightElement}
        {facebookElement}
        {twitterElement}
        {linkedInElement}
        {instagramElement}
      </div>
      <div
        className="options__general--bottom"
      >
        {saveButtonElement}
      </div>
    </Fragment>
  );

  return (
    <div
      className="options"
    >
      {(!dataLoaded) ? <Spinner /> : optionsElements}
    </div>
  );
};

const GeneralOptions = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          dataLoaded,
          useCustomStyle,
          showGithub,
          logo,
          copyright,
          facebook,
          twitter,
          linkedIn,
          instagram,
          removeAdminBar,
          lightTheme,
        },
        dataStore: {
          handleUseCustomChange,
          handleOnSave,
          handleOnSelectMedia,
          handleCopyrightChange,
          handleFacebookChange,
          handleTwitterChange,
          handleLinkedInChange,
          handleInstagramChange,
          handleShowGithubChange,
          handleLightThemeChange,
          handleURemoveAdminBarChange,
          handleOnRemoveMedia,
        },
      } = value;
      return (
        <GeneralOptionsConsumer
          dataLoaded={dataLoaded}
          logo={logo}
          facebook={facebook}
          twitter={twitter}
          linkedIn={linkedIn}
          instagram={instagram}
          copyright={copyright}
          useCustomStyle={useCustomStyle}
          lightTheme={lightTheme}
          removeAdminBar={removeAdminBar}
          showGithub={showGithub}
          handleUseCustomChange={handleUseCustomChange}
          handleLightThemeChange={handleLightThemeChange}
          handleURemoveAdminBarChange={handleURemoveAdminBarChange}
          handleOnSave={handleOnSave}
          handleOnSelectMedia={handleOnSelectMedia}
          handleCopyrightChange={handleCopyrightChange}
          handleFacebookChange={handleFacebookChange}
          handleTwitterChange={handleTwitterChange}
          handleLinkedInChange={handleLinkedInChange}
          handleInstagramChange={handleInstagramChange}
          handleShowGithubChange={handleShowGithubChange}
          handleOnRemoveMedia={handleOnRemoveMedia}
        />
      );
    }}
  </DashboardConsumer>
);

export default GeneralOptions;
