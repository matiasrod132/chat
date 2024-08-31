import "./addUser.css"

const AddUser = () => {
    return (
        <div className="addUser">
            <form>
                <input type="text" placeholder="Username" name="username" />
                <button>Buscar</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>John Dalton</span>
                </div>
            </div>
        </div>
    )
}

export default AddUser