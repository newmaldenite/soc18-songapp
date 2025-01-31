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
    return (
        <footer> 
            <p>🎵 Built with React <ReactLogo /> by Team CNZ 🎵</p>
        </footer>
    );
}
