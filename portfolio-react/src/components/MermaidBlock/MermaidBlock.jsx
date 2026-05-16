import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import './MermaidBlock.css';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  fontFamily: 'Inter, Segoe UI, sans-serif',
  themeVariables: {
    primaryColor: '#3D3BC1',
    primaryTextColor: '#1a1a3e',
    primaryBorderColor: '#3D3BC1',
    lineColor: '#3D3BC1',
    secondaryColor: '#f2f2f2',
    tertiaryColor: '#DFE0E0',
  },
});

let _idCounter = 0;

const MermaidBlock = ({ code }) => {
  const ref = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ref.current || !code) return;
    const id = `mermaid-render-${++_idCounter}`;
    setError(null);
    mermaid
      .render(id, code.trim())
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => {
        setError('Could not render diagram.');
      });
  }, [code]);

  if (error) {
    return (
      <div className="mermaid-error">
        <span>Diagram render error</span>
      </div>
    );
  }

  return <div ref={ref} className="mermaid-block" />;
};

export default MermaidBlock;
