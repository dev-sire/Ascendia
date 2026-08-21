import parse from "html-react-parser"
import { useEffect, useState } from "react"

type HtmlParserProps = {
    html: string
}

export const HtmlParser = ({ html }: HtmlParserProps) => {
    // Avoid hydration mismatch error with SSR html data
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="html-content [&_h1]:text-4xl [&_h2]:text-3xl [&_blockquote]:italic [&_iframe]:aspect-video [&_h3]:text-2xl text-themeTextGray flex flex-col gap-y-3">
            {typeof html === "string" && html ? parse(html) : null}
        </div>
    )
}