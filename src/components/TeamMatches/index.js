import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
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
    data: [],
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

    let wonCount = 0
    let lostCount = 0
    let drawCount = 0
    if (updatedLatestMatchData.matchStatus === 'Won') {
      wonCount += 1
    } else if (updatedLatestMatchData.matchStatus === 'Lost') {
      lostCount += 1
    } else {
      drawCount += 1
    }

    for (let i = 0; i < updatedRecentMatchData.length; i += 1) {
      if (updatedRecentMatchData[i].matchStatus === 'Won') {
        wonCount += 1
      } else if (updatedRecentMatchData[i].matchStatus === 'Lost') {
        lostCount += 1
      } else {
        drawCount += 1
      }
    }

    this.setState({
      teamBannerUrl: bannerUrlData,
      latestMatch: updatedLatestMatchData,
      recentMatch: updatedRecentMatchData,
      isLoading: false,
      data: [
        {count: wonCount, result: 'Won'},
        {count: lostCount, result: 'Lost'},
        {count: drawCount, result: 'Drawn'},
      ],
    })
  }

  goToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {teamBannerUrl, latestMatch, recentMatch, isLoading} = this.state
    const {data} = this.state
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
            <h1 className="heading">Statistics</h1>
            <ResponsiveContainer width="80%" height={350}>
              <PieChart>
                <Pie
                  data={data}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="count"
                >
                  <Cell name="Won" fill="#0ceb29" />
                  <Cell name="Lost" fill="#eb2b05" />
                  <Cell name="Drawn" fill="#a44c9e" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
            <button
              onClick={this.goToHome}
              type="button"
              className="back-button"
            >
              Back
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
