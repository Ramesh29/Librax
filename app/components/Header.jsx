import Link from 'next/link'
const Header = () => {
  return (
        <div className="jumbotron jumbotron-fluid my-5">
        <Link href="/dashboard" style={{textDecoration:'none'}}>
          <div className="container-md">
              <h1 className="display-6">LibraX - Online library Manager</h1>
              <p className="lead">Managing libray transaction made Simple!!!</p>
              <hr className="my-4"></hr>
          </div>
        </Link>
        </div>
  )
}

export default Header