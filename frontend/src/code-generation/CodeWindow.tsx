import React, { FC, useEffect, useState } from "react";
import { fetchCode } from "../data-access/codeGenerationService.ts";
import './code-generation.css'

export const CodeWindow: FC = () => {
    const [code, setCode] = useState("")

    const refresh = () => {
        fetchCode()
            .then(code => {
                setCode(code)
                console.log(code)
            })
            .catch(console.error)
    }

    useEffect(() => {
    })

    return (
        <section className="code-block">
            <div className="header">
                <h1>Generate Code</h1>
                <button
                    className="primary-button"
                    onClick={() => refresh()}
                >
                    Generate
                </button>
            </div>
            <pre>
                {code}
            </pre>
        </section>
    )
}