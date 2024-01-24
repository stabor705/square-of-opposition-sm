import React, { FC } from "react";
import './About.css';

export const About: FC = () => {
    return (
        <section className="About">
            <h1>Logical Square Project</h1>
            <p>
                This application is implementation of logical
                square-driven generation of behavioural models
                proposed by prof. Radosław Klimek in his paper
                <em>"Logical square-driven generation of behavioural
                models"</em>. You can add prepositions by clicking
                on leaf in span tree view on the right and filling 
                out logical square on the left. In state machine
                view you can add set variables and transitions
                between states. Below is a code generation panel,
                where state machine is used to template in Python.
            </p>
        </section>
    )
}