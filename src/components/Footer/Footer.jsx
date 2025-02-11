import reactLogo from '../../assets/react.svg';
import './Footer.css';

export default function Footer () {
    function ReactLogo() {
        return (
            <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        );
    }
    function MotionLogo() {
        return (
            <a href="https://motion.dev/" target="_blank">
                <img src="https://user-images.githubusercontent.com/7850794/164965509-2a8dc49e-2ed7-4243-a2c9-481b03bbc31a.png" className="logo motion" alt="Motion logo" />
            </a>
        );
    }
    return (
        <footer> 
            <p>🎵 Built with React <ReactLogo /> and Motion <MotionLogo/> by Team CNZ 🎵</p>
        </footer>
    );
}
