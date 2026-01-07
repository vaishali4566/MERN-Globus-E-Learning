const logout = (navigate)=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("theme");

    navigate("/login");
}

export default logout;