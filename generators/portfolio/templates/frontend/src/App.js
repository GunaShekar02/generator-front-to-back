import Profile from './components/Profile/Profile.js'
import Experience from './components/Experience/Experience.js'
import Projects from './components/Projects/Projects'
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Profile/>
      <Experience/>
      <Projects/>
    </div>
  );
}

export default App;
