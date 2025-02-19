import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import cookies from './utils/cookies';
import Application from './Application';
import About from './routes/More/About';
import AbsenteeBallot from './routes/More/AbsenteeBallot';
import Activity from './routes/Activity';
import Attributions from './routes/More/Attributions';
import Ballot from './routes/Ballot/Ballot';
import BallotIndex from './routes/Ballot/BallotIndex';
import Candidate from './routes/Ballot/Candidate';
import ClaimYourPage from './routes/Settings/ClaimYourPage';
import Connect from './routes/Connect';
import Credits from './routes/More/Credits';
import Donate from './routes/More/Donate';
import DonateThankYou from './routes/More/DonateThankYou';
import ElectionReminder from './routes/More/ElectionReminder';
import Elections from './routes/More/Elections';
import EmailBallot from './routes/More/EmailBallot';
import FacebookSignInProcess from './routes/Process/FacebookSignInProcess';
import FAQ from './routes/More/FAQ';
import FacebookInvitableFriends from './routes/FacebookInvitableFriends';
import Friends from './routes/Friends';
import FriendsCurrent from './routes/Friends/FriendsCurrent';
import FriendInvitationsSentByMe from './routes/Friends/FriendInvitationsSentByMe';
import FriendInvitationsSentToMe from './routes/Friends/FriendInvitationsSentToMe';
import SuggestedFriends from './routes/Friends/SuggestedFriends';
import GetStarted from './routes/Intro/GetStarted';
import HamburgerMenu from './routes/Settings/HamburgerMenu';
import HowItWorks from './routes/HowItWorks';
import Intro from './routes/Intro/Intro';
import IntroNetwork from './routes/Intro/IntroNetwork';
import InviteByEmail from './routes/Friends/InviteByEmail';
import Location from './routes/Settings/Location';
import Measure from './routes/Ballot/Measure';
import Office from './routes/Ballot/Office';
import Opinions from './routes/Opinions';
import OpinionsFollowed from './routes/OpinionsFollowed';
import OpinionsIgnored from './routes/OpinionsIgnored';
import OrganizationVoterGuide from './routes/VoterGuide/OrganizationVoterGuide';
import OrganizationVoterGuideCandidate from './routes/VoterGuide/OrganizationVoterGuideCandidate';
import OrganizationVoterGuideEdit from './routes/VoterGuide/OrganizationVoterGuideEdit';
import OrganizationVoterGuideMeasure from './routes/VoterGuide/OrganizationVoterGuideMeasure';
import OrganizationVoterGuideOffice from './routes/VoterGuide/OrganizationVoterGuideOffice';
import PollingPlaceLocatorModal from './routes/Vote/PollingPlaceLocatorModal';
import Pricing from './routes/More/Pricing';
import Privacy from './routes/More/Privacy';
import ProcessingDonation from './routes/More/ProcessingDonation';
import RegisterToVote from './routes/More/RegisterToVote';
import SampleBallot from './routes/Intro/SampleBallot';
import ScratchPad from './routes/ScratchPad';
import SearchPage from './routes/More/SearchPage';
import SettingsDashboard from './routes/Settings/SettingsDashboard';
import SettingsMenuMobile from './routes/Settings/SettingsMenuMobile';
import SignInJumpProcess from './routes/Process/SignInJumpProcess';
import FacebookLandingProcess from './routes/Process/FacebookLandingProcess';
import FacebookRedirectToWeVote from './routes/More/FacebookRedirectToWeVote';
import SignInEmailProcess from './routes/Process/SignInEmailProcess';
import TermsOfService from './routes/More/TermsOfService';
import TwitterHandleLanding from './routes/TwitterHandleLanding';
import TwitterSignInProcess from './routes/Process/TwitterSignInProcess';
import Values from './routes/Values';
import ValuesList from './routes/Values/ValuesList';
import Vote from './routes/Vote';
import VerifyEmailProcess from './routes/Process/VerifyEmailProcess';
import FriendInvitationByEmailVerifyProcess from './routes/Process/FriendInvitationByEmailVerifyProcess';
import VoterGuideListDashboard from './routes/Settings/VoterGuideListDashboard';
import VoterGuideSettingsDashboard from './routes/Settings/VoterGuideSettingsDashboard';
import VoterGuideSettingsMenuMobile from './routes/Settings/VoterGuideSettingsMenuMobile';
import VoterGuidesMenuMobile from './routes/Settings/VoterGuidesMenuMobile';
import VoterGuidesUnderOneValue from './routes/Values/VoterGuidesUnderOneValue';
import VerifyRegistration from './routes/More/VerifyRegistration';
import VerifyThisIsMe from './routes/VoterGuide/VerifyThisIsMe';
import Welcome from './routes/WelcomeForVoters';
import WelcomeForCampaigns from './routes/WelcomeForCampaigns';
import WelcomeForOrganizations from './routes/WelcomeForOrganizations';
import WeVoteBallotEmbed from './routes/More/WeVoteBallotEmbed';
import YourPage from './routes/YourPage';
import { isWebApp } from './utils/cordovaUtils';

// See /js/components/Navigation/HeaderBar.jsx for show_full_navigation cookie
const ballotHasBeenVisited = cookies.getItem('ballot_has_been_visited');
const firstVisit = !cookies.getItem('voter_device_id');

const routes = () => (
  <Route path="/" component={Application}>
    <Route component={Intro} />
    {                       // 12/4/18: Not sure why we need the following disabled
      (function redir () {  // eslint-disable-line wrap-iife
        if (isWebApp()) {
          return ballotHasBeenVisited ? <IndexRedirect to="/ballot" /> : <IndexRedirect to="/welcome" />;
        } else {
          return firstVisit ? <IndexRedirect to="/wevoteintro/network" /> : <IndexRedirect to="/ballot" />;
        }
      }
      )()
    }
    <Route path="/welcome" component={props => <Welcome {...props} pathname="/welcome" />} />
    <Route path="/activity" component={Activity} />
    <Route path="/ballot" component={BallotIndex}>
      <IndexRoute component={Ballot} />
      <Route path="/ballot?wait_until_voter_sign_in_completes=:wait_until_voter_sign_in_completes" component={Ballot} />
      <Route path="/office/:office_we_vote_id/b/:back_to_variable/" component={Office} />
      <Route path="/office/:office_we_vote_id/:back_to_variable/:organization_we_vote_id" component={OrganizationVoterGuideOffice} />
      <Route path="/office/:office_we_vote_id/:organization_we_vote_id" component={OrganizationVoterGuideOffice} />
      <Route path="/office/:office_we_vote_id" component={Office} />
      <Route path="/candidate/:candidate_we_vote_id/b/:back_to_variable/" component={Candidate} />
      <Route path="/candidate/:candidate_we_vote_id/:back_to_variable/:organization_we_vote_id" component={OrganizationVoterGuideCandidate} />
      <Route path="/candidate/:candidate_we_vote_id/:organization_we_vote_id" component={OrganizationVoterGuideCandidate} />
      <Route path="/candidate/:candidate_we_vote_id" component={Candidate} />
      <Route path="/measure/:measure_we_vote_id/b/:back_to_variable/" component={Measure} />
      <Route path="/measure/:measure_we_vote_id/:back_to_variable/:organization_we_vote_id" component={OrganizationVoterGuideMeasure} />
      <Route path="/measure/:measure_we_vote_id" component={Measure} />
    </Route>
    <Route path="/ballot/vote" component={Vote} />
    <Route path="/ballot/:ballot_location_shortcut" component={Ballot} />
    <Route path="/ballot/id/:ballot_returned_we_vote_id" component={Ballot} />
    <Route path="/ballot/election/:google_civic_election_id" component={Ballot} />

    <Route path="/polling-place-locator" component={PollingPlaceLocatorModal} />
    <Route path="/for-campaigns" component={props => <WelcomeForCampaigns {...props} pathname="/for-campaigns" />} />
    <Route path="/for-organizations" component={props => <WelcomeForOrganizations {...props} pathname="/for-organizations" />} />
    <Route path="/how" component={HowItWorks} />
    <Route path="/how/:category_string" component={HowItWorks} />
    <Route path="/intro" component={Intro} />
    <Route path="/wevoteintro/network" component={IntroNetwork} />
    <Route path="/intro/sample_ballot" component={SampleBallot} />
    <Route path="/intro/get_started" component={GetStarted} />

    {/* Your Settings go in this structure... */}
    {/* Complete path on one line for searching */}
    <Route path="/settings" component={SettingsDashboard} />
    <Route path="/settings/claim" component={ClaimYourPage} />
    <Route path="/settings/hamburger" component={HamburgerMenu} />
    <Route path="/settings/location" component={Location} />
    <Route path="/settings/menu" component={SettingsMenuMobile} />
    <Route path="/settings/voterguidelist" component={VoterGuideListDashboard} />
    <Route path="/settings/voterguidesmenu" component={VoterGuidesMenuMobile} />
    {/* settings/:edit_mode includes "/settings/account", "/settings/address", "/settings/election",
     "/settings/issues_linked", "/settings/issues_to_link", "/settings/issues", "/settings/notifications",
     "/settings/profile", "/settings/tools" */}
    <Route path="/settings/:edit_mode" component={SettingsDashboard} />
    <Route path="/settings/issues/:edit_mode" component={SettingsDashboard} />
    <Route path="/settings/:edit_mode/:voter_guide_we_vote_id" component={SettingsDashboard} />

    {/* Ballot Off-shoot Pages */}
    <Route path="/opinions" component={Opinions} />
    <Route path="/opinions_followed" component={OpinionsFollowed} />
    <Route path="/opinions_ignored" component={OpinionsIgnored} />

    {/* Friend related Pages */}
    <Route path="/friends" component={Friends} />
    <Route path="/friends/add" component={Connect} />
    <Route path="/friends/current" component={FriendsCurrent} />
    <Route path="/friends/requests" component={FriendInvitationsSentToMe} />
    <Route path="/friends/invitationsbyme" component={FriendInvitationsSentByMe} />
    <Route path="/friends/suggested" component={SuggestedFriends} />
    <Route path="/friends/invitebyemail" component={InviteByEmail} />
    <Route path="/facebook_invitable_friends" component={FacebookInvitableFriends} />

    {/* More Menu Pages */}
    <Route path="/more/about" component={About} />
    <Route path="/more/absentee" component={AbsenteeBallot} />
    <Route path="/more/alerts" component={ElectionReminder} />
    <Route path="/more/attributions" component={Attributions} />
    <Route path="/more/connect" component={Connect} />
    <Route path="/more/credits" component={Credits} />
    <Route path="/more/donate" component={Donate} />
    <Route path="/more/donate_thank_you" component={DonateThankYou} />
    <Route path="/more/elections" component={Elections} />
    <Route path="/more/email_ballot" component={EmailBallot} />
    <Route path="/more/facebooklandingprocess" component={FacebookLandingProcess} />
    <Route path="/more/facebookredirecttowevote" component={FacebookRedirectToWeVote} />
    <Route path="/more/faq" component={FAQ} />
    <Route path="/more/jump" component={SignInJumpProcess} />
    <Route path="/more/myballot" component={WeVoteBallotEmbed} />
    <Route path="/more/network" component={Friends} />
    <Route path="/more/network/key/:invitation_secret_key" component={FriendInvitationByEmailVerifyProcess} />
    <Route path="/more/network/key/:invitation_secret_key/ignore" component={FriendInvitationByEmailVerifyProcess} />
    {/* Redirecting old URLs to new components */}
    <Route path="/more/network/friends" component={Friends} />
    <Route path="/more/network/organizations" component={Values} />
    <Route path="/more/pricing" component={Pricing} />
    <Route path="/more/pricing/:pricing_choice" component={Pricing} />
    <Route path="/more/privacy" component={Privacy} />
    <Route path="/more/processing_donation" component={ProcessingDonation} />
    <Route path="/more/register" component={RegisterToVote} />
    <Route path="/more/search_page" component={SearchPage} />
    <Route path="/more/search_page/:encoded_search_string" component={SearchPage} />
    <Route path="/more/terms" component={TermsOfService} />
    <Route path="/more/verify" component={VerifyRegistration} />
    <Route path="/values" component={Values} />
    <Route path="/values/list" component={ValuesList} />
    <Route path="/value/:value_slug" component={VoterGuidesUnderOneValue} />

    {/* Voter Guide Pages - By Organization */}
    <Route path="/voterguide/:organization_we_vote_id" component={props => <OrganizationVoterGuide {...props} active_route="ballot" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot" component={props => <OrganizationVoterGuide {...props} active_route="ballot" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/empty" component={props => <OrganizationVoterGuide {...props} active_route="ballot" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/:ballot_location_shortcut" component={props => <OrganizationVoterGuide {...props} active_route="ballot" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/id/:ballot_returned_we_vote_id" component={props => <OrganizationVoterGuide {...props} active_route="ballot" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/election/:google_civic_election_id" component={props => <OrganizationVoterGuide {...props} active_route="ballot" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/election/:google_civic_election_id/ballot" component={props => <OrganizationVoterGuide {...props} active_route="ballot" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/election/:google_civic_election_id/following" component={props => <OrganizationVoterGuide {...props} active_route="following" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/election/:google_civic_election_id/followers" component={props => <OrganizationVoterGuide {...props} active_route="followers" />} />
    <Route path="/voterguide/:organization_we_vote_id/ballot/election/:google_civic_election_id/positions" component={props => <OrganizationVoterGuide {...props} active_route="positions" />} />
    <Route path="/voterguide/:organization_we_vote_id/followers" component={props => <OrganizationVoterGuide {...props} active_route="followers" />} />
    <Route path="/voterguide/:organization_we_vote_id/following" component={props => <OrganizationVoterGuide {...props} active_route="following" />} />
    <Route path="/voterguide/:organization_we_vote_id/positions" component={props => <OrganizationVoterGuide {...props} active_route="positions" />} />
    <Route path="/voterguide/:organization_we_vote_id/:action_variable" component={OrganizationVoterGuide} />
    <Route path="/voterguideedit/:organization_we_vote_id" component={OrganizationVoterGuideEdit} />
    <Route path="/voterguideedit/:organization_we_vote_id/:google_civic_election_id" component={OrganizationVoterGuideEdit} />

    {/* Voter Guide Settings go in this structure... "/vg/wvYYvgYY/settings/positions", "/vg/wvYYvgYY/settings/addpositions" */}
    <Route path="/vg/:voter_guide_we_vote_id/settings" component={VoterGuideSettingsDashboard} />
    <Route path="/vg/:voter_guide_we_vote_id/settings/menu" component={VoterGuideSettingsMenuMobile} />
    <Route path="/vg/:voter_guide_we_vote_id/settings/:edit_mode" component={VoterGuideSettingsDashboard} />

    <Route path="/yourpage" component={YourPage} />

    <Route path="/facebook_sign_in" component={FacebookSignInProcess} />

    <Route path="/twitter_sign_in" component={TwitterSignInProcess} />

    <Route path="/verify_email/:email_secret_key" component={VerifyEmailProcess} />
    <Route path="/sign_in_email/:email_secret_key" component={SignInEmailProcess} />

    {/* Confirming that person owns twitter handle */}
    <Route path="/verifythisisme/:twitter_handle" component={VerifyThisIsMe} />
    <Route path="/twittersigninprocess/:sign_in_step" component={TwitterSignInProcess} />

    {/* Temporary scratchpad for component testing */}
    <Route path="/testing/scratchpad" component={ScratchPad} />

    <Route path=":twitter_handle/ballot/empty" component={TwitterHandleLanding} />
    <Route path=":twitter_handle/ballot/:ballot_location_shortcut" component={TwitterHandleLanding} />
    <Route path=":twitter_handle/ballot/id/:ballot_returned_we_vote_id" component={TwitterHandleLanding} />
    <Route path=":twitter_handle/ballot/id/:ballot_returned_we_vote_id/:view_mode" component={TwitterHandleLanding} />
    <Route path=":twitter_handle/ballot/election/:google_civic_election_id" component={TwitterHandleLanding} />
    <Route path=":twitter_handle/ballot/election/:google_civic_election_id/:view_mode" component={TwitterHandleLanding} />
    {/* view_mode not taken in yet */}

    {/* Any route that is not found -> @return TwitterHandleLanding component */}
    <Route path=":twitter_handle" component={TwitterHandleLanding} />
    <Route path=":twitter_handle/followers" component={props => <TwitterHandleLanding {...props} active_route="followers" />} />
    <Route path=":twitter_handle/following" component={props => <TwitterHandleLanding {...props} active_route="following" />} />
    <Route path=":twitter_handle/positions" component={props => <TwitterHandleLanding {...props} active_route="positions" />} />
    <Route path=":twitter_handle/:action_variable" component={TwitterHandleLanding} />

  </Route>
);

export default routes;
