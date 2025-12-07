import {useState, useEffect} from 'react'
import { Trash2, SquarePen, User} from "lucide-react"

import './App.css'

const Table = ({Users, setUsers}) => {
  const userStructure = ["Id", "Username", "Firstname", "Lastname", "Password", "Actions"]

  const deleteUser = (id) => {
    const newUsers = Users.filter(user => user.id !== id)
    setUsers(newUsers)
  }
  const handelSubmit = (e, id) => {
    e.preventDefault()
    toggleDialogUpdate("close", id)
    const form_data = new FormData(e.target)
    console.log(id)
    const username = form_data.get("username")
    const firstname = form_data.get("firstname")
    const lastname = form_data.get("lastname")
    const password = form_data.get("password")
    setUsers(Users.map(user => {
      if (user.id === id) {
        user.username = username
        user.firstname = firstname
        user.lastname = lastname
        user.password = password
      }
      return user
    }))
    e.target.reset()
  }

  const toggleDialogUpdate = (action, id) => {
    const element = document.getElementById("content_dialogUpdate" + id)
    if (action === "open"){
      element.classList.remove("hidden")
      element.classList.add("flex")
    } else {
      element.classList.remove("flex")
      element.classList.add("hidden")
    }
  }
  return (
    <div className="overflow-x-auto w-full max-w-3xl rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
        <tr>
          {userStructure.map((struct) => (
            <th key={struct}>{struct}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {Users.map(user => {
            return (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.password}</td>
                <td className={"grid grid-cols-2 gap-2 min-w-32"}>
                  <button className={"btn btn-primary btn-sm flex"}>
                    <Trash2 className={"h-8"} onClick={()=> deleteUser(user.id)} />
                  </button>
                  <button onClick={() => toggleDialogUpdate("open", user.id)} className={"btn btn-primary btn-sm flex"}>
                    <SquarePen className={"h-8"} />
                  </button>
                  <div id={"content_dialogUpdate" + user.id} className={"hidden justify-center z-10 items-center fixed bottom-0 top-0 right-0 left-0 bg-black/70 p-2 rounded-lg"}>
                    <div className={"card relative w-96 bg-base-100 shadow-sm"}>
                      <div className="card-body">
                        <h3 className="font-bold text-lg mb-4">Modifier Un Utilisateur</h3>
                        <form onSubmit={(e) => handelSubmit(e, user.id)} className={"grid sm:grid-cols-2 gap-4"}>
                          <div className={"flex flex-col items-start gap-2"}>
                            <label htmlFor="username">Username</label>
                            <label className="input validator">
                              <User />
                              <input
                                defaultValue={user.username}
                                type="text"
                                required
                                name="username"
                                placeholder="Username"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                              />
                            </label>
                          </div>
                          <div className={"flex flex-col items-start gap-2"}>
                            <label htmlFor="firstname">Firstname</label>
                            <label className="input validator">
                              <User />
                              <input
                                defaultValue={user.firstname}
                                type="text"
                                required
                                placeholder="Firstname"
                                name="firstname"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                              />
                            </label>
                          </div>
                          <div className={"flex flex-col items-start gap-2"}>
                            <label htmlFor="lastname">Lastname</label>
                            <label className="input validator">
                              <User />
                              <input
                                defaultValue={user.lastname}
                                type="text"
                                required
                                name="lastname"
                                placeholder="Lastname"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                              />
                            </label>
                          </div>
                          <div className={"flex flex-col items-start gap-2"}>
                            <label htmlFor="password">Password</label>
                            <label className="input validator">
                              <User />
                              <input
                                defaultValue={user.password}
                                type="password"
                                name="password"
                                required
                                placeholder="Password"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                              />
                            </label>
                          </div>
                          <div></div>
                          <button className={"btn"} type={"submit"}>Update</button>
                        </form>
                          <button className={"absolute top-5 right-5 font-bold bg-black/70 h-8 w-8 rounded-full"} onClick={()=> toggleDialogUpdate("close", user.id)}>X</button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )
        })}
        {(Users.length === 0) ? <tr><td className={"text-center"} colSpan={userStructure.length}>No users yet</td></tr> : ""}
        </tbody>
      </table>
    </div>
  )
}



function App() {
  const [Users, setUsers] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("Users");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });



  useEffect(() => {
    // storing input name
    localStorage.setItem("Users", JSON.stringify(Users));
  }, [Users]);

  const handelSubmit = (e) => {
    e.preventDefault()
    toggleDialog("close")
    const form_data = new FormData(e.target)
    const username = form_data.get("username")
    const firstname = form_data.get("firstname")
    const lastname = form_data.get("lastname")
    const password = form_data.get("password")
    setUsers([...Users, {id: Users.length.toString(), username: username, firstname: firstname, lastname: lastname, password: password}])
    e.target.reset()
  }

  const toggleDialog = (action) => {
    const element = document.getElementById("content_dialog")
    if (action === "open"){
      element.classList.remove("hidden")
      element.classList.add("flex")
    } else {
      element.classList.remove("flex")
      element.classList.add("hidden")
    }
  }

  return (
    <div className={"flex flex-col gap-4 items-start justify-center"}>
      <div className={"flex justify-between w-full max-w-3xl"}>
        <h1 className={"text-2xl font-bold"}>Users Lists</h1>
        <button className={"btn btn-sm btn-primary"} onClick={() => toggleDialog("open")}>Add User</button>
        <div id="content_dialog" className={"hidden justify-center z-10 items-center fixed bottom-0 top-0 right-0 left-0 bg-black/70 p-2 rounded-lg"}>
          <div className={"card w-96 bg-base-100 overflow-y-scroll shadow-sm"}>
            <div className="card-body">
              <h3 className="font-bold text-lg mb-4">Add New User</h3>
              <form onSubmit={(e) => handelSubmit(e)} className={"grid sm:grid-cols-2 gap-4 "}>
                <div className={"flex flex-col items-start gap-2"}>
                  <label htmlFor="username">Username</label>
                  <label className="input validator">
                    <User />
                    <input
                      type="text"
                      required
                      name="username"
                      placeholder="Username"
                      pattern="[A-Za-z][A-Za-z0-9\-]*"
                      minLength="3"
                      maxLength="30"
                      title="Only letters, numbers or dash"
                    />
                  </label>
                </div>
                <div className={"flex flex-col items-start gap-2"}>
                  <label htmlFor="firstname">Firstname</label>
                  <label className="input validator">
                    <User />
                    <input
                      type="text"
                      required
                      placeholder="Firstname"
                      name="firstname"
                      pattern="[A-Za-z][A-Za-z0-9\-]*"
                      minLength="3"
                    />
                  </label>
                </div>
                <div className={"flex flex-col items-start gap-2"}>
                  <label htmlFor="lastname">Lastname</label>
                  <label className="input validator">
                    <User />
                    <input
                      type="text"
                      required
                      name="lastname"
                      placeholder="Lastname"
                      pattern="[A-Za-z][A-Za-z0-9\-]*"
                    />
                  </label>
                </div>
                <div className={"flex flex-col items-start gap-2"}>
                  <label htmlFor="password">Password</label>
                  <label className="input validator">
                    <User />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    />
                  </label>
                </div>
                <div></div>
                <button className={"btn"} type={"submit"}>Add User</button>
              </form>
                <button className={"absolute top-5 right-5 font-bold bg-black/70 h-8 w-8 rounded-full"} onClick={()=> toggleDialog("close")}>X</button>
            </div>
          </div>
        </div>
      </div>
      <Table Users={Users} setUsers={setUsers} />
    </div>
  )
}

export default App
