import './index.css'

const MatchCard = props => {
  const {recentMatch} = props
  console.log(recentMatch)
  const {
    // umpires,
    result,
    // manOfTheMatch,
    // date,
    // venue,
    competingTeam,
    competingTeamLogo,
    // firstInnings,
    // secondInnings,
    matchStatus,
  } = recentMatch
  const statusColor = matchStatus === 'Lost' ? 'bg-red' : 'bg-green'
  return (
    <li className="recent-match-item-container">
      <img
        className="recent-match-image"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="recent-match-heading">{competingTeam}</p>
      <p className="recent-match-description">{result}</p>
      <p className={`recent-match-status ${statusColor}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
