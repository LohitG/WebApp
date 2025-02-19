import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import SettingsAccountLevelChip from './SettingsAccountLevelChip';
import FacebookStore from '../../stores/FacebookStore';
import { cordovaDot } from '../../utils/cordovaUtils';
import LoadingWheel from '../LoadingWheel';
import PremiumableButton from '../Widgets/PremiumableButton';
import { ImageDescription, PreviewImage, DescriptionText, SharingRow, SharingColumn, GiantTextInput, HiddenInput, Actions } from './SettingsStyled';
import OrganizationStore from '../../stores/OrganizationStore';
import { renderLog } from '../../utils/logging';
import AppActions from '../../actions/AppActions';
import VoterStore from '../../stores/VoterStore';

class SettingsSharing extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      organization: {},
      organizationWeVoteId: '',
      voter: {},
      hideLogo: false,
      voterHasFreeAccount: true,
      voterHasProfessionalAccount: false,
      voterHasEnterpriseAccount: false,
      siteDescription: '',
      uploadImageType: 'headerLogo',
      headerLogoImageSource: null,
      faviconImageSource: null,
      shareImageSource: null,
    };
  }

  componentDidMount () {
    // console.log("SettingsSharing componentDidMount");
    this.onVoterStoreChange();
    this.organizationStoreListener = FacebookStore.addListener(this.onOrganizationStoreChange.bind(this));
    this.voterStoreListener = VoterStore.addListener(this.onVoterStoreChange.bind(this));
  }

  shouldComponentUpdate (nextProps, prevState) {
    if (this.state.organizationWeVoteId !== prevState.organizationWeVoteId) {
      // console.log('this.state.organizationWeVoteId', this.state.organizationWeVoteId, ', prevState.organizationWeVoteId', prevState.organizationWeVoteId);
      return true;
    }
    if (this.state.voterIsSignedIn !== prevState.voterIsSignedIn) {
      // console.log('this.state.voterIsSignedIn', this.state.voterIsSignedIn, ', prevState.voterIsSignedIn', prevState.voterIsSignedIn);
      return true;
    }

    if (this.state.hideLogo !== prevState.hideLogo) {
      return true;
    }

    if (this.state.siteDescription !== prevState.siteDescription) {
      return true;
    }

    if (this.state.headerLogoImageSource !== prevState.headerLogoImageSource) {
      return true;
    }

    const priorOrganization = this.state.organization;
    const nextOrganization = prevState.organization;

    const priorWeVoteCustomDomain = priorOrganization.we_vote_custom_domain || '';
    const nextWeVoteCustomDomain = nextOrganization.we_vote_custom_domain || '';

    if (priorWeVoteCustomDomain !== nextWeVoteCustomDomain) {
      // console.log('priorWeVoteCustomDomain', priorWeVoteCustomDomain, ', nextWeVoteCustomDomain', nextWeVoteCustomDomain);
      return true;
    }
    // console.log('shouldComponentUpdate false');
    return false;
  }

  componentWillUnmount () {
    this.organizationStoreListener.remove();
    this.voterStoreListener.remove();
  }

  onOrganizationStoreChange = () => {
    const { organizationWeVoteId } = this.state;
    this.setState({
      organization: OrganizationStore.getOrganizationByWeVoteId(organizationWeVoteId),
    });
  }

  onVoterStoreChange = () => {
    const voter = VoterStore.getVoter();
    const voterIsSignedIn = voter.is_signed_in;
    const organizationWeVoteId = voter.linked_organization_we_vote_id;
    this.setState({
      organization: OrganizationStore.getOrganizationByWeVoteId(organizationWeVoteId),
      organizationWeVoteId,
      voter,
      voterIsSignedIn,
    });
  }

  handleToggleHideLogo = () => {
    const { hideLogo } = this.state;
    console.log('hidelogo', hideLogo);
    this.setState({ hideLogo: !hideLogo });
  }

  handleChangeDescription = ({ target }) => this.setState({ siteDescription: target.value });

  handleAddImage = () => {
    const { uploadImageType } = this.state;
    const file = this.fileSelector.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      if (uploadImageType === 'headerLogo') {
        this.setState({ headerLogoImageSource: fileReader.result });
      }
      if (uploadImageType === 'favicon') {
        this.setState({ faviconImageSource: fileReader.result });
      }
      if (uploadImageType === 'shareImage') {
        this.setState({ shareImageSource: fileReader.result });
      }
    });
    fileReader.readAsDataURL(file);
  }

  handleUploadHeaderLogo = () => {
    this.fileSelector.click();
    this.setState({ uploadImageType: 'headerLogo' });
  }

  handleUploadFavicon = () => {
    this.fileSelector.click();
    this.setState({ uploadImageType: 'favicon' });
  }

  handleUploadShareImage = () => {
    this.fileSelector.click();
    this.setState({ uploadImageType: 'shareImage' });
  }

  openPaidAccountUpgradeModal (paidAccountUpgradeMode) {
    // console.log('SettingsDomain openPaidAccountUpgradeModal');
    AppActions.setShowPaidAccountUpgradeModal(paidAccountUpgradeMode);
  }

  render () {
    renderLog(__filename);
    const { classes } = this.props;
    const {
      organization,
      organizationWeVoteId,
      voter,
      voterIsSignedIn,
      hideLogo,
      voterHasFreeAccount,
      voterHasProfessionalAccount, // eslint-disable-line
      voterHasEnterpriseAccount, // eslint-disable-line
      headerLogoImageSource,
      faviconImageSource,
      shareImageSource,
    } = this.state;
    if (!voter || !organizationWeVoteId) {
      return LoadingWheel;
    }

    if (voterIsSignedIn) {
      // console.log('SettingsSharing, Signed In.');
    }
    if (organization && organization.we_vote_custom_domain) {
      // console.log('SettingsSharing, Custom Domain: ', organization.we_vote_custom_domain);
    }
    return (
      <Wrapper>
        <Helmet title="Domain Settings" />
        <Card className="card">
          <CardMain className="card-main">
            <Title>Sharing Information</Title>
            <SharingRow>
              <SharingColumn>
                <SubTitle>Hide We Vote Logo</SubTitle>
                <DescriptionText>Remove the We Vote logo from the header bar.</DescriptionText>
              </SharingColumn>
              <SharingColumn alignRight>
                <Switch
                  color="primary"
                  checked={hideLogo}
                  onChange={this.handleToggleHideLogo}
                  value="hideLogo"
                  inputProps={{ 'aria-label': 'Hide logo switch' }}
                />
              </SharingColumn>
            </SharingRow>
            <SharingRow>
              <SharingColumn>
                <SubTitle>Upload Your Own Logo</SubTitle>
                <ImageDescription>
                  <PreviewImage alt="We Vote logo" width="125px" src={headerLogoImageSource || cordovaDot('/img/global/svg-icons/we-vote-logo-horizontal-color-dark-141x46.svg')}  />
                  <DescriptionText>Place your logo in the header bar. Image must be 125x30.</DescriptionText>
                </ImageDescription>
              </SharingColumn>
              <SharingColumn alignRight>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleUploadHeaderLogo}
                >
                  Upload
                </Button>
              </SharingColumn>
            </SharingRow>
            <SharingRow>
              <SharingColumn>
                <SubTitle>
                  Upload Favicon
                  <SettingsAccountLevelChip userAccountLevel={voterHasFreeAccount ? 'free' : 'pro'} featureAccountLevel="pro" />
                </SubTitle>
                <ImageDescription>
                  <PreviewImage alt="We Vote logo" width="48px" src={faviconImageSource || cordovaDot('/img/global/svg-icons/we-vote-icon-square-color-dark.svg')}  />
                  <DescriptionText>The icon for your site in the browser&apos;s tab. PNG files only. Optimal size is 16x16.</DescriptionText>
                </ImageDescription>
              </SharingColumn>
              <SharingColumn alignRight>
                <PremiumableButton
                  premium={!voterHasFreeAccount ? 1 : 0}
                  onClick={!voterHasFreeAccount ? this.handleUploadFavicon : () => this.openPaidAccountUpgradeModal('professional')}
                >
                  {voterHasFreeAccount ? 'Upgrade to Professional' : 'Upload'}
                </PremiumableButton>
              </SharingColumn>
            </SharingRow>
            <SharingRow>
              <SharingColumn>
                <SubTitle>
                  Social Share Image
                  <SettingsAccountLevelChip userAccountLevel={voterHasFreeAccount ? 'free' : 'pro'} featureAccountLevel="pro" />
                </SubTitle>
                <ImageDescription>
                  <PreviewImage alt="We Vote logo" width="96px" src={shareImageSource || cordovaDot('/img/global/svg-icons/we-vote-icon-square-color-dark.svg')}  />
                  <DescriptionText>The icon used when your page is shared on social media. Size must be at least 200x200.</DescriptionText>
                </ImageDescription>
              </SharingColumn>
              <SharingColumn alignRight>
                <PremiumableButton
                  premium={!voterHasFreeAccount ? 1 : 0}
                  onClick={!voterHasFreeAccount ? this.handleUploadShareImage : () => this.openPaidAccountUpgradeModal('professional')}
                >
                  {voterHasFreeAccount ? 'Upgrade to Professional' : 'Upload'}
                </PremiumableButton>
              </SharingColumn>
            </SharingRow>
            <SharingRow>
              <SharingColumn>
                <SubTitle>
                  Social Share Site Description
                  <SettingsAccountLevelChip userAccountLevel={voterHasFreeAccount ? 'free' : 'pro'} featureAccountLevel="pro" />
                </SubTitle>
                <DescriptionText>A few sentences describing your site. The text used on search engines, or when your page is shared on social media.</DescriptionText>
                <GiantTextInput placeholder="Type Description..." onChange={this.handleChangeDescription} />
                <Actions>
                  <Button
                    color="primary"
                    classes={{ root: classes.button }}
                  >
                    Cancel
                  </Button>
                  <PremiumableButton
                    premium={!voterHasFreeAccount ? 1 : 0}
                    onClick={!voterHasFreeAccount ? this.handleSaveDescription : () => this.openPaidAccountUpgradeModal('professional')}
                  >
                    {voterHasFreeAccount ? 'Upgrade to Professional' : 'Upload'}
                  </PremiumableButton>
                </Actions>
              </SharingColumn>
            </SharingRow>
          </CardMain>
        </Card>
        <HiddenInput type="file" accept="image/x-png,image/jpeg" onChange={this.handleAddImage} ref={(input) => { this.fileSelector = input; }} />
      </Wrapper>
    );
  }
}

const styles = ({
  button: {
    marginRight: 8,
  },
});

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const Card = styled.div`
`;

const CardMain = styled.div`
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 1em;
`;

const SubTitle = styled.h4`
  font-weight: bold;
  margin-top: .5em;
`;

export default withStyles(styles)(SettingsSharing);

