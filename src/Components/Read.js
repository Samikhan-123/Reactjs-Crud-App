import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Read = () => {
  const [data, setData] = useState([])
  const [isDark, setIsDark] = useState(false)
  const apiData = async () => {
    await axios
      .get('https://63f7af10e8a73b486afd4c29.mockapi.io/crud')
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    apiData()
  }, [])

  const handleDelete = (id) => {
    axios
      .delete(`https://63f7af10e8a73b486afd4c29.mockapi.io/crud/${id}`)
      .then(() => {
        apiData()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const setDataToLocalStorage = (id, name, age, email) => {
    localStorage.setItem('id', id)
    localStorage.setItem('name', name)
    localStorage.setItem('age', age)
    localStorage.setItem('email', email)
  }
  return (
    <>
      <div className="row main-crud ">
        <div className="col-lg-12 col-md-10 ">
          <div className="mt-3 mb-3 ">
            <div className="form-check form-switch m-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={isDark}
                onChange={(e) => setIsDark(e.target.checked)}
              />
              <label className="form-check-label">Theme</label>
            </div>
            <Link to="/create" className="btn btn-secondary">
              Create New Data
            </Link>
          </div>
          <table 
            className={`table ${isDark ? 'table-dark' : 'table-light'
              } table-striped table-bordered table-hover`}
          >
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, ind) => {
                return (
                  <React.Fragment key={ind}>
                    <tr>
                      <td>{ind}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.email}</td>
                      <td>
                        <Link to="/edit">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setDataToLocalStorage(
                                item.id,
                                item.name,
                                item.age,
                                item.email
                              )
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            if (
                              window.confirm('Are you sure to delete data?')
                            ) {
                              handleDelete(item.id)
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Read
