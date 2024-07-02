import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {team} = props
  const {name, id, teamImageUrl} = team
  return (
    <Link className="team-link" to={`/team-matches/${id}`}>
      <li className="team-item-container">
        <img className="team-image" src={teamImageUrl} alt={name} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
