

function useAuth() {
  const user = JSON.parse(localStorage.getItem('user'))
  return user?.email?.length > 0
}

export default useAuth
