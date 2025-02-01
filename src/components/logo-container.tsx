import {Link} from 'react-router-dom';

function LogoContainer() {
  return (
    <Link to={"/"}>
        <img src="/logo.svg" alt="" ></img>
    </Link>
  )
}

export default LogoContainer