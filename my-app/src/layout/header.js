import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../userContext/userContext";
import { Menu, Button, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'



const Header =() => {
  let history = useHistory()
  const [user, setUser] = useContext(UserContext)

  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
    history.push("/")
  }
  // const [key, setKey] = useState(null)
  const menu = (
  <Menu>
  <Menu.Item>
    <Link to="/movies-editor">
      Movies Edit
    </Link>
  </Menu.Item>
  <Menu.Item>
    <Link to="/games-editor">
      Games Edit
    </Link>
  </Menu.Item>
  <Menu.Item>
    <Link to="/change-password">
      Change Password
    </Link>
  </Menu.Item>
  <Menu.Item danger onClick={handleLogout}>Log Out</Menu.Item>
</Menu>
  )


  return (    

    <nav className="menuBar">
      <div className="logo">
        <Link to="/">yourguide</Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
            {/* <Link to="/movie">Movie </Link>
            <Link to="/game">Game </Link> */}
        </div>
        <div className="rightMenu">
          {
            user === null && (
              <>
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
                <Button type="primary" style={{marginLeft: '16px'}}>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )
          }
          {
            user !== null && (
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {user.name} <DownOutlined />
                </a>
              </Dropdown>
            )
          }
        </div>
      </div>
    </nav>
    
  )
}

export default Header 
