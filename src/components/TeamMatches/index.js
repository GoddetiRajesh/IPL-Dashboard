import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const backgroundColors = {
  RCB: 'bg-rcb',
  KKR: 'bg-kkr',
  CSK: 'bg-csk',
  RR: 'bg-rr',
  KXP: 'bg-kxp',
  MI: 'bg-mi',
  SH: 'bg-sh',
  DC: 'bg-dc',
}

class TeamMatches extends Component {
  state = {
    teamBannerUrl: {},
    latestMatch: {},
    recentMatch: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getMatchesList()
  }

  getMatchesList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const bannerUrlData = data.team_banner_url
    const latestMatchData = data.latest_match_details
    const recentMatchData = data.recent_matches
    const updatedLatestMatchData = {
      umpires: latestMatchData.umpires,
      result: latestMatchData.result,
      manOfTheMatch: latestMatchData.man_of_the_match,
      id: latestMatchData.id,
      date: latestMatchData.date,
      venue: latestMatchData.venue,
      competingTeam: latestMatchData.competing_team,
      competingTeamLogo: latestMatchData.competing_team_logo,
      firstInnings: latestMatchData.first_innings,
      secondInnings: latestMatchData.second_innings,
      matchStatus: latestMatchData.match_status,
    }
    const updatedRecentMatchData = recentMatchData.map(eachItem => ({
      umpires: eachItem.umpires,
      result: eachItem.result,
      manOfTheMatch: eachItem.man_of_the_match,
      id: eachItem.id,
      date: eachItem.date,
      venue: eachItem.venue,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      firstInnings: eachItem.first_innings,
      secondInnings: eachItem.second_innings,
      matchStatus: eachItem.match_status,
    }))
    this.setState({
      teamBannerUrl: bannerUrlData,
      latestMatch: updatedLatestMatchData,
      recentMatch: updatedRecentMatchData,
      isLoading: false,
    })
  }

  render() {
    const {teamBannerUrl, latestMatch, recentMatch, isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bgClassName = backgroundColors[id]
    return (
      <div className={`team-match-container ${bgClassName}`}>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-container">
            <img
              className="players-team-image"
              src={teamBannerUrl}
              alt="team banner"
            />
            <p className="latest-match-description">Latest Matches</p>
            <LatestMatch latestMatch={latestMatch} />
            <ul className="recent-match-container">
              {recentMatch.map(eachItem => (
                <MatchCard key={eachItem.id} recentMatch={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
