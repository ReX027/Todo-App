import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h2>About My Todo App</h2>
            <p>
                Welcome to our Todo App, a simple and efficient way to organize your tasks and stay productive.
            </p>
            <p>
                Features:
            </p>
            <ul>
                <li>Create, edit, and delete todos</li>
                <li>Mark todos as completed</li>
                <li>Organize todos with different categories</li>
            </ul>
            <p>
                Our mission is to help you manage your tasks effectively and make your life easier.
            </p>
        </div>
    );
};

export default About;
