import { useEffect, useState, useRef } from 'react'
import './Style.css'
import Trash from '../../assets/icons8-lixeira.svg'
import api from '../../Services/api'
function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  async function getUsers() {
    const UserFromAPI = await api.get('/home')
    setUsers(UserFromAPI.data)
  }
  async function createUsers() {
    await api.post('/home', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }
  async function deleteUsers(id) {
    await api.delete(`/home/${id}`)
    getUsers()
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios: </h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade' name="idade" type="number" ref={inputAge} />
        <input placeholder='Email' nonce='' name='email' type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>Cadastrar</button>

      </form>
      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>nome: <span>{user.name}</span></p>
            <p>idade: <span>{user.age}</span></p>
            <p>email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
          <img src={Trash} alt="Lixeira" />
        </button>
        </div>

  ))
}
    </div >
  )
}
export default Home