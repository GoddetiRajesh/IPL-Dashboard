import './index.css'

const LatestMatch = props => {
  const {latestMatch} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    // matchStatus,
  } = latestMatch

  return (
    <div className="latest-match-container">
      <div className="match-details-container">
        <p className="match-details-heading">{competingTeam}</p>
        <p className="match-details-heading">{date}</p>
        <p className="match-details-description">{venue}</p>
        <p className="match-details-description">{result}</p>
      </div>
      <img
        className="match-details-image"
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
      />
      <div className="innings-details-container">
        <h1 className="innings-details-heading">First Innings</h1>
        <p className="innings-details-description">{firstInnings}</p>
        <h1 className="innings-details-heading">Second Innings</h1>
        <p className="innings-details-description">{secondInnings}</p>
        <h1 className="innings-details-heading">Man Of The Match</h1>
        <p className="innings-details-description">{manOfTheMatch}</p>
        <h1 className="innings-details-heading">Umpires</h1>
        <p className="innings-details-description">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
