import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router";
import TextStylePreview from "./TextStylePreview";
import {
  appearanceGroups,
  measurements,
  paletteGroups,
  semanticColorGroups,
} from "./token-catalog";
import "./design-system.css";

const tokenName = (name: string) => "--" + name.replaceAll("/", "-");

const colorCollections = [
  { label: "Semantic Colors", groups: semanticColorGroups, prefix: "" },
  { label: "Primitive Colors", groups: paletteGroups, prefix: "palette/" },
];
const tokenVariables = [
  ...colorCollections.flatMap(({ groups, prefix }) =>
    Object.entries(groups).flatMap(([group, names]) =>
      names.map((name) => tokenName(`${prefix}${group}/${name}`)),
    ),
  ),
  ...Object.entries(appearanceGroups).flatMap(([group, names]) =>
    names.map((name) => tokenName(`${group}/${name}`)),
  ),
  ...measurements.map((name) => `--measurement-${name}`),
];

function readPreview() {
  const root = document.documentElement;
  const style = getComputedStyle(root);

  return {
    width: root.clientWidth,
    mode: style.getPropertyValue("--layout-mode").trim(),
    values: Object.fromEntries(
      tokenVariables.map((name) => [name, style.getPropertyValue(name).trim()]),
    ),
  };
}

function previewStyle(name: string): CSSProperties {
  return { "--preview-value": `var(${name})` } as CSSProperties;
}

function DesignSystem() {
  const [preview, setPreview] = useState(readPreview);

  useEffect(() => {
    const handleResize = () => setPreview(readPreview());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = Number(preview.values["--grid-columns"]);

  return (
    <main className="page-grid design-system">
      <header className="design-system__header col-span-full">
        <span className="design-system__project">SCOLOCK</span>
        <h1 className="type-heading-primary">디자인 시스템</h1>
        <nav aria-label="디자인 시스템 항목">
          <a href="#grid">그리드</a>
          <a href="#text-styles">텍스트 스타일</a>
          <a href="#colors">색상</a>
          <a href="#appearance">간격과 타이포그래피</a>
        </nav>
      </header>

      <section
        id="grid"
        className="design-system__grid col-span-full"
        aria-labelledby="grid-title"
      >
        <div className="design-system__section-title col-span-full">
          <h2 id="grid-title">반응형 그리드</h2>
          <span className="design-system__mode">
            {preview.mode} · {preview.width}px
          </span>
        </div>
        <dl className="design-system__metrics col-span-full">
          <div>
            <dt>컬럼</dt>
            <dd>{columns}</dd>
          </div>
          <div>
            <dt>좌우 여백</dt>
            <dd>{preview.values["--grid-margin"]}</dd>
          </div>
          <div>
            <dt>거터</dt>
            <dd>{preview.values["--grid-gutter"]}</dd>
          </div>
          <div>
            <dt>Figma 기준 너비</dt>
            <dd>{preview.values["--grid-width"]}</dd>
          </div>
        </dl>
        <div className="design-system__tracks col-span-full" aria-hidden="true">
          {Array.from({ length: columns }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <div className="design-system__panel col-span-full min-[768px]:col-span-4 min-[1024px]:col-span-8">
          <strong>본문</strong>
          <span>{columns === 12 ? 8 : columns === 6 ? 4 : columns}칸</span>
        </div>
        <div className="design-system__panel col-span-full min-[768px]:col-span-2 min-[1024px]:col-span-4">
          <strong>사이드바</strong>
          <span>{columns === 12 ? 4 : columns === 6 ? 2 : columns}칸</span>
        </div>
      </section>

      <section
        id="text-styles"
        className="design-system__section col-span-full"
        aria-labelledby="text-styles-title"
      >
        <div className="design-system__section-title">
          <h2 id="text-styles-title" className="type-heading-secondary">
            텍스트 스타일
          </h2>
        </div>
        <TextStylePreview />
      </section>

      <section
        id="colors"
        className="design-system__section col-span-full"
        aria-labelledby="colors-title"
      >
        <h2 id="colors-title">색상</h2>
        {colorCollections.map(({ label, groups, prefix }) => (
          <details
            key={label}
            className="design-system__collection"
            open={label === "Semantic Colors"}
          >
            <summary>{label}</summary>
            <div className="design-system__group-list">
              {Object.entries(groups).map(([group, names]) => (
                <section key={group}>
                  <h3>{group}</h3>
                  <ul className="design-system__swatches">
                    {names.map((name) => {
                      const variable = tokenName(`${prefix}${group}/${name}`);
                      return (
                        <li key={name} className="design-system__swatch">
                          <div
                            className="design-system__swatch-color"
                            style={previewStyle(variable)}
                            aria-hidden="true"
                          />
                          <div>
                            <code>{variable}</code>
                            <span>{preview.values[variable]}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </details>
        ))}
      </section>

      <section
        id="appearance"
        className="design-system__section col-span-full"
        aria-labelledby="appearance-title"
      >
        <h2 id="appearance-title">간격과 타이포그래피</h2>
        <div className="design-system__appearance">
          {Object.entries(appearanceGroups)
            .filter(([group]) => group !== "grid")
            .map(([group, names]) => (
              <section
                key={group}
                className="design-system__collection design-system__token-section"
              >
                <h3>{group}</h3>
                <ul>
                  {names.map((name) => {
                    const variable = tokenName(`${group}/${name}`);
                    return (
                      <li key={name} className="design-system__token-row">
                        <div>
                          <code>{variable}</code>
                          <span>{preview.values[variable]}</span>
                        </div>
                        <span
                          className="design-system__sample"
                          data-group={group}
                          style={previewStyle(variable)}
                          aria-hidden="true"
                        >
                          {group.startsWith("typography/") ? "Aa 가" : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
        </div>
        <details className="design-system__collection">
          <summary>Primitive Measurements</summary>
          <dl className="design-system__measurements">
            {measurements.map((name) => (
              <div key={name}>
                <dt>
                  <code>--measurement-{name}</code>
                </dt>
                <dd>{preview.values[`--measurement-${name}`]}</dd>
              </div>
            ))}
          </dl>
        </details>
      </section>
    </main>
  );
}

export default DesignSystem;
