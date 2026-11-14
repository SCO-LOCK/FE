import { useEffect, useRef, useState } from 'react'
import { textStyles } from './text-styles'
import './text-style-preview.css'

const families = ['heading', 'input', 'body', 'action']
const styles = Object.entries(textStyles)

function TextStylePreview() {
  const preview = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<Record<string, string[]>>({})

  useEffect(() => {
    function readStyles() {
      const rows = preview.current?.querySelectorAll<HTMLElement>('[data-text-style]')
      if (!rows) return

      setValues(Object.fromEntries(Array.from(rows, (row) => {
        const style = getComputedStyle(row)
        return [row.dataset.textStyle, [
          style.fontSize,
          `${Math.round(parseFloat(style.lineHeight) / parseFloat(style.fontSize) * 100)}%`,
          style.letterSpacing,
          style.fontWeight,
        ]]
      })))
    }

    readStyles()
    window.addEventListener('resize', readStyles)
    return () => window.removeEventListener('resize', readStyles)
  }, [])

  return (
    <div className="text-style-preview" ref={preview}>
      {families.map((family) => (
        <ul className="text-style-preview__group" aria-label={family} key={family}>
          {styles.filter(([name]) => name.startsWith(family + '/')).map(([name, style]) => {
            const [size, lineHeight, tracking, weight] = values[name] ?? []

            return (
              <li className={'text-style-preview__row ' + style.utility} data-text-style={name} key={name}>
                <div className="text-style-preview__name">
                  <p>{name}</p>
                  <code>{style.utility}</code>
                </div>
                <dl className="text-style-preview__metrics">
                  <div>
                    <dt className="sr-only">글자 크기</dt>
                    <dd>{size}</dd>
                    <dd><code>font-size/{style.size}</code></dd>
                  </div>
                  <div>
                    <dt className="sr-only">줄 높이</dt>
                    <dd>{lineHeight}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">자간</dt>
                    <dd>{tracking}</dd>
                    <dd><code>letter-spacing/default</code></dd>
                  </div>
                  <div>
                    <dt className="sr-only">글자 굵기</dt>
                    <dd>{weight}</dd>
                    <dd><code>font-weight/{style.weight}</code></dd>
                  </div>
                </dl>
              </li>
            )
          })}
        </ul>
      ))}
    </div>
  )
}

export default TextStylePreview
