import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX - 4 + 'px';
        dotRef.current.style.top = e.clientY - 4 + 'px';
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x - 15 + 'px';
        ringRef.current.style.top = ring.current.y - 15 + 'px';
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    const handleMouseOver = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '50px';
        ringRef.current.style.height = '50px';
        ringRef.current.style.borderColor = 'rgba(139, 92, 246, 0.8)';
        ringRef.current.style.left = ring.current.x - 25 + 'px';
        ringRef.current.style.top = ring.current.y - 25 + 'px';
      }
    };

    const handleMouseOut = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '30px';
        ringRef.current.style.height = '30px';
        ringRef.current.style.borderColor = 'rgba(139, 92, 246, 0.6)';
      }
    };

    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseover', handleMouseOver);
      link.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseover', handleMouseOver);
        link.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  );
}
