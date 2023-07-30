/* ============================================ */
// Logout:
/* ============================================== */
function logOut() {
  sessionStorage.removeItem('user');
  location.replace('index.html');
}
